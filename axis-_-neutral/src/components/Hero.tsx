import { Link } from 'react-router-dom';
import { HERO_MASK_BACKGROUND } from '../config/hero';
import SectionLabel from './SectionLabel';

export default function Hero() {
  return (
    <section className="hero-rack-focus relative min-h-[100svh] w-full overflow-hidden bg-brand-black">
      <div className="hero-rack-focus-bg absolute inset-0 z-[1] overflow-hidden" aria-hidden>
        <img
          src={HERO_MASK_BACKGROUND}
          alt="Model walking in the rain at night"
          className="hero-rack-focus-bg__img h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="absolute inset-0 z-[2] bg-black/40" aria-hidden />

      <div className="absolute inset-0 z-[3] flex items-end pointer-events-none">
        <div className="container-site w-full pb-10 sm:pb-14 md:pb-20 pointer-events-auto">
          <div className="max-w-2xl w-full min-w-0">
            <SectionLabel className="hero-rack-focus-item hero-rack-focus-item--label mb-5 text-brand-light-slate/80">
              Autumn / Winter 26
            </SectionLabel>
            <h1 className="hero-rack-focus-item hero-rack-focus-item--title hero-main-title mb-5 text-brand-white uppercase">
              OWN THE STREET
            </h1>
            <p className="hero-rack-focus-item hero-rack-focus-item--subtitle hero-main-subtitle mb-8 max-w-xl text-brand-light-slate">
              Genderless tailoring for the modern soul.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                to="/collections/aw26"
                className="hero-rack-focus-item hero-rack-focus-item--cta-primary type-btn bg-brand-bone px-7 sm:px-9 py-3.5 sm:py-4 text-brand-ink transition-colors duration-300 hover:bg-brand-white"
              >
                Explore Collection
              </Link>
              <Link
                to="/products/oversized-charcoal-blazer"
                className="hero-rack-focus-item hero-rack-focus-item--cta-secondary type-link border-b border-brand-white/35 pb-1 text-brand-white transition-colors duration-300 hover:border-brand-light-slate hover:text-brand-light-slate"
              >
                View Signature Piece
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
