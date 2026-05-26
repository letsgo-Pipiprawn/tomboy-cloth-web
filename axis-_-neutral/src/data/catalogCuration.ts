import type { Product } from './products';

/**
 * AXIS / NEUTRAL catalog curation — androgynous city tailoring, neutral palette only.
 * Keep: black / white / grey / charcoal / slate solids, wide-leg & structured silhouettes.
 * Drop: pattern noise, subculture tags, faux materials, non-neutral colours.
 */

export type CurationReason =
  | 'explicit-drop'
  | 'non-neutral-palette'
  | 'wrong-silhouette'
  | 'wrong-aesthetic'
  | 'faux-material';

type CurationRule = {
  slug: string;
  cjProductId: string;
  reason: CurationReason;
  note: string;
};

/** Slugs approved for storefront (curated neutral capsule). */
export const CURATED_PRODUCT_SLUGS = new Set([
  'loose-casual-black-multi-pocket-trousers-17638570',
  'cargo-trousers-with-three-disional-pockets-solid-col-16866555',
  'neploe-new-arrival-high-waist-black-pants-solid-colo-13858804',
  'faux-lambswool-oversized-jacket-coat-winter-black-wa-d1134fb0',
  'office-ladies-black-formal-blazer-work-suit-14533346',
  'solid-long-style-black-jacket-and-blazer-female-notc-70fa7cf4',
  'black-suit-jacket-sense-of-design-niche-autumn-loose-14300765',
  'straight-suit-pants-spring-and-summer-korean-style-h-13854743',
  'summer-new-slim-legs-long-chiffon-wide-leg-pants-kor-b70c95dd',
]);

export const CURATED_CJ_PRODUCT_IDS = [
  '1763857009402716160',
  '1686655519383105536',
  '1385880424588382208',
  'D1134FB0-D63C-4E86-9FE4-FBCF2EBBA9FE',
  '1453334632396361728',
  '70FA7CF4-CC2E-41B2-8A14-66A313CF4675',
  '1430076524123525120',
  '1385474312223461376',
  'B70C95DD-FF12-4079-B962-69EDD6FEF81A',
] as const;

