import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchCheckoutSessionSummary } from '../lib/handlers/stripeWebhook.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sessionId = typeof req.query.session_id === 'string' ? req.query.session_id : null;
  if (!sessionId) {
    return res.status(400).json({ error: 'session_id is required' });
  }

  try {
    const summary = await fetchCheckoutSessionSummary(sessionId);
    return res.status(200).json(summary);
  } catch (err) {
    console.error('[checkout/session]', err);
    return res.status(404).json({ error: 'Session not found' });
  }
}
