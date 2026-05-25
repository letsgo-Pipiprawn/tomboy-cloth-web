import type { ValidatedLineItem } from './commerce.js';

export type CheckoutMetadataLineItem = {
  slug: string;
  name: string;
  size: string;
  quantity: number;
  unitPriceAud: number;
  productId: string | null;
  cjProductId: string | null;
  cjVariantId: string | null;
};

type CompactItem = {
  s: string;
  n: string;
  z: string;
  q: number;
  p: number;
  i?: string;
  cj?: string;
  cv?: string;
};

function toLineItem(compact: CompactItem): CheckoutMetadataLineItem {
  return {
    slug: compact.s,
    name: compact.n,
    size: compact.z,
    quantity: compact.q,
    unitPriceAud: compact.p,
    productId: compact.i ?? null,
    cjProductId: compact.cj ?? null,
    cjVariantId: compact.cv ?? null,
  };
}

/** Stripe metadata values are capped at 500 chars — store one compact item per key. */
export function encodeCheckoutItemsMetadata(
  items: ValidatedLineItem[],
): Record<string, string> {
  const metadata: Record<string, string> = {
    items_count: String(items.length),
    items_format: 'compact_v1',
  };

  items.forEach((item, index) => {
    const compact: CompactItem = {
      s: item.slug,
      n: item.name,
      z: item.size,
      q: item.quantity,
      p: item.unitPriceAud,
    };
    if (item.productId) compact.i = item.productId;
    if (item.cjProductId) compact.cj = item.cjProductId;
    if (item.cjVariantId) compact.cv = item.cjVariantId;
    metadata[`item_${index}`] = JSON.stringify(compact);
  });

  return metadata;
}

export function decodeCheckoutItemsMetadata(
  metadata: Record<string, string> | null | undefined,
): CheckoutMetadataLineItem[] {
  if (!metadata) return [];

  if (metadata.items_format === 'compact_v1') {
    const count = Number(metadata.items_count ?? 0);
    const items: CheckoutMetadataLineItem[] = [];
    for (let index = 0; index < count; index += 1) {
      const raw = metadata[`item_${index}`];
      if (!raw) continue;
      try {
        items.push(toLineItem(JSON.parse(raw) as CompactItem));
      } catch {
        // skip malformed chunk
      }
    }
    if (items.length) return items;
  }

  const legacy = metadata.items_json;
  if (!legacy) return [];
  try {
    const parsed = JSON.parse(legacy) as CheckoutMetadataLineItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
