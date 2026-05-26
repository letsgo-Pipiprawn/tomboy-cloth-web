/** Minimal DB types for serverless (no imports from src/). */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'cj_submitted'
  | 'cj_failed'
  | 'shipped'
  | 'cancelled'
  | 'refunded';

export type FulfillmentStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  price_aud: number;
  category: string;
  collection_slug: string;
  image_url: string | null;
  images: Json;
  description: string;
  story: string;
  details: Json;
  sizes: Json;
  featured: boolean;
  cj_product_id: string | null;
  cj_variant_id: string | null;
  cj_sku: string | null;
  logistic_name: string | null;
  from_country_code: string | null;
  is_active: boolean;
  fulfillment_type?: 'in_stock' | 'preorder' | 'wishlist';
  supply_source?: 'cj' | 'domestic_1688' | 'odm';
  compare_at_price_aud?: number | null;
  preorder_discount_percent?: number;
  ships_in_weeks?: number;
  wishlist_goal?: number;
  wishlist_opens_at?: string | null;
  supplier_ref?: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderInsert = {
  order_number: string;
  status?: OrderStatus;
  customer_email?: string | null;
  shipping_address?: Json | null;
  subtotal_aud?: number;
  shipping_aud?: number;
  total_aud?: number;
  currency?: string;
  stripe_checkout_session_id?: string | null;
  stripe_payment_intent_id?: string | null;
  metadata?: Json;
};

export type OrderItemInsert = {
  order_id: string;
  product_id?: string | null;
  slug: string;
  name: string;
  size: string;
  quantity: number;
  unit_price_aud: number;
  cj_product_id?: string | null;
  cj_variant_id?: string | null;
};

export type FulfillmentJobInsert = {
  order_id: string;
  status?: FulfillmentStatus;
  payload?: Json;
};
