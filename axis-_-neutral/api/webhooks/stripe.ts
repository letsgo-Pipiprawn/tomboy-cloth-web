import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readRawBody } from '../lib/buffer.js';
import { processStripeWebhook } from '../lib/handlers/stripeWebhook.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Method not allowed');
  }

  const rawBody = await readRawBody(req);
  const signature = req.headers['stripe-signature'];
  const sig = Array.isArray(signature) ? signature[0] : signature;

  const result = await processStripeWebhook(rawBody, sig);
  return res.status(result.status).send(result.body);
}
