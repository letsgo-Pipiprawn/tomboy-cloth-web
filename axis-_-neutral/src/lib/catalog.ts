import { getSupabase, isSupabaseConfigured } from './supabase';
import { imageForSlug } from './productAssets';
import {
  products as localProducts,
  getProductBySlug as getLocalProductBySlug,
  type Product,
} from '../data/products';
import type { Database } from '../types/database';

type ProductRow = Database['public']['Tables']['products']['Row'];

function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === 'string');
}

function rowToProduct(row: ProductRow): Product {
  const slug = row.slug;
  const bundled = imageForSlug(slug, row.image_url);
  const extraImages = parseStringArray(row.images).map((url) => url || bundled);

  return {
    id: row.id,
    slug,
    name: row.name,
    priceAud: Number(row.price_aud),
    category: row.category,
    collectionSlug: row.collection_slug,
    image: bundled,
    images: extraImages.length > 0 ? extraImages : [bundled],
    description: row.description,
    story: row.story,
    details: parseStringArray(row.details),
    sizes: parseStringArray(row.sizes),
    featured: row.featured,
  };
}

export async function fetchCatalog(): Promise<{
  products: Product[];
  source: 'supabase' | 'local';
}> {
  const supabase = getSupabase();
  if (!supabase) {
    return { products: localProducts, source: 'local' };
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('featured', { ascending: false })
    .order('name', { ascending: true });

  if (error || !data?.length) {
    console.warn('[catalog] Supabase fetch failed, using local data:', error?.message);
    return { products: localProducts, source: 'local' };
  }

  return { products: data.map(rowToProduct), source: 'supabase' };
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

  return { product: rowToProduct(data), source: 'supabase' };
}

export function fetchCatalogSyncFallback(): Product[] {
  return localProducts;
}

export { isSupabaseConfigured };
