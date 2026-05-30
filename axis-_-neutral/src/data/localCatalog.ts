import { CURATED_PRODUCT_SLUGS } from './catalogCuration';
import { DEFAULT_FULFILLMENT, type FulfillmentMeta } from './fulfillment';
import { getProductCopy } from './productCopy';
import { galleryImagesForSlug, heroImageForSlug } from '../lib/productAssets';
import { supplierImagesForSlug } from './supplierImages';
import type { Product } from './productTypes';

type LocalMeta = {
  id: string;
  priceAud: number;
  category: string;
  featured?: boolean;
  cjProductId?: string;
  soldOutSizes?: string[];
} & Partial<FulfillmentMeta>;

/** Offline / Supabase-fallback capsule — keep in sync with catalogCuration.ts */
const LOCAL_META: Record<string, LocalMeta> = {
  'black-loose-zip-hoodie-cardigan-2773343': {
    id: 'cj-2773343',
    priceAud: 89,
    category: 'Tops',
    featured: true,
    fulfillmentType: 'in_stock',
    supplySource: 'cj',
    compareAtPriceAud: 129,
    cjProductId: '2603030850021614800',
    supplierRef:
      'https://cjdropshipping.com/product/korean-style-loose-fitting-sports-top-for-students-p-2603030850021614800.html',
  },
  'black-double-breasted-chain-blazer-6754': {
    id: 'wishlist-6754',
    priceAud: 199,
    category: 'Outerwear',
    featured: false,
    fulfillmentType: 'wishlist',
    supplySource: 'domestic_1688',
    compareAtPriceAud: 285,
    wishlistGoal: 40,
    shipsInWeeks: 4,
    preorderDiscountPercent: 30,
    supplierRef: 'https://detail.1688.com/offer/1031360516910.html',
  },
};

function buildProduct(slug: string): Product {
  const copy = getProductCopy(slug);
  const meta = LOCAL_META[slug];
  if (!copy || !meta) {
    throw new Error(`Missing local catalog entry for ${slug}`);
  }

  const supplier = supplierImagesForSlug(slug);
  const hero = heroImageForSlug(slug, supplier?.hero) ?? '';
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
    images: galleryImagesForSlug(slug, hero || null, supplier?.gallery ?? []),
    description: copy.description,
    story: copy.story ?? copy.fitNote,
    details: copy.specs.map((spec) => `${spec.label} · ${spec.value}`),
    sizes: copy.sizes,
    soldOutSizes: meta.soldOutSizes,
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
