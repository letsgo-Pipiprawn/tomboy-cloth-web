import { COLLECTION_AW26_HERO } from '../config/editorialImages';
import { requiresBrandImagePack } from '../data/storefrontCapsule';
import { supplierImagesForSlug } from '../data/supplierImages';

/** Collection marketing hero only — not used as product photography. */
export const COLLECTION_HERO_BY_SLUG: Record<string, string> = {
  aw26: COLLECTION_AW26_HERO,
};

const LOCAL_PRODUCT_IMAGE_MODULES = import.meta.glob('../assets/images/products/*/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const LOCAL_PRODUCT_DISPLAY_ORDER = ['07', '01', '02', '03', '04', '05', '06'];

function buildLocalProductImageSets(): Record<string, string[]> {
  const bySlug = new Map<string, { fileName: string; url: string }[]>();

  for (const [path, url] of Object.entries(LOCAL_PRODUCT_IMAGE_MODULES)) {
    const match = path.match(/products\/([^/]+)\/([^/]+)$/);
    if (!match) continue;
    const [, slug, fileName] = match;
    if (!/^\d{2}-.*\.(png|jpe?g|webp)$/i.test(fileName)) continue;

    const existing = bySlug.get(slug) ?? [];
    existing.push({ fileName, url });
    bySlug.set(slug, existing);
  }

  return Object.fromEntries(
    [...bySlug.entries()].map(([slug, assets]) => {
      const ordered = [...assets].sort((left, right) => {
        const leftPrefix = left.fileName.slice(0, 2);
        const rightPrefix = right.fileName.slice(0, 2);
        const leftIndex = LOCAL_PRODUCT_DISPLAY_ORDER.indexOf(leftPrefix);
        const rightIndex = LOCAL_PRODUCT_DISPLAY_ORDER.indexOf(rightPrefix);
        const leftRank = leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex;
        const rightRank = rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex;

        if (leftRank !== rightRank) return leftRank - rightRank;
        return left.fileName.localeCompare(right.fileName);
      });

      return [slug, ordered.map((asset) => asset.url)];
    }),
  );
}

const LOCAL_PRODUCT_IMAGE_SETS = buildLocalProductImageSets();

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

export function localProductImageSetForSlug(slug: string): string[] {
  return LOCAL_PRODUCT_IMAGE_SETS[slug] ?? [];
}

/**
 * Storefront hero: committed brand pack (01–07) only for capsule SKUs.
 * Supabase / CJ URLs are never shown on PDP for those slugs.
 */
export function heroImageForSlug(slug: string, fallbackUrl?: string | null): string | null {
  const localSet = localProductImageSetForSlug(slug);
  if (localSet.length > 0) return localSet[0];

  const local = supplierImagesForSlug(slug);
  const supplierFallback = fallbackUrl ?? local?.hero ?? null;
  if (supplierFallback) return supplierFallback;

  if (requiresBrandImagePack(slug)) return null;
  return null;
}

/**
 * Storefront gallery: local brand pack when present.
 * Capsule SKUs must not fall back to raw supplier photos (style drift).
 */
export function galleryImagesForSlug(
  slug: string,
  hero: string | null,
  supplierImages: string[],
): string[] {
  const localSet = localProductImageSetForSlug(slug);
  if (localSet.length > 0) return uniqueUrls(localSet);

  const local = supplierImagesForSlug(slug);
  const merged = uniqueUrls([
    hero,
    ...supplierImages,
    ...(local?.gallery ?? []),
  ]);
  if (merged.length > 0) return merged;

  if (requiresBrandImagePack(slug)) return [];
  return [];
}

export function hasProductImagery(slug: string, fallbackUrl?: string | null): boolean {
  return Boolean(heroImageForSlug(slug, fallbackUrl));
}
