import { products } from './products';
import collectionHero from '@/src/assets/images/hero_banner_1779611218812.png';

export type Collection = {
  slug: string;
  title: string;
  season: string;
  tagline: string;
  description: string;
  heroImage: string;
};

export const collections: Collection[] = [
  {
    slug: 'aw26',
    title: 'Autumn / Winter 26',
    season: 'AW26',
    tagline: 'The Shape of Form',
    description:
      'Exploring the boundaries between structure and fluidity. A capsule of outerwear, suiting, and foundation pieces in charcoal, slate, and neutral black — built for the modern city aesthetic.',
    heroImage: collectionHero,
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getProductsByCollection(slug: string) {
  return products.filter((p) => p.collectionSlug === slug);
}