/** Documented removals for team reference. */
export const CATALOG_REMOVALS: CurationRule[] = [
  {
    slug: 'black-plaid-shirt-long-sleeve-casual-loose-shirt-coa-25022105',
    cjProductId: '2502210526511626600',
    reason: 'non-neutral-palette',
    note: 'Plaid grid breaks minimal androgynous neutral system.',
  },
  {
    slug: 'cargo-pants-loose-feet-pants-d7d99ccc',
    cjProductId: 'D7D99CCC-DB31-42A1-9BA9-FAE59038C2A9',
    reason: 'wrong-silhouette',
    note: 'Cuffed/jogger “feet pants” — not wide-leg city tailoring.',
  },
  {
    slug: 'fashion-individual-casual-jacket-25020406',
    cjProductId: '2502040645321606800',
    reason: 'wrong-aesthetic',
    note: 'Generic fast-fashion jacket with no structured shoulder story.',
  },
  {
    slug: 'loose-casual-camouflage-wide-leg-trousers-for-25012713',
    cjProductId: '2501271334171617000',
    reason: 'non-neutral-palette',
    note: 'Camouflage print — off-brand vs charcoal/slate capsule.',
  },
  {
    slug: 'pu-leather-high-waist-loose-black-trousers-casual-st-14154978',
    cjProductId: '1415497852184039424',
    reason: 'faux-material',
    note: 'PU leather reads cheap vs premium tailoring; wrong material story.',
  },
  {
    slug: 'cotton-multi-pocket-loose-cargo-trousers-straight-ou-17764959',
    cjProductId: '1776495907756843008',
    reason: 'non-neutral-palette',
    note: 'Camouflage cargo — military print, not neutral solid.',
  },
  {
    slug: 'camouflage-cargo-casual-pants-328444fd',
    cjProductId: '328444FD-72FC-46EF-97CD-3828CA99BD20',
    reason: 'non-neutral-palette',
    note: 'Camouflage.',
  },
  {
    slug: 'splash-ink-paint-spots-loose-cargo-pants-and-17192421',
    cjProductId: '1719242124052410368',
    reason: 'non-neutral-palette',
    note: 'Paint splatter — breaks calm neutral visual language.',
  },
  {
    slug: 'sibybo-black-cotton-thicken-cargo-pants-autumn-high--13822281',
    cjProductId: '1382228139731718144',
    reason: 'wrong-aesthetic',
    note: 'Harajuku tag — wrong subculture vs city androgynous tailoring.',
  },
  {
    slug: 'streetwear-cargo-pants-for-black-jogger-trousers-13779076',
    cjProductId: '1377907665476390912',
    reason: 'wrong-silhouette',
    note: 'Jogger cuff — sport/street, not tailored wide leg.',
  },
  {
    slug: 's-sports-pants-with-pockets-casual-cargo-trousers-16492895',
    cjProductId: '1649289514764357632',
    reason: 'wrong-aesthetic',
    note: 'Sports pant — activewear, not tailoring.',
  },
  {
    slug: 'letter-embroidery-personality-all-match-black-jeans--14086013',
    cjProductId: '1408601354649341952',
    reason: 'wrong-aesthetic',
    note: 'Hip-hop letter embroidery — wrong identity signal.',
  },
  {
    slug: 'punk-washed-and-worn-loose-straight-cargo-trousers-17913835',
    cjProductId: '1791383568887853056',
    reason: 'wrong-aesthetic',
    note: 'Punk distressed wash — off-brand attitude.',
  },
  {
    slug: 'national-fashion-retro-loose-denim-cargo-pants-wide--24091708',
    cjProductId: '2409170824021625100',
    reason: 'non-neutral-palette',
    note: 'Blue denim wash — outside black/white/grey capsule.',
  },
  {
    slug: 'rivet-design-casual-pants-high-waist-crimp-stitching-17503374',
    cjProductId: '1750337475668615168',
    reason: 'non-neutral-palette',
    note: 'No neutral colour lock — likely khaki/olive variants on CJ.',
  },
  {
    slug: 'multi-pocket-loose-straight-cargo-trousers-24061306',
    cjProductId: '2406130628011622100',
    reason: 'non-neutral-palette',
    note: 'Multi-colour SKU pool — not guaranteed black/grey/white only.',
  },
  {
    slug: 'plus-size-loose-cargo-pants-24080509',
    cjProductId: '2408050905501602900',
    reason: 'non-neutral-palette',
    note: 'No neutral colour in listing title.',
  },
  {
    slug: 'loose-cargo-trousers-fashion-brands-knee-pleated-17914601',
    cjProductId: '1791460166014078976',
    reason: 'non-neutral-palette',
    note: 'No neutral colour in listing title.',
  },
  {
    slug: 'loose-cargo-straight-leg-trousers-high-street-17913854',
    cjProductId: '1791385429913112576',
    reason: 'non-neutral-palette',
    note: 'No neutral colour in listing title.',
  },
  {
    slug: 'double-breasted-blazer-fashion-casual-lapel-jacket-c-15648102',
    cjProductId: '1564810237473992704',
    reason: 'non-neutral-palette',
    note: 'Likely navy/beige variants — not locked to neutral.',
  },
  {
    slug: 'loose-button-casual-wide-leg-trousers-24122602',
    cjProductId: '2412260205251602800',
    reason: 'non-neutral-palette',
    note: 'No neutral colour in listing title.',
  },
];

const NEUTRAL_NAME_PATTERN =
  /\b(black|white|grey|gray|charcoal|slate|neutral|solid)\b/i;

const BLOCKED_NAME_PATTERN =
  /\b(plaid|camouflage|camo|pu leather|faux leather|jogger|sports|harajuku|hip-?hop|punk|paint|splatter|ink spot|korean fashion|denim|embroidery personality)\b/i;

export function isCuratedCatalogProduct(product: Pick<Product, 'slug' | 'name'>): boolean {
  return CURATED_PRODUCT_SLUGS.has(product.slug);
}

/** Defense-in-depth if Supabase still returns deactivated rows. */
export function filterCuratedCatalog<T extends Pick<Product, 'slug' | 'name'>>(products: T[]): T[] {
  return products.filter((product) => {
    if (!isCuratedCatalogProduct(product)) return false;
    if (BLOCKED_NAME_PATTERN.test(product.name)) return false;
    if (!NEUTRAL_NAME_PATTERN.test(product.name)) return false;
    return true;
  });
}

export function getCurationNote(slug: string): string | undefined {
  return CATALOG_REMOVALS.find((entry) => entry.slug === slug)?.note;
}
