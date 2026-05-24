import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const c = createClient('https://x.supabase.co', 'key', { auth: { persistSession: false } });
    res.status(200).json({ ok: true, supabase: !!c });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
