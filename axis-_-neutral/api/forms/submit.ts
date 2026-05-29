import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleContactSubmit } from '../lib/handlers/contactSubmit.js';
import { handleRestockSignup } from '../lib/handlers/restockSignup.js';

type Body = {
  type?: 'contact' | 'restock';
  name?: string;
  email?: string;
  message?: string;
  slug?: string;
  size?: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as Body;
  const type = body.type;

  if (type === 'contact') {
    return handleContactSubmit(req, res);
  }
  if (type === 'restock') {
    return handleRestockSignup(body, res);
  }

  return res.status(400).json({ error: 'Expected type "contact" or "restock"' });
}
