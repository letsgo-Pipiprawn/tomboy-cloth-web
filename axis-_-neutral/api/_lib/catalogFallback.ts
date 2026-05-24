/**
 * Server-safe catalog fallback (no image imports — Vercel functions cannot bundle PNG from src/data/products.ts).
 * Keep in sync with supabase/seed.sql.
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
};

export const FALLBACK_PRODUCTS: FallbackProduct[] = [
  {
    id: '1',
    slug: 'oversized-charcoal-blazer',
    name: 'The Oversized Charcoal Blazer',
    priceAud: 450,
    category: 'Outerwear',
    collectionSlug: 'aw26',
    description:
      'A relaxed-shoulder blazer cut from brushed Italian wool. Designed to drape rather than constrain — the defining piece of the AW26 silhouette.',
    story: 'We began AW26 with a single question: what if structure could feel weightless?',
    details: ['100% brushed Italian wool', 'Relaxed shoulder, single-button closure'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: true,
  },
  {
    id: '2',
    slug: 'unstructured-slate-trench',
    name: 'Unstructured Slate Trench',
    priceAud: 680,
    category: 'Outerwear',
    collectionSlug: 'aw26',
    description: 'A fluid trench without shoulder padding. Water-resistant cotton blend in cool slate grey.',
    story: 'The trench reimagined for movement.',
    details: ['Cotton-nylon blend, water-resistant finish'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
  },
  {
    id: '3',
    slug: 'wide-leg-suit-trousers',
    name: 'Wide-Leg Suit Trousers',
    priceAud: 320,
    category: 'Bottoms',
    collectionSlug: 'aw26',
    description: 'High-rise wide leg in charcoal wool suiting.',
    story: 'Built to sit at the natural waist and fall in a clean column.',
    details: ['Wool blend suiting', 'High rise, zip fly'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
  },
  {
    id: '4',
    slug: 'chunky-leather-loafers',
    name: 'Chunky Leather Loafers',
    priceAud: 490,
    category: 'Footwear',
    collectionSlug: 'aw26',
    description: 'Substantial leather loafer with a sculptural sole.',
    story: 'Footwear as anchor.',
    details: ['Full-grain leather upper'],
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
    featured: false,
  },
];

export function getFallbackProductBySlug(slug: string): FallbackProduct | undefined {
  return FALLBACK_PRODUCTS.find((p) => p.slug === slug);
}
