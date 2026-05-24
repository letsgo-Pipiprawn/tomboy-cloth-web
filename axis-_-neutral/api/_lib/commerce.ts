import { products as localProducts } from '../../src/data/products';
import { AU_COMMERCE } from '../../src/data/site';
import type { Database } from '../../src/types/database.generated';
import { getSupabaseAdmin, isSupabaseAdminConfigured } from './supabaseAdmin';

export type CheckoutItemInput = {
  slug: string;
  size: string;
  quantity: number;
};

export type ValidatedLineItem = {
  slug: string;
  name: string;
  size: string;
  quantity: number;
  unitPriceAud: number;
  productId: string | null;
  cjProductId: string | null;
  cjVariantId: string | null;
};

type ProductRow = Database['public']['Tables']['products']['Row'];

function parseSizes(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === 'string');
}

async function fetchProductBySlug(slug: string): Promise<ProductRow | null> {
  if (isSupabaseAdminConfigured()) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();
    if (!error && data) return data;
  }

  const local = localProducts.find((p) => p.slug === slug);
  if (!local) return null;

  return {
    id: local.id,
    slug: local.slug,
    name: local.name,
    price_aud: local.priceAud,
    category: local.category,
    collection_slug: local.collectionSlug,
    image_url: null,
    images: local.images,
    description: local.description,
    story: local.story,
    details: local.details,
    sizes: local.sizes,
    featured: local.featured ?? false,
    cj_product_id: null,
    cj_variant_id: null,
    cj_sku: null,
    logistic_name: null,
    from_country_code: 'CN',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export async function validateCheckoutItems(
  items: CheckoutItemInput[],
): Promise<{ lineItems: ValidatedLineItem[]; subtotalAud: number }> {
  if (!items.length) throw new CheckoutError('Cart is empty', 400);

  const lineItems: ValidatedLineItem[] = [];

  for (const item of items) {
    if (!item.slug || !item.size) {
      throw new CheckoutError('Each item must include slug and size', 400);
    }
    const quantity = Number(item.quantity);
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 10) {
      throw new CheckoutError('Invalid quantity', 400);
    }

    const product = await fetchProductBySlug(item.slug);
    if (!product) {
      throw new CheckoutError(`Product not found: ${item.slug}`, 404);
    }

    const sizes = parseSizes(product.sizes);
    if (sizes.length && !sizes.includes(item.size)) {
      throw new CheckoutError(`Size ${item.size} is not available for ${product.name}`, 400);
    }

    lineItems.push({
      slug: product.slug,
      name: product.name,
      size: item.size,
      quantity,
      unitPriceAud: Number(product.price_aud),
      productId: product.id,
      cjProductId: product.cj_product_id,
      cjVariantId: product.cj_variant_id,
    });
  }

  const subtotalAud = lineItems.reduce((sum, li) => sum + li.unitPriceAud * li.quantity, 0);
  return { lineItems, subtotalAud };
}

export function computeShippingAud(subtotalAud: number): number {
  return subtotalAud >= AU_COMMERCE.freeShippingThresholdAud ? 0 : AU_COMMERCE.standardShippingAud;
}

export function audToCents(amount: number): number {
  return Math.round(amount * 100);
}

export function generateOrderNumber(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AXN-${stamp}-${rand}`;
}

export class CheckoutError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = 'CheckoutError';
    this.status = status;
  }
}
