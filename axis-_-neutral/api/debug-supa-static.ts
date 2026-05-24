import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { getStripe } from './_lib/stripe';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const client = createClient(
      process.env.SUPABASE_URL ?? 'https://x.supabase.co',
      process.env.SUPABASE_SECRET_KEY ?? 'placeholder',
      { auth: { persistSession: false } },
    );
    const stripe = getStripe();
    res.status(200).json({ supabase: !!client, stripe: !!stripe });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
