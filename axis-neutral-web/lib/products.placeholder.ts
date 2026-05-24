import type { Product } from "./products.types";

/**
 * MVP placeholder catalog. Default empty — enable mock rows locally for carousel preview.
 *
 * Future: replace getPlaceholderProducts() with getProducts() reading Supabase.
 */
export const PLACEHOLDER_PRODUCTS: Product[] = [];

// Uncomment for local carousel preview:
// export const PLACEHOLDER_PRODUCTS: Product[] = [
//   {
//     id: "1",
//     slug: "linen-overshirt",
//     title: "Linen Overshirt",
//     priceAud: 189,
//     imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
//     collection: "Essentials",
//   },
//   {
//     id: "2",
//     slug: "wool-trouser",
//     title: "Wool Trouser",
//     priceAud: 220,
//     imageUrl: "https://images.unsplash.com/photo-1624378515194-6bbdb73f2194?w=800&q=80",
//     collection: "Essentials",
//   },
//   {
//     id: "3",
//     slug: "merino-tee",
//     title: "Merino Tee",
//     priceAud: null,
//     imageUrl: null,
//     collection: "Base",
//   },
// ];

export function getPlaceholderProducts(): Product[] {
  return PLACEHOLDER_PRODUCTS;
}
