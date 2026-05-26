import heroMelbourne from '@/src/assets/images/hero-melbourne-aw26.png';
import blazer from '@/src/assets/images/oversized_blazer_1779611239597.png';
import trench from '@/src/assets/images/trench_coat_1779611276152.png';
import trousers from '@/src/assets/images/wide_leg_trousers_1779611256512.png';

/** Drop `public/hero.mp4` (muted loop, 1080p+) for Gucci-style video hero. */
export const HERO_VIDEO_SRC = '/hero.mp4';
/** Optional cutout assets for parallax masking hero. */
export const HERO_MASK_BACKGROUND = heroMelbourne;
export const HERO_MASK_FOREGROUND = '/hero-model.png';

/** Editorial stills — slow crossfade when no video is present. */
export const HERO_SLIDES = [
  { src: heroMelbourne, alt: 'Model in long-line black blazer and wide-leg trousers, Melbourne laneway' },
  { src: blazer, alt: 'Oversized charcoal blazer' },
  { src: trench, alt: 'Slate trench coat' },
  { src: trousers, alt: 'Wide leg trousers' },
] as const;

/** Seconds per slide in stills mode */
export const HERO_SLIDE_INTERVAL_MS = 7000;
