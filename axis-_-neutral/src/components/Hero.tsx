import { Link } from 'react-router-dom';
import { HERO_MASK_BACKGROUND } from '../config/hero';
import SectionLabel from './SectionLabel';

export default function Hero() {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-brand-black">
      <img
        src={HERO_MASK_BACKGROUND}
        alt="Model walking in the rain at night"
        className="absolute inset-0 z-[1] h-full w-full object-cover"
      />

      <div className="absolute inset-0 z-[2] bg-black/40" aria-hidden />

      <div className="absolute inset-0 z-[3] flex items-end pointer-events-none">
        <div className="container-site w-full pb-14 md:pb-20 pointer-events-auto">
          <div className="max-w-2xl">
            <SectionLabel className="mb-5 text-brand-light-slate/80">Autumn / Winter 26</SectionLabel>
            <h1 className="hero-main-title mb-5 text-brand-white uppercase">OWN THE STREET</h1>
            <p className="hero-main-subtitle mb-8 max-w-xl text-brand-light-slate">
              Genderless tailoring for the modern soul.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/collections/aw26"
                className="type-btn bg-brand-bone px-9 py-4 text-brand-ink transition-colors duration-300 hover:bg-brand-white"
              >
                Explore Collection
              </Link>
              <Link
                to="/products/oversized-charcoal-blazer"
                className="type-link border-b border-brand-white/35 pb-1 text-brand-white transition-colors duration-300 hover:border-brand-light-slate hover:text-brand-light-slate"
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
