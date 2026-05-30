/**
 * Active storefront SKUs — keep in sync with catalogCuration.ts
 * Extracted to avoid circular imports with productAssets.ts
 */
export const STOREFRONT_CAPSULE_SLUGS = new Set<string>([
  'black-loose-zip-hoodie-cardigan-2773343',
]);

export function requiresBrandImagePack(slug: string): boolean {
  return STOREFRONT_CAPSULE_SLUGS.has(slug);
}
