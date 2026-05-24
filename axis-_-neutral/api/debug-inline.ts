import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Inline everything — no _lib imports — to test if the issue is with _lib/ directory
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) return res.status(500).json({ error: 'No STRIPE_SECRET_KEY' });

    const stripe = new Stripe(stripeKey);

    const supabaseUrl = process.env.SUPABASE_URL ?? '';
    const supabaseKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

    const siteUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'aud',
          unit_amount: 45000,
          product_data: { name: 'Test Product' },
        },
      }],
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
    });

    res.status(200).json({ ok: true, url: session.url, sessionId: session.id });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
