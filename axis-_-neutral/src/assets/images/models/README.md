# Model & homepage editorial assets

Canonical AI model references and **homepage Lookbook** imagery for AXIS / NEUTRAL.  
Wired in code via `src/config/editorialImages.ts` and `src/components/EditorialLookbook.tsx`.

> **SKU product packs** (7 files per slug) live under `src/assets/images/products/{slug}/` — see `docs/product_image_set_workflow.md`.  
> Do **not** use CJ/1688 supplier lifestyle shots on the homepage grid.

---

## Canonical models (Persona reference)

| ID | File | Persona | Default share |
|----|------|---------|---------------|
| **Model A** | `model-a-city-tomboy.png` | City Alpha | 25% |
| **Model B** | `model-b-style-switcher.png` | Androgynous Switcher | **50% (primary)** |
| **Model C** | `model-c-minimal-tailoring.png` | Structured Minimal | 25% |

Prompts: `docs/ai_model_prompts.md`

---

## Homepage Lookbook grid (AW26)

| Config key | File | Tile | Notes |
|------------|------|------|-------|
| `EDITORIAL_CAMPAIGN_VIDEO` | `public/video/aw26-campaign-portrait.mp4` | Large left (4:5) | Click-to-play; poster `aw26-campaign-portrait-poster.jpg` |
| `EDITORIAL_LOOKBOOK_HERO` | `long_line_blazer_wide_trouser_lookbook.png` | Top-right (3:4) | Model B — city walk, blazer + wide trouser |
| `EDITORIAL_BLAZER_CHAIN` | `editorial-lookbook-detail-blazer-chain.png` | Detail (3:4) | Blazer lapel + chest chain / carabiner macro |
| `EDITORIAL_BLAZER_FLATLAY` | `editorial-lookbook-flatlay-tailoring.png` | Wide (16:10) | Tailoring flat lay on concrete |
| `EDITORIAL_CAMPAIGN_STILL` | `editorial-campaign-banner-model-c.png` | Banner below CTA | Model C full-body, Melbourne laneway — use `object-contain`, not 21:9 crop |

### Regenerating editorial tiles

1. Use Model A/B/C reference PNG from this folder + prompts in `docs/ai_model_prompts.md`.
2. Match aspect: **3:4** (portrait tiles), **16:10** (flat lay), **3:2** (campaign banner — compose with head–toe safe area).
3. Save here, update `editorialImages.ts`, redeploy (Vite bundles imports).

Campaign video: H.264, portrait, muted loop optional; see `public/HERO-ASSETS.md`.
