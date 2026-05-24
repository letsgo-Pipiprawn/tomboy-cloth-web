import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const result: Record<string, unknown> = {};

  try {
    const { default: Stripe } = await import('stripe');
    const key = process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder';
    new Stripe(key);
    result.stripe = 'ok';
  } catch (e) {
    result.stripe = String(e);
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: { persistSession: false },
    });
    result.supabase = 'ok';
  } catch (e) {
    result.supabase = String(e);
  }

  res.status(200).json(result);
}
