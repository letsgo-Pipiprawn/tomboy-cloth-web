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
    id: 'cj-2773343',
    slug: 'black-loose-zip-hoodie-cardigan-2773343',
    name: 'Black Loose Zip Hoodie Cardigan',
    priceAud: 89,
    category: 'Tops',
    collectionSlug: 'aw26',
    description:
      'Oversized zip-through hoodie cardigan in matte black — relaxed drop shoulder, clean hardware, city layer.',
    story:
      'Borrowed lines, owned attitude. A neutral layer for androgynous city dressing — zip half-open over a tee or closed under a blazer.',
    details: [
      'Colour · Black',
      'Silhouette · Loose zip hoodie cardigan',
      'Fabric · Polyester (supplier spec)',
      'Closure · Full zip',
      'Care · Cold wash gentle, dry flat',
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    featured: true,
    fulfillmentType: 'in_stock',
    supplySource: 'cj',
    compareAtPriceAud: 129,
    wishlistGoal: 40,
    preorderDiscountPercent: 30,
    shipsInWeeks: 4,
    supplierRef:
      'https://cjdropshipping.com/product/korean-style-loose-fitting-sports-top-for-students-p-2603030850021614800.html',
    cjProductId: '2603030850021614800',
  },
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
    featured: false,
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
