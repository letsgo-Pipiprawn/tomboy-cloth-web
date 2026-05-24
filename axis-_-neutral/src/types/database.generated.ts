export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      collections: {
        Row: {
          created_at: string
          description: string | null
          hero_image_url: string | null
          id: string
          is_active: boolean
          season: string
          slug: string
          sort_order: number
          tagline: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          hero_image_url?: string | null
          id?: string
          is_active?: boolean
          season: string
          slug: string
          sort_order?: number
          tagline?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          hero_image_url?: string | null
          id?: string
          is_active?: boolean
          season?: string
          slug?: string
          sort_order?: number
          tagline?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      fulfillment_jobs: {
        Row: {
          attempts: number
          created_at: string
          id: string
          last_error: string | null
          max_attempts: number
          order_id: string
          payload: Json
          status: Database["public"]["Enums"]["fulfillment_status"]
          updated_at: string
        }
        Insert: {
          attempts?: number
          created_at?: string
          id?: string
          last_error?: string | null
          max_attempts?: number
          order_id: string
          payload?: Json
          status?: Database["public"]["Enums"]["fulfillment_status"]
          updated_at?: string
        }
        Update: {
          attempts?: number
          created_at?: string
          id?: string
          last_error?: string | null
          max_attempts?: number
          order_id?: string
          payload?: Json
          status?: Database["public"]["Enums"]["fulfillment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fulfillment_jobs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          cj_product_id: string | null
          cj_variant_id: string | null
          created_at: string
          id: string
          name: string
          order_id: string
          product_id: string | null
          quantity: number
          size: string
          slug: string
          unit_price_aud: number
        }
        Insert: {
          cj_product_id?: string | null
          cj_variant_id?: string | null
          created_at?: string
          id?: string
          name: string
          order_id: string
          product_id?: string | null
          quantity?: number
          size: string
          slug: string
          unit_price_aud: number
        }
        Update: {
          cj_product_id?: string | null
          cj_variant_id?: string | null
          created_at?: string
          id?: string
          name?: string
          order_id?: string
          product_id?: string | null
          quantity?: number
          size?: string
          slug?: string
          unit_price_aud?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          cj_error: string | null
          cj_order_id: string | null
          created_at: string
          currency: string
          customer_email: string | null
          id: string
          metadata: Json
          order_number: string
          shipping_address: Json | null
          shipping_aud: number
          status: Database["public"]["Enums"]["order_status"]
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          subtotal_aud: number
          total_aud: number
          updated_at: string
        }
        Insert: {
          cj_error?: string | null
          cj_order_id?: string | null
          created_at?: string
          currency?: string
          customer_email?: string | null
          id?: string
          metadata?: Json
          order_number: string
          shipping_address?: Json | null
          shipping_aud?: number
          status?: Database["public"]["Enums"]["order_status"]
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          subtotal_aud?: number
          total_aud?: number
          updated_at?: string
        }
        Update: {
          cj_error?: string | null
          cj_order_id?: string | null
          created_at?: string
          currency?: string
          customer_email?: string | null
          id?: string
          metadata?: Json
          order_number?: string
          shipping_address?: Json | null
          shipping_aud?: number
          status?: Database["public"]["Enums"]["order_status"]
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          subtotal_aud?: number
          total_aud?: number
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          cj_product_id: string | null
          cj_sku: string | null
          cj_variant_id: string | null
          collection_slug: string
          created_at: string
          description: string
          details: Json
          featured: boolean
          from_country_code: string | null
          id: string
          image_url: string | null
          images: Json
          is_active: boolean
          logistic_name: string | null
          name: string
          price_aud: number
          sizes: Json
          slug: string
          story: string
          updated_at: string
        }
        Insert: {
          category: string
          cj_product_id?: string | null
          cj_sku?: string | null
          cj_variant_id?: string | null
          collection_slug: string
          created_at?: string
          description?: string
          details?: Json
          featured?: boolean
          from_country_code?: string | null
          id?: string
          image_url?: string | null
          images?: Json
          is_active?: boolean
          logistic_name?: string | null
          name: string
          price_aud: number
          sizes?: Json
          slug: string
          story?: string
          updated_at?: string
        }
        Update: {
          category?: string
          cj_product_id?: string | null
          cj_sku?: string | null
          cj_variant_id?: string | null
          collection_slug?: string
          created_at?: string
          description?: string
          details?: Json
          featured?: boolean
          from_country_code?: string | null
          id?: string
          image_url?: string | null
          images?: Json
          is_active?: boolean
          logistic_name?: string | null
          name?: string
          price_aud?: number
          sizes?: Json
          slug?: string
          story?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_collection_slug_fkey"
            columns: ["collection_slug"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["slug"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      fulfillment_status: "pending" | "processing" | "completed" | "failed"
      order_status:
        | "pending"
        | "paid"
        | "cj_submitted"
        | "cj_failed"
        | "shipped"
        | "cancelled"
        | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      fulfillment_status: ["pending", "processing", "completed", "failed"],
      order_status: [
        "pending",
        "paid",
        "cj_submitted",
        "cj_failed",
        "shipped",
        "cancelled",
        "refunded",
      ],
    },
  },
} as const
