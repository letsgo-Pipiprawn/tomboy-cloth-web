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
];

export function getFallbackProductBySlug(slug: string): FallbackProduct | undefined {
  return FALLBACK_PRODUCTS.find((p) => p.slug === slug);
}
