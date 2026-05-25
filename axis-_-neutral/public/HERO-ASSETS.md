# Hero video (Gucci-style)

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
