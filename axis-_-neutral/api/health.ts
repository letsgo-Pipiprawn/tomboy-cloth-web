import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.query.ping === '1' || req.query.ping === 'true') {
    return res.status(200).json({ pong: true, ts: Date.now() });
  }

  res.status(200).json({
    ok: true,
    stripe_key: Boolean(process.env.STRIPE_SECRET_KEY),
    supabase_url: Boolean(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL),
    supabase_key: Boolean(
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY,
    ),
  });
}
