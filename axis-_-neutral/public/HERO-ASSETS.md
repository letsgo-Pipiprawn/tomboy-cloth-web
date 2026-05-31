# Hero & campaign media

## Hero loop (Gucci-style)

Place a cinematic loop here:

- `hero.mp4` — muted, loop, 6–15s, 1920×1080 or taller, H.264
- Optional: `hero-poster.jpg` — first-frame poster (falls back to bundled campaign still)

The site auto-detects `hero.mp4`. Without it, the hero uses a slow crossfade between editorial stills.

## Optional parallax masking layers (recommended)

To enable the luxury-style layered hero:

- `hero-model.png` — foreground cutout model (transparent PNG)
- Keep street/environment in the background image (`hero_banner...`)

Layer order in code:
1) Background street
2) Large brand wordmark
3) Foreground cutout model

This creates the "text behind subject" visual effect used in premium fashion sites.

**Free stock references (fashion / city / fabric motion):**

- [Pexels — fashion](https://www.pexels.com/search/videos/fashion%20runway/)
- [Coverr — lifestyle](https://coverr.co/)

Compress with HandBrake or FFmpeg before upload to keep Vercel fast.

---

## Homepage Lookbook campaign film

Lookbook **large left tile** (click-to-play, no autoplay):

| File | Purpose |
|------|---------|
| `video/aw26-campaign-portrait.mp4` | Portrait campaign clip (H.264) |
| `video/aw26-campaign-portrait-poster.jpg` | Poster frame before play |

Config: `src/config/editorialImages.ts` → `EDITORIAL_CAMPAIGN_VIDEO` / `_POSTER`  
Component: `src/components/EditorialCampaignVideo.tsx`

Still images for the rest of the Lookbook grid (model tiles, detail, flat lay, bottom banner) live in  
`src/assets/images/models/` — inventory and aspect ratios: **`src/assets/images/models/README.md`**.

Do not drop CJ/1688 supplier lifestyle photos into the homepage grid; use editorial assets or the per-SKU 7-pack (`docs/product_image_set_workflow.md`).
