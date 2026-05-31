# AXIS / NEUTRAL brand marks

The live site uses a **text wordmark** in the navbar (`AXIS / NEUTRAL`), not a committed logo image until now.

## Files

| File | Use |
|------|-----|
| `axis-neutral-wordmark-light.svg` | Dark backgrounds (Stripe checkout `#0a0a0a`, hero overlays) |
| `axis-neutral-wordmark-dark.svg` | Light backgrounds (email headers, print) |

After deploy, public URLs:

- `https://axisneutral.com.au/brand/axis-neutral-wordmark-light.svg`
- `https://axisneutral.com.au/brand/axis-neutral-wordmark-dark.svg`

## Stripe Checkout

1. [Dashboard → Branding → Checkout (Test)](https://dashboard.stripe.com/test/settings/branding/checkout)
2. Upload **`axis-neutral-wordmark-light.svg`** (or export PNG 512px wide)
3. Background `#0a0a0a`, button `#f1ece4`, font Inter, shape rectangular

Or set in API (`createCheckoutSession.ts`):

```ts
logo: {
  type: 'url',
  url: 'https://axisneutral.com.au/brand/axis-neutral-wordmark-light.svg',
},
```

## Brand docs (no logo asset)

- `docs/BRAND_GUIDELINES.md` — colours, tone, typography (mentions Bebas Neue / serif; site uses Oswald + Cormorant + Inter)
- `public/HERO-ASSETS.md` — hero video / lookbook campaign film
- `src/assets/images/models/README.md` — homepage Lookbook editorial assets
- Navbar source: `src/components/Navbar.tsx` — live wordmark reference

For a polished logo system (monogram, favicon, packaging), use the logo-design skill or a designer brief from `docs/BRAND_GUIDELINES.md`.
