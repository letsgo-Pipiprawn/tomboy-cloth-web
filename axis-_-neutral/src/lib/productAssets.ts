import blazer from '@/src/assets/images/oversized_blazer_1779611239597.png';
import trench from '@/src/assets/images/trench_coat_1779611276152.png';
import trousers from '@/src/assets/images/wide_leg_trousers_1779611256512.png';
import loafers from '@/src/assets/images/chunky_loafers_1779611294733.png';
import heroBanner from '@/src/assets/images/hero_banner_1779611218812.png';
import longBlazerWideTrouserLook from '@/src/assets/images/models/long_line_blazer_wide_trouser_lookbook.png';
import modelOnLooseCargo from '@/src/assets/images/products/model-on-loose-cargo-trouser.png';
import modelOnUtilityCargo from '@/src/assets/images/products/model-on-utility-cargo-trouser.png';
import modelOnHighRise from '@/src/assets/images/products/model-on-high-rise-trouser.png';
import modelOnOversizedCoat from '@/src/assets/images/products/model-on-oversized-coat.png';
import modelOnFormalBlazer from '@/src/assets/images/products/model-on-formal-blazer.png';
import modelOnLongLineBlazer from '@/src/assets/images/products/model-on-long-line-blazer.png';
import modelOnRelaxedSuitJacket from '@/src/assets/images/products/model-on-relaxed-suit-jacket.png';
import modelOnSuitTrouser from '@/src/assets/images/products/model-on-suit-trouser.png';
import modelOnWideLegTrouser from '@/src/assets/images/products/model-on-wide-leg-trouser.png';

/** Legacy demo slugs (local fallback catalog). */
export const PRODUCT_IMAGE_BY_SLUG: Record<string, string> = {
  'oversized-charcoal-blazer': blazer,
  'unstructured-slate-trench': trench,
  'wide-leg-suit-trousers': trousers,
  'chunky-leather-loafers': loafers,
};

/** Curated capsule — unified Model B on-body hero (4:5 source). */
export const MODEL_ON_IMAGE_BY_SLUG: Record<string, string> = {
  'loose-casual-black-multi-pocket-trousers-17638570': modelOnLooseCargo,
  'cargo-trousers-with-three-disional-pockets-solid-col-16866555': modelOnUtilityCargo,
  'neploe-new-arrival-high-waist-black-pants-solid-colo-13858804': modelOnHighRise,
  'faux-lambswool-oversized-jacket-coat-winter-black-wa-d1134fb0': modelOnOversizedCoat,
  'office-ladies-black-formal-blazer-work-suit-14533346': modelOnFormalBlazer,
  'solid-long-style-black-jacket-and-blazer-female-notc-70fa7cf4': modelOnLongLineBlazer,
  'black-suit-jacket-sense-of-design-niche-autumn-loose-14300765': modelOnRelaxedSuitJacket,
  'straight-suit-pants-spring-and-summer-korean-style-h-13854743': modelOnSuitTrouser,
  'summer-new-slim-legs-long-chiffon-wide-leg-pants-kor-b70c95dd': modelOnWideLegTrouser,
  'black-double-breasted-chain-blazer-6754': modelOnFormalBlazer,
};

/** Editorial gallery extras — no CJ supplier URLs on curated slugs. */
export const GALLERY_EXTRAS_BY_SLUG: Record<string, string[]> = {
  'loose-casual-black-multi-pocket-trousers-17638570': [longBlazerWideTrouserLook, trousers],
  'cargo-trousers-with-three-disional-pockets-solid-col-16866555': [trousers, heroBanner],
  'neploe-new-arrival-high-waist-black-pants-solid-colo-13858804': [longBlazerWideTrouserLook, blazer],
  'straight-suit-pants-spring-and-summer-korean-style-h-13854743': [blazer, heroBanner],
  'summer-new-slim-legs-long-chiffon-wide-leg-pants-kor-b70c95dd': [trench, longBlazerWideTrouserLook],
  'black-double-breasted-chain-blazer-6754': [longBlazerWideTrouserLook, blazer],
};

export const COLLECTION_HERO_BY_SLUG: Record<string, string> = {
  aw26: heroBanner,
};

export function hasBrandedProductImagery(slug: string): boolean {
  return Boolean(MODEL_ON_IMAGE_BY_SLUG[slug]);
}

export function imageForSlug(slug: string, fallback?: string | null): string {
  return MODEL_ON_IMAGE_BY_SLUG[slug] ?? PRODUCT_IMAGE_BY_SLUG[slug] ?? fallback ?? heroBanner;
}

/** Primary PDP / grid image — always prefer bundled model-on shot. */
export function heroImageForSlug(slug: string, fallbackUrl?: string | null): string {
  return imageForSlug(slug, fallbackUrl);
}

/** Branded hero first, then editorial extras. Skips CJ supplier URLs when model-on exists. */
export function galleryImagesForSlug(
  slug: string,
  hero: string,
  supplierImages: string[],
): string[] {
  if (hasBrandedProductImagery(slug)) {
    const editorial = (GALLERY_EXTRAS_BY_SLUG[slug] ?? []).filter((url) => url && url !== hero);
    return editorial.length > 0 ? [hero, ...editorial] : [hero];
  }

  const extras = supplierImages.filter((url) => url && url !== hero);
  return extras.length > 0 ? [hero, ...extras] : [hero];
}
