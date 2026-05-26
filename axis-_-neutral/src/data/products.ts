import type { Product } from './productTypes';
import { LOCAL_CATALOG_PRODUCTS } from './localCatalog';

export type { ProductSpec, SizeChartRow } from './productCopy';
export type { Product, FulfillmentMeta, FulfillmentType, SupplySource } from './productTypes';

export { LOCAL_CATALOG_PRODUCTS as products };

export function getProductBySlug(slug: string): Product | undefined {
  return LOCAL_CATALOG_PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(aud: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
  }).format(aud);
}

export function getFeaturedProduct(): Product {
  return LOCAL_CATALOG_PRODUCTS.find((p) => p.featured) ?? LOCAL_CATALOG_PRODUCTS[0];
}
