export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function normalizeSiteUrl(url: string): string {
  const trimmed = url.trim().replace(/\/$/, '');
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/** Canonical site origin for Stripe return URLs, emails, etc. */
export function getSiteUrl(): string {
  // Preview checkouts must return to the same deployment host, not production VITE_SITE_URL.
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  const explicit = process.env.VITE_SITE_URL ?? process.env.SITE_URL;
  if (explicit?.trim()) return normalizeSiteUrl(explicit);
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}
