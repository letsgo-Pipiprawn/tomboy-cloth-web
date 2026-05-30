import { getSupabase, isSupabaseConfigured } from './supabase';
import { requiresBrandImagePack } from '../data/storefrontCapsule';
import { galleryImagesForSlug, heroImageForSlug, localProductImageSetForSlug } from './productAssets';
import { LOCAL_CATALOG_PRODUCTS } from '../data/localCatalog';
import { getProductBySlug as getLocalProductBySlug, type Product } from '../data/products';
import type { Database } from '../types/database';
import { filterCuratedCatalog } from '../data/catalogCuration';
import { DEFAULT_FULFILLMENT, type FulfillmentMeta, type FulfillmentType, type SupplySource } from '../data/fulfillment';
import { presentCatalog, presentProduct } from './presentProduct';

type ProductRow = Database['public']['Tables']['products']['Row'];

function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === 'string');
}

function parseFulfillmentType(value: unknown): FulfillmentType {
  if (value === 'preorder' || value === 'wishlist' || value === 'in_stock') return value;
  return DEFAULT_FULFILLMENT.fulfillmentType;
}

function parseSupplySource(value: unknown): SupplySource {
  if (value === 'domestic_1688' || value === 'odm' || value === 'cj') return value;
  return DEFAULT_FULFILLMENT.supplySource;
}

function fulfillmentFromRow(row: ProductRow): FulfillmentMeta {
  const extended = row as ProductRow & {
    fulfillment_type?: string;
    supply_source?: string;
    compare_at_price_aud?: number | null;
    preorder_discount_percent?: number;
    ships_in_weeks?: number;
    wishlist_goal?: number;
    wishlist_opens_at?: string | null;
    supplier_ref?: string | null;
  };

  return {
    fulfillmentType: parseFulfillmentType(extended.fulfillment_type),
    supplySource: parseSupplySource(extended.supply_source),
    compareAtPriceAud:
      extended.compare_at_price_aud != null ? Number(extended.compare_at_price_aud) : undefined,
    preorderDiscountPercent:
      extended.preorder_discount_percent ?? DEFAULT_FULFILLMENT.preorderDiscountPercent,
    shipsInWeeks: extended.ships_in_weeks ?? DEFAULT_FULFILLMENT.shipsInWeeks,
    wishlistGoal: extended.wishlist_goal ?? DEFAULT_FULFILLMENT.wishlistGoal,
    wishlistOpensAt: extended.wishlist_opens_at ?? null,
    supplierRef: extended.supplier_ref ?? null,
  };
}

function warnMissingBrandPack(slug: string) {
  if (!import.meta.env.DEV || !requiresBrandImagePack(slug)) return;
  if (localProductImageSetForSlug(slug).length > 0) return;
  console.warn(
    `[catalog] ${slug} is a capsule SKU but has no local 01–07 brand pack. ` +
      'PDP will hide supplier photos. Run npm run brand-stylize-cj and commit src/assets/images/products/{slug}/',
  );
}

function rowToProduct(row: ProductRow): Product {
  const slug = row.slug;
  warnMissingBrandPack(slug);
  const supplierImages = parseStringArray(row.images).filter(Boolean);
  const fallbackUrl = row.image_url ?? supplierImages[0] ?? null;
  const hero = heroImageForSlug(slug, fallbackUrl) ?? '';

  return {
    id: row.id,
    slug,
    name: row.name,
    priceAud: Number(row.price_aud),
    category: row.category,
    collectionSlug: row.collection_slug,
    image: hero,
    images: galleryImagesForSlug(
      slug,
      hero || null,
      supplierImages.length > 0 ? supplierImages : fallbackUrl ? [fallbackUrl] : [],
    ),
    description: row.description,
    story: row.story,
    details: parseStringArray(row.details),
    sizes: parseStringArray(row.sizes),
    featured: row.featured,
    ...fulfillmentFromRow(row),
  };
}

export async function fetchCatalog(): Promise<{
  products: Product[];
  source: 'supabase' | 'local';
}> {
  const supabase = getSupabase();
  if (!supabase) {
    return { products: presentCatalog(filterCuratedCatalog(LOCAL_CATALOG_PRODUCTS)), source: 'local' };
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('featured', { ascending: false })
    .order('name', { ascending: true });

  if (error || !data?.length) {
    console.warn('[catalog] Supabase fetch failed, using local data:', error?.message);
    return { products: presentCatalog(filterCuratedCatalog(LOCAL_CATALOG_PRODUCTS)), source: 'local' };
  }

  return { products: presentCatalog(filterCuratedCatalog(data.map(rowToProduct))), source: 'supabase' };
}

export async function fetchProductBySlug(slug: string): Promise<{
  product: Product | undefined;
  source: 'supabase' | 'local';
}> {
  const supabase = getSupabase();
  if (!supabase) {
    return { product: getLocalProductBySlug(slug), source: 'local' };
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error || !data) {
    return { product: getLocalProductBySlug(slug), source: 'local' };
  }

  const product = rowToProduct(data);
  const [curated] = filterCuratedCatalog([product]);
  return { product: curated ? presentProduct(curated) : undefined, source: 'supabase' };
}

export function fetchCatalogSyncFallback(): Product[] {
  return presentCatalog(filterCuratedCatalog(LOCAL_CATALOG_PRODUCTS));
}

export { isSupabaseConfigured };
