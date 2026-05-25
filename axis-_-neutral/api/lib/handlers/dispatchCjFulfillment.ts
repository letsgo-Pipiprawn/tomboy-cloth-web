import { cjCreateOrder, type CjCreateOrderPayload } from '../cj.js';
import { getSupabaseAdmin } from '../supabaseAdmin.js';

type JobRow = {
  id: string;
  order_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  attempts: number;
  max_attempts: number;
};

type OrderRow = {
  id: string;
  order_number: string;
  customer_email: string | null;
  shipping_address: unknown;
  total_aud: number;
};

type OrderItemRow = {
  id: string;
  product_id: string | null;
  name: string;
  quantity: number;
  cj_variant_id: string | null;
};

type ProductLogisticsRow = {
  id: string;
  logistic_name: string | null;
  from_country_code: string | null;
};

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function pickString(obj: Record<string, unknown>, key: string, fallback = ''): string {
  const value = obj[key];
  return typeof value === 'string' ? value : fallback;
}

function defaultLogisticsName(): string {
  return process.env.CJ_DEFAULT_LOGISTIC_NAME || 'CJPacket';
}

function defaultFromCountry(): string {
  return process.env.CJ_DEFAULT_FROM_COUNTRY_CODE || 'CN';
}

function defaultPayType(): number {
  const value = Number(process.env.CJ_PAY_TYPE || 3);
  return Number.isFinite(value) ? value : 3;
}

function normalizeShipping(order: OrderRow) {
  const ship = asObject(order.shipping_address);
  const countryCode = pickString(ship, 'country', 'AU');
  const customerName = pickString(ship, 'name', 'Customer');

  return {
    shippingZip: pickString(ship, 'postal_code'),
    shippingCountryCode: countryCode,
    shippingCountry: countryCode,
    shippingProvince: pickString(ship, 'state'),
    shippingCity: pickString(ship, 'city'),
    shippingCounty: '',
    shippingPhone: pickString(ship, 'phone'),
    shippingCustomerName: customerName,
    shippingAddress: pickString(ship, 'line1'),
    shippingAddress2: pickString(ship, 'line2'),
  };
}

function buildPayload(
  order: OrderRow,
  items: OrderItemRow[],
  logisticsByProductId: Map<string, ProductLogisticsRow>,
): CjCreateOrderPayload {
  const shipping = normalizeShipping(order);
  const products = items.map((item) => ({
    vid: item.cj_variant_id!,
    quantity: item.quantity,
    storeLineItemId: item.id,
  }));

  const firstItemWithProduct = items.find((item) => item.product_id && logisticsByProductId.has(item.product_id));
  const productLogistics = firstItemWithProduct?.product_id
    ? logisticsByProductId.get(firstItemWithProduct.product_id)
    : null;

  return {
    orderNumber: order.order_number,
    ...shipping,
    email: order.customer_email ?? undefined,
    logisticName: productLogistics?.logistic_name || defaultLogisticsName(),
    fromCountryCode: productLogistics?.from_country_code || defaultFromCountry(),
    platform: 'Api',
    payType: defaultPayType(),
    shopLogisticsType: 1,
    products,
  };
}

async function markJobFailed(job: JobRow, errorMessage: string) {
  const supabase = getSupabaseAdmin();
  const nextAttempts = (job.attempts ?? 0) + 1;

  await supabase
    .from('fulfillment_jobs')
    .update({
      status: 'failed',
      attempts: nextAttempts,
      last_error: errorMessage.slice(0, 1000),
    })
    .eq('id', job.id);

  await supabase
    .from('orders')
    .update({
      status: 'cj_failed',
      cj_error: errorMessage.slice(0, 1000),
    })
    .eq('id', job.order_id);
}

async function processOne(job: JobRow) {
  const supabase = getSupabaseAdmin();

  const { data: claimed, error: claimError } = await supabase
    .from('fulfillment_jobs')
    .update({ status: 'processing' })
    .eq('id', job.id)
    .in('status', ['pending', 'failed'])
    .select('id')
    .maybeSingle();

  if (claimError || !claimed) {
    return { jobId: job.id, status: 'skipped' as const, reason: 'already-claimed' };
  }

  try {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, order_number, customer_email, shipping_address, total_aud')
      .eq('id', job.order_id)
      .maybeSingle<OrderRow>();

    if (orderError || !order) {
      throw new Error(orderError?.message || `Order not found for job ${job.id}`);
    }

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('id, product_id, name, quantity, cj_variant_id')
      .eq('order_id', order.id)
      .returns<OrderItemRow[]>();

    if (itemsError || !items?.length) {
      throw new Error(itemsError?.message || `No order_items for ${order.order_number}`);
    }

    const missingVariant = items.find((item) => !item.cj_variant_id);
    if (missingVariant) {
      throw new Error(`Missing cj_variant_id for item: ${missingVariant.name}`);
    }

    const productIds = items
      .map((item) => item.product_id)
      .filter((id): id is string => Boolean(id));

    const logisticsByProductId = new Map<string, ProductLogisticsRow>();
    if (productIds.length) {
      const { data: products } = await supabase
        .from('products')
        .select('id, logistic_name, from_country_code')
        .in('id', productIds)
        .returns<ProductLogisticsRow[]>();

      for (const p of products || []) {
        logisticsByProductId.set(p.id, p);
      }
    }

    const payload = buildPayload(order, items, logisticsByProductId);
    const result = await cjCreateOrder(payload);
    if (!result.ok) {
      throw new Error(`CJ returned non-success: ${JSON.stringify(result.raw)}`);
    }

    await supabase
      .from('orders')
      .update({
        status: 'cj_submitted',
        cj_order_id: result.orderId,
        cj_error: null,
      })
      .eq('id', order.id);

    await supabase
      .from('fulfillment_jobs')
      .update({
        status: 'completed',
        attempts: (job.attempts ?? 0) + 1,
        last_error: null,
        payload: {
          source: 'cj_dispatch',
          cj_order_id: result.orderId,
          submitted_at: new Date().toISOString(),
        },
      })
      .eq('id', job.id);

    return { jobId: job.id, status: 'completed' as const, cjOrderId: result.orderId };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown CJ dispatch error';
    await markJobFailed(job, message);
    return { jobId: job.id, status: 'failed' as const, error: message };
  }
}

export async function dispatchCjFulfillmentJobs(limit = 10) {
  const supabase = getSupabaseAdmin();
  const safeLimit = Math.max(1, Math.min(limit, 50));

  const { data: jobs, error } = await supabase
    .from('fulfillment_jobs')
    .select('id, order_id, status, attempts, max_attempts')
    .in('status', ['pending', 'failed'])
    .lt('attempts', 5)
    .order('created_at', { ascending: true })
    .limit(safeLimit)
    .returns<JobRow[]>();

  if (error) {
    throw new Error(error.message);
  }

  const results = [];
  for (const job of jobs || []) {
    results.push(await processOne(job));
  }

  return {
    scanned: jobs?.length ?? 0,
    completed: results.filter((r) => r.status === 'completed').length,
    failed: results.filter((r) => r.status === 'failed').length,
    skipped: results.filter((r) => r.status === 'skipped').length,
    results,
  };
}
