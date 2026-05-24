import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSiteUrl } from '../lib/env';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ siteUrl: getSiteUrl() });
}
