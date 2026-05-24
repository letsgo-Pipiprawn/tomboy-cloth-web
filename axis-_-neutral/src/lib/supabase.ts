import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}

let client: SupabaseClient<Database> | null = null;

/** Browser-safe client (anon key + RLS). Returns null if env vars are missing. */
export function getSupabase(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient<Database>(url!, anonKey!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
