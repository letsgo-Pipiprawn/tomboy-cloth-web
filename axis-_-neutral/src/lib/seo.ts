import { BRAND } from '../data/site';

/** Set `VITE_SITE_URL` in Vercel (e.g. https://your-domain.vercel.app) for sitemap & OG absolutes. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL as string | undefined
)?.replace(/\/$/, '');

export function getSiteOrigin(): string {
  if (typeof window !== 'undefined') return window.location.origin;
  return SITE_URL || 'https://tomboy-cloth-web.vercel.app';
}

export const DEFAULT_DESCRIPTION =
  'AXIS / NEUTRAL — cinematic tomboy tailoring for the modern city. Melbourne studio, Australia-wide shipping.';

export const DEFAULT_OG_IMAGE_PATH = '/og-default.jpg';

export function absoluteUrl(path: string): string {
  const base = getSiteOrigin();
  return path.startsWith('http') ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageTitle(title: string): string {
  return `${title} | ${BRAND.name}`;
}

export const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND.name,
  description: BRAND.description,
  email: BRAND.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressCountry: 'AU',
  },
} as const;
