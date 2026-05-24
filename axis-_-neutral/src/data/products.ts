import blazer from '@/src/assets/images/oversized_blazer_1779611239597.png';
import trench from '@/src/assets/images/trench_coat_1779611276152.png';
import trousers from '@/src/assets/images/wide_leg_trousers_1779611256512.png';
import loafers from '@/src/assets/images/chunky_loafers_1779611294733.png';

export type Product = {
  id: string;
  slug: string;
  name: string;
  priceAud: number;
  category: string;
  collectionSlug: string;
  image: string;
  images: string[];
  description: string;
  story: string;
  details: string[];
  sizes: string[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: '1',
    slug: 'oversized-charcoal-blazer',
    name: 'The Oversized Charcoal Blazer',
    priceAud: 450,
    category: 'Outerwear',
    collectionSlug: 'aw26',
    image: blazer,
    images: [blazer],
    description:
      'A relaxed-shoulder blazer cut from brushed Italian wool. Designed to drape rather than constrain — the defining piece of the AW26 silhouette.',
    story:
      'We began AW26 with a single question: what if structure could feel weightless? The Oversized Charcoal Blazer borrows from classic menswear proportions but removes the internal canvas, letting the shoulder fall naturally. Wear it over a bare tee in summer, layered under the Slate Trench when the city turns cold.',
    details: [
      '100% brushed Italian wool',
      'Relaxed shoulder, single-button closure',
      'Fully lined in cupro',
      'Dry clean only',
      'Made in Portugal',
    ],
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
    image: trench,
    images: [trench],
    description:
      'A fluid trench without shoulder padding. Water-resistant cotton blend in cool slate grey.',
    story:
      'The trench reimagined for movement. No epaulettes, no rigidity — only a clean belted line and a storm flap that actually functions in Melbourne weather.',
    details: [
      'Cotton-nylon blend, water-resistant finish',
      'Unstructured shoulder',
      'Removable belt',
      'Hidden side pockets',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '3',
    slug: 'wide-leg-suit-trousers',
    name: 'Wide-Leg Suit Trousers',
    priceAud: 320,
    category: 'Bottoms',
    collectionSlug: 'aw26',
    image: trousers,
    images: [trousers],
    description:
      'High-rise wide leg in charcoal wool suiting. Pressed crease optional — we prefer it broken in.',
    story:
      'Built to sit at the natural waist and fall in a clean column. Pair with the Charcoal Blazer for a full suit, or with a white tee for off-duty proportion.',
    details: [
      'Wool blend suiting',
      'High rise, zip fly',
      'Side adjusters',
      'Dry clean only',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: '4',
    slug: 'chunky-leather-loafers',
    name: 'Chunky Leather Loafers',
    priceAud: 490,
    category: 'Footwear',
    collectionSlug: 'aw26',
    image: loafers,
    images: [loafers],
    description:
      'Substantial leather loafer with a sculptural sole. Grounds the oversized proportions above.',
    story:
      'Footwear as anchor. The chunky sole balances wide-leg trousers and long-line outerwear without tipping into costume.',
    details: [
      'Full-grain leather upper',
      'Leather sole with rubber insert',
      'Cushioned insole',
      'Made in Italy',
    ],
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(aud: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
  }).format(aud);
}

export function getFeaturedProduct(): Product {
  return products.find((p) => p.featured) ?? products[0];
}
