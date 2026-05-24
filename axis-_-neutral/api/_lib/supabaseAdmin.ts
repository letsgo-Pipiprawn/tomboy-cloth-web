import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { requireEnv } from './env';

let admin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!admin) {
    const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
    // Vercel–Supabase integration names it SUPABASE_SECRET_KEY; also support SUPABASE_SERVICE_ROLE_KEY
    const key =
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
    if (!url || !key) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY) are required for checkout');
    }
    admin = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return admin;
}

export function isSupabaseAdminConfigured(): boolean {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  return Boolean(url && key);
}

export function getStripeSecretKey(): string {
  return requireEnv('STRIPE_SECRET_KEY');
}
