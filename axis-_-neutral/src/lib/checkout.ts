import type { CartItem, ShippingMethod } from '../context/CartContext';

export type CheckoutSessionResponse = {
  clientSecret: string;
  sessionId: string;
};

export type CheckoutSessionSummary = {
  id: string;
  paymentStatus: string;
  customerEmail: string | null;
  amountTotal: number | null;
  currency: string;
  orderNumber: string | null;
  orderStatus: string | null;
};

export async function createCheckoutSession(
  items: CartItem[],
  shippingMethod: ShippingMethod = 'standard',
): Promise<CheckoutSessionResponse> {
  const res = await fetch('/api/checkout/create-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: items.map((item) => ({
        slug: item.slug,
        size: item.size,
        quantity: item.quantity,
      })),
      shippingMethod,
    }),
  });

  const raw = await res.text();
  let data: { clientSecret?: string; sessionId?: string; error?: string };
  try {
    data = raw ? (JSON.parse(raw) as typeof data) : {};
  } catch {
    throw new Error(
      raw?.slice(0, 120) || `Checkout failed (${res.status}). Check Stripe and API env on Vercel.`,
    );
  }
  if (!res.ok) {
    throw new Error(data.error ?? `Checkout failed (${res.status})`);
  }
  if (!data.clientSecret) {
    throw new Error('No checkout client secret returned');
  }

  return { clientSecret: data.clientSecret, sessionId: data.sessionId ?? '' };
}

export async function fetchCheckoutSessionSummary(
  sessionId: string,
): Promise<CheckoutSessionSummary> {
  const res = await fetch(`/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`);
  const data = (await res.json()) as CheckoutSessionSummary & { error?: string };
  if (!res.ok) {
    throw new Error(data.error ?? 'Could not load order');
  }
  return data;
}
