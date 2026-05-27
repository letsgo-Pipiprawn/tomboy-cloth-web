/**
 * Server-safe catalog fallback (no image imports).
 * Keep in sync with src/data/localCatalog.ts + catalogCuration.ts
 */
export type FallbackProduct = {
  id: string;
  slug: string;
  name: string;
  priceAud: number;
  category: string;
  collectionSlug: string;
  description: string;
  story: string;
  details: string[];
  sizes: string[];
  featured: boolean;
  fulfillmentType: 'in_stock' | 'preorder' | 'wishlist';
  supplySource: 'cj' | 'domestic_1688' | 'odm';
  compareAtPriceAud?: number;
  wishlistGoal: number;
  preorderDiscountPercent: number;
  shipsInWeeks: number;
  supplierRef?: string | null;
  cjProductId?: string | null;
};

export const FALLBACK_PRODUCTS: FallbackProduct[] = [
  {
    id: 'wishlist-6754',
    slug: 'black-double-breasted-chain-blazer-6754',
    name: 'Black Double-Breasted Chain Blazer',
    priceAud: 199,
    category: 'Outerwear',
    collectionSlug: 'aw26',
    description:
      'Oversize double-breasted blazer in matte black with a clean lapel and metal chain accent — structured shoulder, city pace.',
    story:
      'Sized for an androgynous drape; order by shoulder first. Chain detail is optional styling — wear open over a bare tee or layered knit.',
    details: [
      'Colour · Black',
      'Silhouette · Double-breasted blazer',
      'Accent · Metal chain',
      'Fabric · Polyester suiting (supplier spec)',
      'Care · Dry clean recommended',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
    fulfillmentType: 'wishlist',
    supplySource: 'domestic_1688',
    compareAtPriceAud: 285,
    wishlistGoal: 40,
    preorderDiscountPercent: 30,
    shipsInWeeks: 4,
    supplierRef: 'https://detail.1688.com/offer/1031360516910.html',
  },
  {
    id: 'wishlist-trench-14565116',
    slug: 'black-double-breasted-trench-coat-14565116',
    name: 'Black Double-Breasted Trench Coat',
    priceAud: 238,
    category: 'Outerwear',
    collectionSlug: 'aw26',
    description:
      'Long-line black trench with a notched lapel, double-breasted closure, and belt — city layering for AW26.',
    story:
      'Tier 3 test piece — we only run this if the waitlist clears. Black colourway only. Layer over wide-leg trousers; belt optional for shape or worn open for length.',
    details: [
      'Colour · Black',
      'Silhouette · Double-breasted trench',
      'Length · Mid-long · Over knee',
      'Fabric · Polyester suiting blend (supplier spec)',
    ],
    sizes: ['S', 'M', 'L'],
    featured: false,
    fulfillmentType: 'wishlist',
    supplySource: 'cj',
    compareAtPriceAud: 340,
    wishlistGoal: 40,
    preorderDiscountPercent: 30,
    shipsInWeeks: 2,
    cjProductId: '1456511646217408512',
  },
  {
    id: 'cj-17638570',
    slug: 'loose-casual-black-multi-pocket-trousers-17638570',
    name: 'Black Multi-Pocket Cargo Trouser',
    priceAud: 260,
    category: 'Bottoms',
    collectionSlug: 'aw26',
    description:
      'Relaxed wide-leg cargo in solid black with utility pocketing and a clean city-line drape.',
    story:
      'Cut with a high rise and generous leg. Size down if you prefer a closer waist; take your usual size for the intended oversized androgynous proportion.',
    details: ['Colour · Black', 'Leg · Wide straight with cargo volume'],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
    fulfillmentType: 'in_stock',
    supplySource: 'cj',
    wishlistGoal: 40,
    preorderDiscountPercent: 30,
    shipsInWeeks: 2,
    cjProductId: '1763857009402716160',
  },
  {
    id: 'cj-16866555',
    slug: 'cargo-trousers-with-three-disional-pockets-solid-col-16866555',
    name: 'Solid Utility Cargo Trouser',
    priceAud: 260,
    category: 'Bottoms',
    collectionSlug: 'aw26',
    description:
      'Structured cargo trouser in a matte solid finish — dimensional pockets, no print, no noise.',
    story:
      'Straight relaxed leg with room through the thigh. Designed to sit at the natural waist with a column silhouette.',
    details: ['Colour · Solid black / charcoal', 'Pockets · Three-dimensional cargo pockets'],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
    fulfillmentType: 'in_stock',
    supplySource: 'cj',
    wishlistGoal: 40,
    preorderDiscountPercent: 30,
    shipsInWeeks: 2,
    cjProductId: '1686655519383105536',
  },
  {
    id: 'cj-13858804',
    slug: 'neploe-new-arrival-high-waist-black-pants-solid-colo-13858804',
    name: 'High-Rise Black Trouser',
    priceAud: 260,
    category: 'Bottoms',
    collectionSlug: 'aw26',
    description:
      'Minimal black trouser with a defined high waist and clean leg — foundation piece for suiting or solo wear.',
    story: 'Slim-straight through the leg with structure at the waist. For an androgynous drape, size up one.',
    details: ['Colour · Black', 'Rise · High rise', 'Leg · Slim straight'],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
    fulfillmentType: 'in_stock',
    supplySource: 'cj',
    wishlistGoal: 40,
    preorderDiscountPercent: 30,
    shipsInWeeks: 2,
    cjProductId: '1385880424588382208',
  },
  {
    id: 'cj-13854743',
    slug: 'straight-suit-pants-spring-and-summer-korean-style-h-13854743',
    name: 'Black Suit Trouser',
    priceAud: 260,
    category: 'Bottoms',
    collectionSlug: 'aw26',
    description:
      'Pressed black suit trouser with a high waist and clean cigarette line — sharp enough for work, calm enough for off-duty.',
    story:
      'Cropped-nine length on most heights. High rise sits at the natural waist; check inseam against size chart.',
    details: ['Colour · Black', 'Leg · Straight · Cropped length'],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
    fulfillmentType: 'in_stock',
    supplySource: 'cj',
    wishlistGoal: 40,
    preorderDiscountPercent: 30,
    shipsInWeeks: 2,
    cjProductId: '1385474312223461376',
  },
  {
    id: 'cj-b70c95dd',
    slug: 'summer-new-slim-legs-long-chiffon-wide-leg-pants-kor-b70c95dd',
    name: 'Wide-Leg Black Trouser',
    priceAud: 260,
    category: 'Bottoms',
    collectionSlug: 'aw26',
    description:
      'Fluid wide-leg trouser in black with a soft drape — movement-first tailoring for warm city days.',
    story:
      'Lightweight hand with a full leg. Elastic or relaxed waist depending on batch; refer to flat measurements below.',
    details: ['Colour · Black', 'Leg · Wide leg · Full length'],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
    fulfillmentType: 'in_stock',
    supplySource: 'cj',
    wishlistGoal: 40,
    preorderDiscountPercent: 30,
    shipsInWeeks: 2,
    cjProductId: 'B70C95DD-FF12-4079-B962-69EDD6FEF81A',
  },
];

export function getFallbackProductBySlug(slug: string): FallbackProduct | undefined {
  return FALLBACK_PRODUCTS.find((p) => p.slug === slug);
}
