import { Link } from 'react-router-dom';
import { HERO_MASK_BACKGROUND } from '../config/hero';
import { TIER1_WISHLIST_SLUG } from '../data/featured';
import SectionLabel from './SectionLabel';

export default function Hero() {
  return (
    <section className="hero-rack-focus relative min-h-[100svh] w-full overflow-hidden bg-brand-black">
      <div className="hero-rack-focus-bg absolute inset-0 z-[1] overflow-hidden" aria-hidden>
        <img
          src={HERO_MASK_BACKGROUND}
          alt="Model in long-line black blazer and wide-leg trousers, Melbourne laneway"
          className="hero-rack-focus-bg__img h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="absolute inset-0 z-[2] bg-black/40" aria-hidden />

      <div className="absolute inset-0 z-[3] flex items-end justify-end pointer-events-none">
        <div className="pointer-events-auto max-w-2xl min-w-0 text-left mr-[clamp(1.25rem,6vw,8rem)] mb-[clamp(2rem,6vh,7rem)]">
          <SectionLabel className="hero-rack-focus-item hero-rack-focus-item--label mb-5 text-brand-light-slate/80">
            Autumn / Winter 26
          </SectionLabel>
          <h1 className="hero-rack-focus-item hero-rack-focus-item--title hero-main-title mb-5 text-brand-white uppercase">
            OWN THE STREET
          </h1>
          <p className="hero-rack-focus-item hero-rack-focus-item--subtitle hero-main-subtitle mb-8 max-w-xl text-brand-light-slate">
            Androgynous tailoring. Alpha energy. Neutral palette.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              to="/collections/aw26"
              className="hero-rack-focus-item hero-rack-focus-item--cta-primary type-btn bg-brand-bone px-7 sm:px-9 py-3.5 sm:py-4 text-brand-ink transition-colors duration-300 hover:bg-brand-white"
            >
              Explore Collection
            </Link>
            <Link
              to={`/products/${TIER1_WISHLIST_SLUG}`}
              className="hero-rack-focus-item hero-rack-focus-item--cta-secondary type-link border-b border-brand-white/35 pb-1 text-brand-white transition-colors duration-300 hover:border-brand-light-slate hover:text-brand-light-slate"
            >
              Shop signature blazer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
