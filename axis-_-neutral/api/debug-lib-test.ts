import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSiteUrl } from './lib/env';
import { getStripe } from './lib/stripe';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const url = getSiteUrl();
    const stripe = getStripe();
    res.status(200).json({ siteUrl: url, stripe: !!stripe });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
