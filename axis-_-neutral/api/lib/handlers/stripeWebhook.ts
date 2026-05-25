import type Stripe from 'stripe';
import { decodeCheckoutItemsMetadata, type CheckoutMetadataLineItem } from '../checkoutMetadata.js';
import { generateOrderNumber } from '../commerce.js';
import type {
  FulfillmentJobInsert,
  OrderInsert,
  OrderItemInsert,
} from '../database.types';
import { getSupabaseAdmin } from '../supabaseAdmin.js';
import { getStripe } from '../stripe.js';

type MetadataLineItem = CheckoutMetadataLineItem;

async function persistPaidOrder(session: Stripe.Checkout.Session): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { data: existing } = await supabase
    .from('orders')
    .select('id')
    .eq('stripe_checkout_session_id', session.id)
    .maybeSingle();

  if (existing) {
    console.info('[stripe/webhook] Order already exists for session', session.id);
    return;
  }

  const items = decodeCheckoutItemsMetadata(session.metadata ?? undefined);
  if (!items.length) {
    throw new Error(`Missing items metadata for session ${session.id}`);
  }

  const subtotalAud = Number(session.metadata?.subtotal_aud ?? 0);
  const shippingAud = Number(session.metadata?.shipping_aud ?? 0);
  const totalAud = Number(session.metadata?.total_aud ?? subtotalAud + shippingAud);

  const paymentIntentId =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  const addr = session.customer_details?.address;
  const shippingAddress = addr
    ? {
        name: session.customer_details?.name ?? null,
        phone: session.customer_details?.phone ?? null,
        line1: addr.line1,
        line2: addr.line2,
        city: addr.city,
        state: addr.state,
        postal_code: addr.postal_code,
        country: addr.country,
      }
    : null;

  const orderNumber = generateOrderNumber();

  const orderRow: OrderInsert = {
    order_number: orderNumber,
    status: 'paid',
    customer_email: session.customer_details?.email ?? session.customer_email ?? null,
    shipping_address: shippingAddress,
    subtotal_aud: subtotalAud,
    shipping_aud: shippingAud,
    total_aud: totalAud,
    currency: 'AUD',
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id: paymentIntentId,
    metadata: {
      stripe_customer_id:
        typeof session.customer === 'string' ? session.customer : session.customer?.id ?? null,
    },
  };

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert(orderRow)
    .select('id')
    .single();

  if (orderError || !order) {
    throw new Error(orderError?.message ?? 'Failed to insert order');
  }

  const orderItems: OrderItemInsert[] = items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    slug: item.slug,
    name: item.name,
    size: item.size,
    quantity: item.quantity,
    unit_price_aud: item.unitPriceAud,
    cj_product_id: item.cjProductId,
    cj_variant_id: item.cjVariantId,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
  if (itemsError) {
    throw new Error(itemsError.message);
  }

  const jobRow: FulfillmentJobInsert = {
    order_id: order.id,
    status: 'pending',
    payload: {
      source: 'stripe_webhook',
      session_id: session.id,
    },
  };

  const { error: jobError } = await supabase.from('fulfillment_jobs').insert(jobRow);

  if (jobError) {
    throw new Error(jobError.message);
  }

  console.info('[stripe/webhook] Order created', orderNumber, order.id);
}

export type StripeWebhookResult = { status: number; body: string };

export async function processStripeWebhook(
  rawBody: Buffer,
  signature: string | undefined,
): Promise<StripeWebhookResult> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return { status: 500, body: 'STRIPE_WEBHOOK_SECRET not configured' };
  }
  if (!signature) {
    return { status: 400, body: 'Missing stripe-signature header' };
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid signature';
    console.error('[stripe/webhook] Signature verification failed:', message);
    return { status: 400, body: `Webhook Error: ${message}` };
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status === 'paid') {
          await persistPaidOrder(session);
        }
        break;
      }
      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;
        await persistPaidOrder(session);
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error('[stripe/webhook] Handler error:', err);
    return { status: 500, body: 'Webhook handler failed' };
  }

  return { status: 200, body: JSON.stringify({ received: true }) };
}

export async function fetchCheckoutSessionSummary(sessionId: string) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  let orderNumber: string | null = null;
  let orderStatus: string | null = null;

  try {
    const supabase = getSupabaseAdmin();
    const { data: order } = await supabase
      .from('orders')
      .select('order_number, status')
      .eq('stripe_checkout_session_id', sessionId)
      .maybeSingle();
    if (order) {
      orderNumber = order.order_number;
      orderStatus = order.status;
    }
  } catch {
    // Supabase may be unconfigured in local-only Stripe tests
  }

  return {
    id: session.id,
    paymentStatus: session.payment_status,
    customerEmail: session.customer_details?.email ?? session.customer_email,
    amountTotal: session.amount_total ? session.amount_total / 100 : null,
    currency: session.currency?.toUpperCase() ?? 'AUD',
    orderNumber,
    orderStatus,
  };
}
