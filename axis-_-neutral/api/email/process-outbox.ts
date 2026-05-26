import type { VercelRequest, VercelResponse } from '@vercel/node';
import { processEmailOutbox } from '../lib/wishlistAutomation.js';

function isAuthorized(req: VercelRequest): boolean {
  const expected = process.env.INTERNAL_JOB_TOKEN;
  if (!expected) return false;

  const auth = req.headers.authorization || '';
  if (auth.startsWith('Bearer ')) {
    return auth.slice(7) === expected;
  }

  const headerToken = req.headers['x-internal-token'];
  if (typeof headerToken === 'string') return headerToken === expected;
  if (Array.isArray(headerToken)) return headerToken.includes(expected);
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const limit =
    typeof req.query.limit === 'string' && req.query.limit
      ? Number(req.query.limit)
      : Number(req.body?.limit ?? 20);

  try {
    const summary = await processEmailOutbox(Number.isFinite(limit) ? limit : 20);
    return res.status(200).json(summary);
  } catch (err) {
    console.error('[api/email/process-outbox]', err);
    const message = err instanceof Error ? err.message : 'Outbox processing failed';
    return res.status(500).json({ error: message });
  }
}
