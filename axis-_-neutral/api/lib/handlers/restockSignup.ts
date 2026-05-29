import type { VercelResponse } from '@vercel/node';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from '../supabaseAdmin.js';

type Body = {
  email?: string;
  slug?: string;
  size?: string;
};

export async function handleRestockSignup(body: Body, res: VercelResponse) {
  const email = body.email?.trim().toLowerCase();
  const slug = body.slug?.trim();
  const size = body.size?.trim().toUpperCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  if (!slug || !size) {
    return res.status(400).json({ error: 'Product and size are required' });
  }

  if (!isSupabaseAdminConfigured()) {
    return res.status(503).json({ error: 'Back-in-stock alerts are not configured yet' });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('restock_signups').insert({
    email,
    product_slug: slug,
    size,
  });

  if (error) {
    if (error.code === '23505') {
      return res.status(200).json({ ok: true, duplicate: true });
    }
    console.error('[restock/signup]', error);
    return res.status(500).json({ error: 'Could not save alert' });
  }

  return res.status(200).json({ ok: true });
}
