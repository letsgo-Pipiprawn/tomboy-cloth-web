import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from '../lib/supabaseAdmin.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const slug = typeof req.query.slug === 'string' ? req.query.slug.trim() : '';
  if (!slug) {
    return res.status(400).json({ error: 'slug is required' });
  }

  if (!isSupabaseAdminConfigured()) {
    return res.status(503).json({ error: 'Waitlist count unavailable' });
  }

  const supabase = getSupabaseAdmin();

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('slug, fulfillment_type, wishlist_goal, is_active')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (productError || !product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (product.fulfillment_type !== 'wishlist') {
    return res.status(400).json({ error: 'Product is not on waitlist' });
  }

  const { count, error: countError } = await supabase
    .from('wishlist_signups')
    .select('*', { count: 'exact', head: true })
    .eq('product_slug', slug);

  if (countError) {
    console.error('[wishlist/count]', countError);
    return res.status(500).json({ error: 'Could not load signup count' });
  }

  return res.status(200).json({
    count: count ?? 0,
    goal: product.wishlist_goal,
  });
}
