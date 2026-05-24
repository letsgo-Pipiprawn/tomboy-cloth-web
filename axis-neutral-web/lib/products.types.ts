/**
 * Product shape aligned with a future Supabase `products` table:
 * id, slug, title, price_aud, image_url, collection
 */
export type Product = {
  id: string;
  slug: string;
  title: string;
  /** null = price TBC */
  priceAud: number | null;
  /** null = placeholder image */
  imageUrl: string | null;
  collection?: string;
};
