import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createCheckoutSession } from './_lib/handlers/createCheckoutSession';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const result = await createCheckoutSession({
      items: [{ slug: 'axis-linen-tee', size: 'M', quantity: 1 }],
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: String(e), stack: e instanceof Error ? e.stack : undefined });
  }
}
