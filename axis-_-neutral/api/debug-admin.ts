import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isSupabaseAdminConfigured, getStripeSecretKey } from './_lib/supabaseAdmin';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    res.status(200).json({
      supabaseConfigured: isSupabaseAdminConfigured(),
      hasStripeKey: Boolean(getStripeSecretKey()),
    });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
