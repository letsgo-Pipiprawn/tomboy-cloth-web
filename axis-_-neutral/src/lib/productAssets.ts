import blazer from '@/src/assets/images/oversized_blazer_1779611239597.png';
import trench from '@/src/assets/images/trench_coat_1779611276152.png';
import trousers from '@/src/assets/images/wide_leg_trousers_1779611256512.png';
import loafers from '@/src/assets/images/chunky_loafers_1779611294733.png';
import heroBanner from '@/src/assets/images/hero_banner_1779611218812.png';

/** Bundled images keyed by product slug (until URLs live in Supabase Storage). */
export const PRODUCT_IMAGE_BY_SLUG: Record<string, string> = {
  'oversized-charcoal-blazer': blazer,
  'unstructured-slate-trench': trench,
  'wide-leg-suit-trousers': trousers,
  'chunky-leather-loafers': loafers,
};

export const COLLECTION_HERO_BY_SLUG: Record<string, string> = {
  aw26: heroBanner,
};

export function imageForSlug(slug: string, fallback?: string | null): string {
  return PRODUCT_IMAGE_BY_SLUG[slug] ?? fallback ?? heroBanner;
}
