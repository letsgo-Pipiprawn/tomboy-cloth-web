import heroBanner from '@/src/assets/images/hero_banner_1779611218812.png';
import { supplierImagesForSlug } from '../data/supplierImages';

/** Collection marketing hero only — not used as product photography. */
export const COLLECTION_HERO_BY_SLUG: Record<string, string> = {
  aw26: heroBanner,
};

function uniqueUrls(urls: (string | null | undefined)[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const url of urls) {
    if (!url || seen.has(url)) continue;
    seen.add(url);
    out.push(url);
  }
  return out;
}

/**
 * Product hero: Supabase/CJ supplier URL first, then local CJ fallback.
 * Never substitute AI model-on or editorial stock as the garment photo.
 */
export function heroImageForSlug(slug: string, fallbackUrl?: string | null): string | null {
  const local = supplierImagesForSlug(slug);
  return fallbackUrl ?? local?.hero ?? null;
}

/** Gallery = supplier photos only (deduped). */
export function galleryImagesForSlug(
  slug: string,
  hero: string | null,
  supplierImages: string[],
): string[] {
  const local = supplierImagesForSlug(slug);
  const merged = uniqueUrls([
    hero,
    ...supplierImages,
    ...(local?.gallery ?? []),
  ]);
  return merged;
}

export function hasProductImagery(slug: string, fallbackUrl?: string | null): boolean {
  return Boolean(heroImageForSlug(slug, fallbackUrl));
}
