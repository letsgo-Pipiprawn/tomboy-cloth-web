# Stripe Checkout — AXIS / NEUTRAL

## Vercel environment variables

| Variable | Where |
|----------|--------|
| `STRIPE_SECRET_KEY` | Server (`api/*`) |
| `STRIPE_WEBHOOK_SECRET` | `api/webhooks/stripe` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Frontend embedded checkout (`pk_test_...` / `pk_live_...`) |
| `SUPABASE_URL` | Server |
| `SUPABASE_SERVICE_ROLE_KEY` | Server — never `VITE_` |
| `VITE_SITE_URL` | Production return URLs — **must include `https://`** (e.g. `https://axisneutral.com.au`) |

Preview deployments use the current `*.vercel.app` host automatically for Stripe `return_url` when `VITE_SITE_URL` is unset or for Preview-specific logic in `api/lib/env.ts`.

Redeploy after adding keys (`VITE_*` vars require a new build).

## Stripe Dashboard

1. **Developers → API keys** — copy Secret key → `STRIPE_SECRET_KEY`
2. **Developers → Webhooks → Add endpoint**
   - URL: `https://YOUR_DOMAIN/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `checkout.session.async_payment_succeeded`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`

Local webhook forwarding:

```bash
stripe listen --forward-to localhost:3002/api/webhooks/stripe
```

Use the `whsec_` from `stripe listen` as `STRIPE_WEBHOOK_SECRET` in `.env.local`.

## Local dev

```bash
cd axis-_-neutral
vercel env pull .env.local   # or copy .env.example
npm install
npm run dev:full             # Vite :3000 + API :3002
```

Or two terminals: `npm run dev:api` and `npm run dev`.

## Flow

1. Cart → `POST /api/checkout/create-session` (prices validated from Supabase)
2. Redirect to Stripe Checkout (AUD, AU shipping address)
3. Webhook → `orders` + `order_items` + `fulfillment_jobs` (CJ queue, Phase 3)
