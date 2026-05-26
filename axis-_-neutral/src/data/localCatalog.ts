import { CURATED_PRODUCT_SLUGS } from './catalogCuration';
import { DEFAULT_FULFILLMENT, type FulfillmentMeta } from './fulfillment';
import { getProductCopy } from './productCopy';
import { galleryImagesForSlug, heroImageForSlug } from '../lib/productAssets';
import type { Product } from './productTypes';

type LocalMeta = {
  id: string;
  priceAud: number;
  category: string;
  featured?: boolean;
  cjProductId?: string;
} & Partial<FulfillmentMeta>;

/** Offline / Supabase-fallback capsule — keep in sync with catalogCuration.ts */
const LOCAL_META: Record<string, LocalMeta> = {
  'black-double-breasted-chain-blazer-6754': {
    id: 'wishlist-6754',
    priceAud: 199,
    category: 'Outerwear',
    featured: true,
    fulfillmentType: 'wishlist',
    supplySource: 'domestic_1688',
    compareAtPriceAud: 285,
    wishlistGoal: 40,
    shipsInWeeks: 4,
    preorderDiscountPercent: 30,
    supplierRef: '6754',
  },
  'loose-casual-black-multi-pocket-trousers-17638570': {
    id: 'cj-17638570',
    priceAud: 260,
    category: 'Bottoms',
    fulfillmentType: 'in_stock',
    supplySource: 'cj',
    shipsInWeeks: 2,
    cjProductId: '1763857009402716160',
  },
  'cargo-trousers-with-three-disional-pockets-solid-col-16866555': {
    id: 'cj-16866555',
    priceAud: 260,
    category: 'Bottoms',
    fulfillmentType: 'in_stock',
    supplySource: 'cj',
    shipsInWeeks: 2,
    cjProductId: '1686655519383105536',
  },
  'neploe-new-arrival-high-waist-black-pants-solid-colo-13858804': {
    id: 'cj-13858804',
    priceAud: 260,
    category: 'Bottoms',
    fulfillmentType: 'in_stock',
    supplySource: 'cj',
    shipsInWeeks: 2,
    cjProductId: '1385880424588382208',
  },
  'straight-suit-pants-spring-and-summer-korean-style-h-13854743': {
    id: 'cj-13854743',
    priceAud: 260,
    category: 'Bottoms',
    fulfillmentType: 'in_stock',
    supplySource: 'cj',
    shipsInWeeks: 2,
    cjProductId: '1385474312223461376',
  },
  'summer-new-slim-legs-long-chiffon-wide-leg-pants-kor-b70c95dd': {
    id: 'cj-b70c95dd',
    priceAud: 260,
    category: 'Bottoms',
    fulfillmentType: 'in_stock',
    supplySource: 'cj',
    shipsInWeeks: 2,
    cjProductId: 'B70C95DD-FF12-4079-B962-69EDD6FEF81A',
  },
};

function buildProduct(slug: string): Product {
  const copy = getProductCopy(slug);
  const meta = LOCAL_META[slug];
  if (!copy || !meta) {
    throw new Error(`Missing local catalog entry for ${slug}`);
  }

  const hero = heroImageForSlug(slug);
  const fulfillment: FulfillmentMeta = {
    fulfillmentType: meta.fulfillmentType ?? DEFAULT_FULFILLMENT.fulfillmentType,
    supplySource: meta.supplySource ?? DEFAULT_FULFILLMENT.supplySource,
    compareAtPriceAud: meta.compareAtPriceAud,
    preorderDiscountPercent: meta.preorderDiscountPercent ?? DEFAULT_FULFILLMENT.preorderDiscountPercent,
    shipsInWeeks: meta.shipsInWeeks ?? DEFAULT_FULFILLMENT.shipsInWeeks,
    wishlistGoal: meta.wishlistGoal ?? DEFAULT_FULFILLMENT.wishlistGoal,
    wishlistOpensAt: meta.wishlistOpensAt ?? null,
    supplierRef: meta.supplierRef ?? null,
  };

  return {
    id: meta.id,
    slug,
    name: copy.name,
    priceAud: meta.priceAud,
    category: meta.category,
    collectionSlug: 'aw26',
    image: hero,
    images: galleryImagesForSlug(slug, hero, []),
    description: copy.description,
    story: copy.story ?? copy.fitNote,
    details: copy.specs.map((spec) => `${spec.label} · ${spec.value}`),
    sizes: copy.sizes,
    featured: meta.featured ?? false,
    specs: copy.specs,
    sizeChart: copy.sizeChart,
    fitNote: copy.fitNote,
    ...fulfillment,
  };
}

/** Curated capsule for local / offline catalog fallback. */
export const LOCAL_CATALOG_PRODUCTS: Product[] = [...CURATED_PRODUCT_SLUGS]
  .map(buildProduct)
  .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
