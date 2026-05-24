import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createCheckoutSession } from '../_lib/handlers/createCheckoutSession';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const result = await createCheckoutSession(req.body);
  if (result.ok === false) {
    return res.status(result.status).json({ error: result.message });
  }

  return res.status(200).json({ url: result.url, sessionId: result.sessionId });
}
