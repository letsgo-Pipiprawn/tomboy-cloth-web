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
};

const SUPPLIER_PLACEHOLDER =
  /\b(cj sourced|initial cj import|details pending|pilot\.|visual selection)\b/i;

export function isSupplierPlaceholderCopy(text: string): boolean {
  return SUPPLIER_PLACEHOLDER.test(text);
}

export function getProductCopy(slug: string): ProductCopy | undefined {
  return PRODUCT_COPY_BY_SLUG[slug];
}
