import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getStripe } from './_lib/stripe';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const s = getStripe();
    res.status(200).json({ ok: true, stripe: !!s });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
