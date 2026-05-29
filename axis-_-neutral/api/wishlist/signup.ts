import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from '../lib/supabaseAdmin.js';
import { maybeOpenPreorder } from '../lib/wishlistAutomation.js';

type Body = {
  productSlug?: string;
  email?: string;
  sizePreference?: string;
  source?: string;
};

async function handleGetCount(req: VercelRequest, res: VercelResponse) {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    return handleGetCount(req, res);
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as Body;
  const productSlug = body.productSlug?.trim();
  const email = body.email?.trim().toLowerCase();
  const sizePreference = body.sizePreference?.trim() || null;
  const source = body.source?.trim() || 'pdp';

  if (!productSlug || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid productSlug and email required' });
  }

  if (!isSupabaseAdminConfigured()) {
    return res.status(503).json({ error: 'Waitlist is not configured yet. Email studio@axisneutral.com.au' });
  }

  const supabase = getSupabaseAdmin();

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('slug, fulfillment_type, wishlist_goal, is_active')
    .eq('slug', productSlug)
    .eq('is_active', true)
    .maybeSingle();

  if (productError || !product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (product.fulfillment_type !== 'wishlist') {
    return res.status(400).json({ error: 'This product is not on waitlist' });
  }

  const { error: insertError } = await supabase.from('wishlist_signups').insert({
    product_slug: productSlug,
    email,
    size_preference: sizePreference,
    source,
  });

  if (insertError) {
    if (insertError.code === '23505') {
      const { count } = await supabase
        .from('wishlist_signups')
        .select('*', { count: 'exact', head: true })
        .eq('product_slug', productSlug);

      const preorder = await maybeOpenPreorder(productSlug);

      return res.status(200).json({
        ok: true,
        duplicate: true,
        goal: product.wishlist_goal,
        count: count ?? null,
        preorderOpened: preorder.opened,
        fulfillmentType: preorder.opened || preorder.alreadyOpen ? 'preorder' : 'wishlist',
      });
    }
    console.error('[wishlist]', insertError);
    return res.status(500).json({ error: 'Could not save signup' });
  }

  const { count } = await supabase
    .from('wishlist_signups')
    .select('*', { count: 'exact', head: true })
    .eq('product_slug', productSlug);

  const preorder = await maybeOpenPreorder(productSlug);

  return res.status(200).json({
    ok: true,
    goal: product.wishlist_goal,
    count: count ?? null,
    preorderOpened: preorder.opened,
    fulfillmentType: preorder.opened || preorder.alreadyOpen ? 'preorder' : 'wishlist',
    emailsQueued: preorder.emailsQueued,
  });
}
