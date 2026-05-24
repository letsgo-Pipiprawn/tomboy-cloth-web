# AXIS / NEUTRAL — Landing MVP

Cinematic ecommerce landing page (Next.js App Router). MVP scope: `/` only — glassmorphic navbar, full-screen hero video, horizontal collections carousel with empty-state placeholder data.

## Stack

- Next.js 14+ (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- Fonts: Cormorant Garamond (headings) + Inter (body) via `next/font`

## Getting started

```bash
cd axis-neutral-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables (optional)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_NAME` | Brand label in nav/metadata (`AXIS` or `NEUTRAL`) |

## Assets

Place cinematic hero files in `public/`:

- `hero-poster.jpg` — LCP poster (required for hero)
- `hero.mp4` — muted loop background (optional; poster shows until video loads)

To use a CDN instead, edit `components/HeroSection.tsx` and set `HERO_VIDEO_SRC` to your Supabase Storage or R2 URL.

## Product data (MVP)

- Types: `lib/products.types.ts`
- Placeholder catalog: `lib/products.placeholder.ts` (default empty array → “Collections coming soon”)
- Uncomment mock rows in `products.placeholder.ts` to preview the carousel locally

Phase 2 will add `lib/products.ts` for Supabase — not included in this MVP.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Deploy on Vercel

1. Push this folder to GitHub (or import from the monorepo with **Root Directory** = `axis-neutral-web`).
2. [vercel.com/new](https://vercel.com/new) → Import repository.
3. Framework preset: **Next.js** (auto-detected).
4. Add `NEXT_PUBLIC_SITE_NAME` if you want to override the brand string.
5. Deploy. No Stripe, Supabase, or Railway env vars required for MVP.

## Deferred (Phase 2)

- PDP `app/shop/[slug]/page.tsx`
- Cart drawer
- Stripe Checkout + API routes
- Supabase product fetch
- Railway backend

See `../site.md` for full product spec.
