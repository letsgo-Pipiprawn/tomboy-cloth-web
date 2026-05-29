import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createCheckoutSession } from '../lib/handlers/createCheckoutSession.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await createCheckoutSession(req.body);
    if (result.ok === false) {
      return res.status(result.status).json({ error: result.message });
    }

    return res.status(200).json({
      clientSecret: result.clientSecret,
      sessionId: result.sessionId,
    });
  } catch (err) {
    console.error('[api/checkout/create-session]', err);
    const message =
      err instanceof Error ? err.message : 'Checkout service unavailable';
    return res.status(500).json({ error: message });
  }
}
