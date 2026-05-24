import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireEnv, getSiteUrl } from './_lib/env';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    res.status(200).json({ siteUrl: getSiteUrl(), hasStripe: Boolean(requireEnv('STRIPE_SECRET_KEY')) });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
