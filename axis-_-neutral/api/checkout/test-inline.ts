import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return res.status(500).json({ error: 'no STRIPE_SECRET_KEY' });

    const stripe = new Stripe(key);
    const siteUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ quantity: 1, price_data: { currency: 'aud', unit_amount: 45000, product_data: { name: 'Test' } } }],
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
    });
    res.status(200).json({ ok: true, url: session.url });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
