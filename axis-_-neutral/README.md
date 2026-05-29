# AXIS / NEUTRAL — Storefront

Custom React storefront for **AXIS / NEUTRAL** — androgynous city tailoring, Melbourne studio, Australia-wide shipping.

**Live:** [tomboy-cloth-web.vercel.app](https://tomboy-cloth-web.vercel.app)

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19 · Vite · Tailwind 4 · React Router |
| Backend | Vercel serverless (`api/*`) · Express dev API |
| Database | Supabase (Postgres) |
| Payments | Stripe Checkout (AUD) |
| Fulfillment | CJ Dropshipping (Tier 2 in-stock) + domestic 1688 (Tier 1 wishlist/preorder) |

---

## Catalog model (hybrid)

| Tier | Source | Status | Role |
|------|--------|--------|------|
| 1 Hero | 1688 / factory | `wishlist` → `preorder` | Brand differentiation |
| 2 Essentials | CJ | `in_stock` | Ship now, ad landing |
| 3 Tests | Social / 1688 | `wishlist` only | Demand validation |

Strategy docs: `docs/hybrid_catalog_strategy.md` · `docs/preorder_rules.md`

**Curated capsule (code):** `src/data/catalogCuration.ts` — 1 Tier1 wishlist blazer + 1 Tier3 wishlist trench test + 5 CJ trousers.

---

## Local development

**Prerequisites:** Node.js 20+

```bash
cd axis-_-neutral
npm install
cp .env.example .env.local   # fill Supabase + Stripe keys
npm run dev:full             # Vite :3000 + API :3002
```

Or two terminals: `npm run dev` and `npm run dev:api`.

Open [http://localhost:3000](http://localhost:3000)

---

## Environment variables

See `.env.example`. Minimum for local checkout:

- `VITE_SUPABASE_URL` · `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY` · `STRIPE_WEBHOOK_SECRET`
- `VITE_SITE_URL`

Optional:

- `VITE_GA4_MEASUREMENT_ID` · `VITE_META_PIXEL_ID` — analytics (disabled if blank)
- `RESEND_API_KEY` · `EMAIL_FROM` — preorder open emails
- `CJ_API_KEY` — fulfillment dispatch
- `INTERNAL_JOB_TOKEN` — cron endpoints

---

## Database

Project ref: `opjgvabhdserpotkoguu`

```bash
npm run db:link
npm run db:push
npm run db:types
```

Migrations live in `supabase/migrations/`.

---

## Key API routes

| Route | Purpose |
|-------|---------|
| `POST /api/checkout/create-session` | Stripe Checkout |
| `POST /api/webhooks/stripe` | Order persistence |
| `POST /api/wishlist/signup` | Waitlist signup + auto preorder at threshold |
| `GET /api/wishlist/signup?slug=` | Waitlist progress |
| `POST /api/newsletter/signup` | Footer email list |
| `POST /api/forms/submit` | Contact form (`type: contact`) or restock alert (`type: restock`) |
| `POST /api/orders/track` | Order lookup (email + order #) |
| `POST /api/fulfillment/cj-dispatch` | CJ job queue (cron, auth required) |
| `POST /api/email/process-outbox` | Send queued emails (cron, auth required) |

---

## Preorder automation

When wishlist signups reach `wishlist_goal` (default **40**):

1. Product `fulfillment_type` flips `wishlist` → `preorder` automatically
2. Signups are queued in `email_outbox`
3. If `RESEND_API_KEY` + `EMAIL_FROM` are set, emails send immediately; otherwise run cron:

```bash
curl -X POST https://YOUR_DOMAIN/api/email/process-outbox \
  -H "Authorization: Bearer $INTERNAL_JOB_TOKEN"
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite frontend only |
| `npm run dev:api` | Local API server |
| `npm run dev:full` | Both |
| `npm run build` | Production build |
| `npm run lint` | TypeScript check |
| `npm run db:push` | Apply Supabase migrations |

---

## Docs index

- `docs/BRAND_GUIDELINES.md` — voice, visual, anti-patterns
- `docs/hybrid_catalog_strategy.md` — tier structure
- `docs/preorder_rules.md` — preorder copy + CS templates
- `docs/ops_checklist.md` — daily/weekly ops + launch pending items
- `docs/sourcing_weekly_routine.md` — weekly sourcing SOP
- `docs/STRIPE_SETUP.md` · `docs/SUPABASE_SETUP.md`

---

## Deploy

Push to `main` → Vercel auto-deploys from GitHub.

After env changes on Vercel, **Redeploy** so `VITE_*` vars are baked into the client bundle.
