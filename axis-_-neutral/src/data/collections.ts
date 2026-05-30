import { COLLECTION_AW26_HERO } from '../config/editorialImages';
import { products, type Product } from './products';

export type Collection = {
  slug: string;
  title: string;
  season: string;
  tagline: string;
  /** Longer copy for SEO meta / about sections */
  description: string;
  /** Small uppercase gray text in the collection header (right side) */
  seoDescription: string;
  heroImage?: string;
  /** `all` = entire catalog; `collection` = match collection slug on products */
  productScope: 'all' | 'collection';
  /** Category filter labels (ALL is added automatically in the template) */
  filters?: readonly string[];
};

export const DEFAULT_COLLECTION_FILTERS = [
  'OUTERWEAR',
  'BOTTOMS',
  'TOPS',
  'FOOTWEAR',
] as const;

/**
 * Collection pages — edit title / seoDescription / description here.
 * Layout and GSAP behaviour live in CollectionTemplate (shared).
 */
export const collections: Collection[] = [
  {
    slug: 'all',
    title: 'All Objects',
    season: 'SHOP',
    tagline: 'Full Catalog',
    description:
      'The complete AXIS / NEUTRAL assortment — hero blazer and trench on waitlist, five in-stock neutral trousers, city tailoring for Australia.',
    seoDescription:
      'Androgynous womenswear for Australia. Join the waitlist on outerwear tests, or shop black cargo and wide-leg trousers ready to ship.',
    productScope: 'all',
    filters: DEFAULT_COLLECTION_FILTERS,
  },
  {
    slug: 'aw26',
    title: 'Autumn / Winter 26',
    season: 'AW26',
    tagline: 'The Shape of Form',
    description:
      'Exploring the boundaries between structure and fluidity. A capsule of outerwear, suiting, and foundation pieces in charcoal, slate, and neutral black — built for the modern city aesthetic.',
    seoDescription:
      'AW26 capsule — structured outerwear, wide-leg suiting, and foundation pieces in muted neutrals. Androgynous city tailoring for Melbourne, Sydney, and Brisbane.',
    heroImage: COLLECTION_AW26_HERO,
    productScope: 'collection',
    filters: DEFAULT_COLLECTION_FILTERS,
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getProductsForCollection(catalog: Product[], collection: Collection): Product[] {
  if (collection.productScope === 'all') return catalog;
  return catalog.filter((p) => p.collectionSlug === collection.slug);
}

export function getProductsByCollection(slug: string) {
  return products.filter((p) => p.collectionSlug === slug);
}
