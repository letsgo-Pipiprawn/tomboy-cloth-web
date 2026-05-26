import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from '../lib/supabaseAdmin.js';

type Body = {
  email?: string;
  source?: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as Body;
  const email = body.email?.trim().toLowerCase();
  const source = body.source?.trim() || 'footer';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  if (!isSupabaseAdminConfigured()) {
    return res.status(503).json({ error: 'Newsletter signup is not configured yet' });
  }

  const supabase = getSupabaseAdmin();

  const { error: insertError } = await supabase.from('newsletter_signups').insert({
    email,
    source,
  });

  if (insertError) {
    if (insertError.code === '23505') {
      return res.status(200).json({ ok: true, duplicate: true });
    }
    console.error('[newsletter/signup]', insertError);
    return res.status(500).json({ error: 'Could not save signup' });
  }

  return res.status(200).json({ ok: true });
}
