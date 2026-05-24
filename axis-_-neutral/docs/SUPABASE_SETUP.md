# Supabase setup — AXIS / NEUTRAL

## 0. Supabase CLI (local)

**Project ref:** `opjgvabhdserpotkoguu`  
**Wrong project (do not use):** `xporcrzmhguplimvrijm` (Shopify loyalty)

```bash
cd axis-_-neutral
npx supabase login
npm run db:link             # links opjgvabhdserpotkoguu
npm run db:push
npm run db:seed
npm run db:types
```

See `supabase/README.md`.

> Vercel `VITE_SUPABASE_URL` must be `https://opjgvabhdserpotkoguu.supabase.co`

## 1. Vercel (done)

You connected **tomboy-cloth-web** → Supabase. Ensure these exist:

| Variable | Used by |
|----------|---------|
| `VITE_SUPABASE_URL` | Browser |
| `VITE_SUPABASE_ANON_KEY` | Browser |
| `SUPABASE_URL` | Future API / webhooks |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only — never `VITE_` |

Redeploy after adding `VITE_*` keys.

## 2. Run migration (one time)

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**
2. Paste and run **`supabase/migrations/20260524120000_commerce_schema.sql`**
3. Paste and run **`supabase/seed.sql`**

Or with CLI (optional):

```bash
supabase link --project-ref YOUR_REF
supabase db push
```

## 3. Verify

**Table Editor** should show:

- `collections`
- `products` (4 rows after seed)
- `orders` (empty)
- `order_items` (empty)
- `fulfillment_jobs` (empty)

**Authentication → Policies**: `products` and `collections` allow public `SELECT` when `is_active = true`.

## 4. Link CJ products

In **Table Editor → products**, fill per SKU:

| Column | CJ source |
|--------|-----------|
| `cj_product_id` | CJ product id |
| `cj_variant_id` | CJ variant vid |
| `cj_sku` | Optional |
| `logistic_name` | From CJ freight API |
| `from_country_code` | `CN`, `US`, etc. |

Stripe + CJ webhooks will read these when we add `api/` routes.

## 5. Local dev

```bash
cd axis-_-neutral
vercel env pull .env.local
npm run dev
```

Without env vars the site falls back to bundled `src/data/products.ts`.

## 6. Next build steps

- [ ] `POST /api/checkout/create-session` (Stripe)
- [ ] `POST /api/webhooks/stripe` → insert `orders` → CJ `createOrderV2`
- [ ] Admin retry for `fulfillment_jobs` when CJ fails
