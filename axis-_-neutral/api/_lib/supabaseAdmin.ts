import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../src/types/database.generated';
import { requireEnv } from './env';

let admin: SupabaseClient<Database> | null = null;

export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (!admin) {
    const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for checkout');
    }
    admin = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return admin;
}

export function isSupabaseAdminConfigured(): boolean {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  return Boolean(url && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getStripeSecretKey(): string {
  return requireEnv('STRIPE_SECRET_KEY');
}
