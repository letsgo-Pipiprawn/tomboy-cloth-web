import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const key = process.env.STRIPE_SECRET_KEY ?? 'none';
  const s = new Stripe(key);
  res.status(200).json({ ok: true, stripe: !!s });
}
