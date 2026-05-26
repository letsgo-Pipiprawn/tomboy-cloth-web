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

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          id: string;
          slug: string;
          title: string;
          season: string;
          tagline: string | null;
          description: string | null;
          hero_image_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['collections']['Row']> & {
          slug: string;
          title: string;
          season: string;
        };
        Update: Partial<Database['public']['Tables']['collections']['Row']>;
      };
      products: {
        Row: {
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
          fulfillment_type: 'in_stock' | 'preorder' | 'wishlist';
          supply_source: 'cj' | 'domestic_1688' | 'odm';
          compare_at_price_aud: number | null;
          preorder_discount_percent: number;
          ships_in_weeks: number;
          wishlist_goal: number;
          wishlist_opens_at: string | null;
          supplier_ref: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['products']['Row']> & {
          slug: string;
          name: string;
          price_aud: number;
          category: string;
          collection_slug: string;
        };
        Update: Partial<Database['public']['Tables']['products']['Row']>;
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          status: OrderStatus;
          customer_email: string | null;
          shipping_address: Json | null;
          subtotal_aud: number;
          shipping_aud: number;
          total_aud: number;
          currency: string;
          stripe_checkout_session_id: string | null;
          stripe_payment_intent_id: string | null;
          cj_order_id: string | null;
          cj_error: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['orders']['Row']> & {
          order_number: string;
        };
        Update: Partial<Database['public']['Tables']['orders']['Row']>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          slug: string;
          name: string;
          size: string;
          quantity: number;
          unit_price_aud: number;
          cj_product_id: string | null;
          cj_variant_id: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['order_items']['Row']> & {
          order_id: string;
          slug: string;
          name: string;
          size: string;
          unit_price_aud: number;
        };
        Update: Partial<Database['public']['Tables']['order_items']['Row']>;
      };
      fulfillment_jobs: {
        Row: {
          id: string;
          order_id: string;
          status: FulfillmentStatus;
          attempts: number;
          max_attempts: number;
          last_error: string | null;
          payload: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['fulfillment_jobs']['Row']> & {
          order_id: string;
        };
        Update: Partial<Database['public']['Tables']['fulfillment_jobs']['Row']>;
      };
    };
  };
}
