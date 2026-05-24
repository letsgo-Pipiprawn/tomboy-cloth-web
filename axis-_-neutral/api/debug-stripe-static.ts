import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const s = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_x');
    res.status(200).json({ ok: true, class: s.constructor.name });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
