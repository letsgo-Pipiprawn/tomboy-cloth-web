import heroMelbourne from '@/src/assets/images/hero-melbourne-aw26.png';
import {
  EDITORIAL_BLAZER_CHAIN,
  EDITORIAL_BLAZER_COVER,
  EDITORIAL_BLAZER_FLATLAY,
  EDITORIAL_BLAZER_LAPEL,
} from './editorialImages';

/** Drop `public/hero.mp4` (muted loop, 1080p+) for Gucci-style video hero. */
export const HERO_VIDEO_SRC = '/hero.mp4';
/** Optional cutout assets for parallax masking hero. */
export const HERO_MASK_BACKGROUND = heroMelbourne;
export const HERO_MASK_FOREGROUND = '/hero-model.png';

/** Editorial stills — slow crossfade when no video is present. */
export const HERO_SLIDES = [
  { src: heroMelbourne, alt: 'Model in long-line black blazer and wide-leg trousers, Melbourne laneway' },
  { src: EDITORIAL_BLAZER_COVER, alt: 'Black double-breasted chain blazer, campaign cover' },
  { src: EDITORIAL_BLAZER_CHAIN, alt: 'Chest chain and carabiner detail' },
  { src: EDITORIAL_BLAZER_LAPEL, alt: 'Double-breasted front and lapel detail' },
  { src: EDITORIAL_BLAZER_FLATLAY, alt: 'Blazer flat lay on white' },
] as const;

/** Seconds per slide in stills mode */
export const HERO_SLIDE_INTERVAL_MS = 7000;
