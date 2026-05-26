export type ProductSpec = {
  label: string;
  value: string;
};

export type SizeChartRow = {
  size: string;
  waist: string;
  hip: string;
  length: string;
};

export type ProductCopy = {
  name: string;
  description: string;
  /** Brand narrative for PDP — separate from fit guidance. */
  story?: string;
  fitNote: string;
  specs: ProductSpec[];
  sizeChart: SizeChartRow[];
  sizes: string[];
};

/** Premium storefront copy — overrides CJ supplier titles and placeholder text. */
export const PRODUCT_COPY_BY_SLUG: Record<string, ProductCopy> = {
  'loose-casual-black-multi-pocket-trousers-17638570': {
    name: 'Black Multi-Pocket Cargo Trouser',
    description:
      'Relaxed wide-leg cargo in solid black with utility pocketing and a clean city-line drape.',
    story:
      'Foundation layer for the AW26 capsule — utility without noise. Pair with structured outerwear or a bare tee; the leg does the work.',
    fitNote:
      'Cut with a high rise and generous leg. Size down if you prefer a closer waist; take your usual size for the intended oversized androgynous proportion.',
    specs: [
      { label: 'Colour', value: 'Black' },
      { label: 'Composition', value: 'Cotton blend twill' },
      { label: 'Rise', value: 'High rise' },
      { label: 'Leg', value: 'Wide straight with cargo volume' },
      { label: 'Closure', value: 'Zip fly, button waist' },
      { label: 'Pockets', value: 'Multi-pocket utility layout' },
      { label: 'Care', value: 'Cold machine wash · Line dry · Cool iron' },
    ],
    sizeChart: [
      { size: 'S', waist: '68–72 cm', hip: '94–98 cm', length: '102 cm' },
      { size: 'M', waist: '72–76 cm', hip: '98–102 cm', length: '104 cm' },
      { size: 'L', waist: '76–80 cm', hip: '102–106 cm', length: '106 cm' },
      { size: 'XL', waist: '80–84 cm', hip: '106–110 cm', length: '108 cm' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  'cargo-trousers-with-three-disional-pockets-solid-col-16866555': {
    name: 'Solid Utility Cargo Trouser',
    description:
      'Structured cargo trouser in a matte solid finish — dimensional pockets, no print, no noise.',
    story:
      'Pocketing as architecture, not decoration. Built for city transit — phone, keys, hands free — without breaking the column line.',
    fitNote:
      'Straight relaxed leg with room through the thigh. Designed to sit at the natural waist with a column silhouette.',
    specs: [
      { label: 'Colour', value: 'Solid black / charcoal (variant dependent)' },
      { label: 'Composition', value: 'Cotton-poly utility weave' },
      { label: 'Rise', value: 'Mid–high rise' },
      { label: 'Leg', value: 'Relaxed straight' },
      { label: 'Pockets', value: 'Three-dimensional cargo pockets' },
      { label: 'Care', value: 'Cold wash · Do not bleach · Line dry' },
    ],
    sizeChart: [
      { size: 'S', waist: '66–70 cm', hip: '92–96 cm', length: '100 cm' },
      { size: 'M', waist: '70–74 cm', hip: '96–100 cm', length: '102 cm' },
      { size: 'L', waist: '74–78 cm', hip: '100–104 cm', length: '104 cm' },
      { size: 'XL', waist: '78–82 cm', hip: '104–108 cm', length: '106 cm' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  'neploe-new-arrival-high-waist-black-pants-solid-colo-13858804': {
    name: 'High-Rise Black Trouser',
    description:
      'Minimal black trouser with a defined high waist and clean leg — foundation piece for suiting or solo wear.',
    story:
      'The quiet base of an androgynous wardrobe. High waist, clean leg, zero print — reads tailored even off-duty.',
    fitNote:
      'Slim-straight through the leg with structure at the waist. For an androgynous drape, size up one.',
    specs: [
      { label: 'Colour', value: 'Black' },
      { label: 'Composition', value: 'Polyester-viscose suiting blend' },
      { label: 'Rise', value: 'High rise' },
      { label: 'Leg', value: 'Slim straight' },
      { label: 'Closure', value: 'Concealed zip · Hook bar' },
      { label: 'Care', value: 'Dry clean recommended · Cool iron' },
    ],
    sizeChart: [
      { size: 'S', waist: '64–68 cm', hip: '90–94 cm', length: '98 cm' },
      { size: 'M', waist: '68–72 cm', hip: '94–98 cm', length: '100 cm' },
      { size: 'L', waist: '72–76 cm', hip: '98–102 cm', length: '102 cm' },
      { size: 'XL', waist: '76–80 cm', hip: '102–106 cm', length: '104 cm' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  'faux-lambswool-oversized-jacket-coat-winter-black-wa-d1134fb0': {
    name: 'Oversized Black Coat',
    description:
      'Long-line outer layer in deep black with a soft hand-feel and dropped shoulder — city weight without bulk.',
    fitNote:
      'Intentionally oversized. Take your usual size for a generous coat; size down for a closer layer over tailoring.',
    specs: [
      { label: 'Colour', value: 'Black' },
      { label: 'Composition', value: 'Polyester fleece with faux shearling hand-feel' },
      { label: 'Length', value: 'Long line · Below hip' },
      { label: 'Shoulder', value: 'Dropped, unstructured' },
      { label: 'Closure', value: 'Front zip or open placket (style variant)' },
      { label: 'Lining', value: 'Fully lined' },
      { label: 'Care', value: 'Dry clean only' },
    ],
    sizeChart: [
      { size: 'S', waist: '—', hip: '—', length: '88 cm (back)' },
      { size: 'M', waist: '—', hip: '—', length: '90 cm (back)' },
      { size: 'L', waist: '—', hip: '—', length: '92 cm (back)' },
      { size: 'XL', waist: '—', hip: '—', length: '94 cm (back)' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  'black-double-breasted-chain-blazer-6754': {
    name: 'Black Double-Breasted Chain Blazer',
    description:
      'Oversize double-breasted blazer in matte black with a clean lapel and metal chain accent — structured shoulder, city pace.',
    story:
      'Tier 1 hero — domestic small-batch when the waitlist clears. Chain detail is optional attitude; the shoulder line is the point.',
    fitNote:
      'Sized for an androgynous drape; order by shoulder first. Chain detail is optional styling — wear open over a bare tee or layered knit.',
    specs: [
      { label: 'Colour', value: 'Black' },
      { label: 'Silhouette', value: 'Double-breasted blazer' },
      { label: 'Accent', value: 'Metal chain' },
      { label: 'Fabric', value: 'Polyester suiting (supplier spec)' },
      { label: 'Care', value: 'Dry clean recommended' },
    ],
    sizeChart: [
      { size: 'S', waist: '—', hip: '—', length: '68 cm (back)' },
      { size: 'M', waist: '—', hip: '—', length: '70 cm (back)' },
      { size: 'L', waist: '—', hip: '—', length: '72 cm (back)' },
      { size: 'XL', waist: '—', hip: '—', length: '74 cm (back)' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  'office-ladies-black-formal-blazer-work-suit-14533346': {
    name: 'Black Formal Blazer',
    description:
      'Single-breasted black blazer with a sharp lapel and relaxed office-to-street shoulder.',
    fitNote:
      'Tailored block with room through the body. Size to shoulder width first; body ease is part of the structured androgynous proportion.',
    specs: [
      { label: 'Colour', value: 'Black' },
      { label: 'Composition', value: 'Polyester-viscose suiting' },
      { label: 'Shoulder', value: 'Soft structured' },
      { label: 'Lapel', value: 'Notched · Single breasted' },
      { label: 'Lining', value: 'Fully lined' },
      { label: 'Care', value: 'Dry clean only' },
    ],
    sizeChart: [
      { size: 'S', waist: '—', hip: '—', length: '68 cm (back)' },
      { size: 'M', waist: '—', hip: '—', length: '70 cm (back)' },
      { size: 'L', waist: '—', hip: '—', length: '72 cm (back)' },
      { size: 'XL', waist: '—', hip: '—', length: '74 cm (back)' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  'solid-long-style-black-jacket-and-blazer-female-notc-70fa7cf4': {
    name: 'Long-Line Black Blazer',
    description:
      'Extended black blazer with an asymmetrical line and notched collar — editorial length, everyday wear.',
    fitNote:
      'Longer hem than a classic blazer. Best worn open or single-button closed for a vertical silhouette.',
    specs: [
      { label: 'Colour', value: 'Black' },
      { label: 'Composition', value: 'Suiting blend' },
      { label: 'Length', value: 'Long line · Hip covering' },
      { label: 'Collar', value: 'Notched lapel' },
      { label: 'Closure', value: 'Single button' },
      { label: 'Care', value: 'Dry clean recommended' },
    ],
    sizeChart: [
      { size: 'S', waist: '—', hip: '—', length: '72 cm (back)' },
      { size: 'M', waist: '—', hip: '—', length: '74 cm (back)' },
      { size: 'L', waist: '—', hip: '—', length: '76 cm (back)' },
      { size: 'XL', waist: '—', hip: '—', length: '78 cm (back)' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  'black-suit-jacket-sense-of-design-niche-autumn-loose-14300765': {
    name: 'Relaxed Black Suit Jacket',
    description:
      'Loose black suit jacket with a calm shoulder and minimal detailing — structure without stiffness.',
    fitNote:
      'Relaxed fit through the chest and waist. Designed for layering over a tee or fine knit.',
    specs: [
      { label: 'Colour', value: 'Black' },
      { label: 'Composition', value: 'Polyester-viscose suiting' },
      { label: 'Fit', value: 'Relaxed · Unstructured' },
      { label: 'Lapel', value: 'Notched' },
      { label: 'Lining', value: 'Lined' },
      { label: 'Care', value: 'Dry clean only' },
    ],
    sizeChart: [
      { size: 'S', waist: '—', hip: '—', length: '66 cm (back)' },
      { size: 'M', waist: '—', hip: '—', length: '68 cm (back)' },
      { size: 'L', waist: '—', hip: '—', length: '70 cm (back)' },
      { size: 'XL', waist: '—', hip: '—', length: '72 cm (back)' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  'straight-suit-pants-spring-and-summer-korean-style-h-13854743': {
    name: 'Black Suit Trouser',
    description:
      'Pressed black suit trouser with a high waist and clean cigarette line — sharp enough for work, calm enough for off-duty.',
    story:
      'Cropped-nine proportion for AW26 — sharp at the ankle, relaxed at the hip. Works with oversized blazers or a white tee.',
    fitNote:
      'Cropped-nine length on most heights. High rise sits at the natural waist; check inseam against size chart.',
    specs: [
      { label: 'Colour', value: 'Black' },
      { label: 'Composition', value: 'Suiting blend' },
      { label: 'Rise', value: 'High rise' },
      { label: 'Leg', value: 'Straight · Cropped length' },
      { label: 'Closure', value: 'Zip fly · Hook bar' },
      { label: 'Care', value: 'Dry clean recommended' },
    ],
    sizeChart: [
      { size: 'S', waist: '64–68 cm', hip: '90–94 cm', length: '92 cm' },
      { size: 'M', waist: '68–72 cm', hip: '94–98 cm', length: '94 cm' },
      { size: 'L', waist: '72–76 cm', hip: '98–102 cm', length: '96 cm' },
      { size: 'XL', waist: '76–80 cm', hip: '102–106 cm', length: '98 cm' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  'summer-new-slim-legs-long-chiffon-wide-leg-pants-kor-b70c95dd': {
    name: 'Wide-Leg Black Trouser',
    description:
      'Fluid wide-leg trouser in black with a soft drape — movement-first tailoring for warm city days.',
    story:
      'Heat-season counterpart to structured suiting — full leg, soft hand, black only. For days when the city moves faster than the dress code.',
    fitNote:
      'Lightweight hand with a full leg. Elastic or relaxed waist depending on batch; refer to flat measurements below.',
    specs: [
      { label: 'Colour', value: 'Black' },
      { label: 'Composition', value: 'Lightweight woven poly blend' },
      { label: 'Rise', value: 'High rise' },
      { label: 'Leg', value: 'Wide leg · Full length' },
      { label: 'Hand-feel', value: 'Soft drape' },
      { label: 'Care', value: 'Cold gentle wash · Line dry · Low iron' },
    ],
    sizeChart: [
      { size: 'S', waist: '66–70 cm', hip: '96–100 cm', length: '100 cm' },
      { size: 'M', waist: '70–74 cm', hip: '100–104 cm', length: '102 cm' },
      { size: 'L', waist: '74–78 cm', hip: '104–108 cm', length: '104 cm' },
      { size: 'XL', waist: '78–82 cm', hip: '108–112 cm', length: '106 cm' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
};

const SUPPLIER_PLACEHOLDER =
  /\b(cj sourced|initial cj import|details pending|pilot\.|visual selection)\b/i;

export function isSupplierPlaceholderCopy(text: string): boolean {
  return SUPPLIER_PLACEHOLDER.test(text);
}

export function getProductCopy(slug: string): ProductCopy | undefined {
  return PRODUCT_COPY_BY_SLUG[slug];
}
