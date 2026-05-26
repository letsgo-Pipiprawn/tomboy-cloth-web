import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from '../lib/supabaseAdmin.js';

type OrderItemRow = {
  slug: string;
  name: string;
  size: string;
  quantity: number;
  unit_price_aud: number;
};

type OrderRow = {
  order_number: string;
  status: string;
  customer_email: string | null;
  total_aud: number;
  currency: string;
  cj_order_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  order_items: OrderItemRow[];
};

function trackingFromMetadata(metadata: Record<string, unknown> | null): string | null {
  if (!metadata) return null;
  const candidates = ['tracking_number', 'trackingNumber', 'tracking_url', 'trackingUrl'];
  for (const key of candidates) {
    const value = metadata[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as {
    email?: string;
    orderNumber?: string;
  };

  const email = body.email?.trim().toLowerCase();
  const orderNumber = body.orderNumber?.trim().toUpperCase();

  if (!email || !orderNumber) {
    return res.status(400).json({ error: 'Email and order number are required' });
  }

  if (!isSupabaseAdminConfigured()) {
    return res.status(503).json({ error: 'Order lookup is not configured yet' });
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('orders')
    .select(
      'order_number, status, customer_email, total_aud, currency, cj_order_id, metadata, created_at, order_items ( slug, name, size, quantity, unit_price_aud )',
    )
    .eq('order_number', orderNumber)
    .maybeSingle();

  if (error) {
    console.error('[orders/track]', error);
    return res.status(500).json({ error: 'Could not look up order' });
  }

  if (!data) {
    return res.status(404).json({ error: 'No order found with that number' });
  }

  const order = data as OrderRow;

  if ((order.customer_email ?? '').toLowerCase() !== email) {
    return res.status(404).json({ error: 'No order found for that email and order number' });
  }

  return res.status(200).json({
    orderNumber: order.order_number,
    status: order.status,
    totalAud: Number(order.total_aud),
    currency: order.currency,
    createdAt: order.created_at,
    cjOrderId: order.cj_order_id,
    tracking: trackingFromMetadata(order.metadata),
    items: (order.order_items ?? []).map((item) => ({
      slug: item.slug,
      name: item.name,
      size: item.size,
      quantity: item.quantity,
      unitPriceAud: Number(item.unit_price_aud),
    })),
  });
}
