import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCarousel from '../components/ProductCarousel';
import TrustBar from '../components/TrustBar';
import SeoHead from '../components/SeoHead';
import editorialImage from '@/src/assets/images/hero_banner_1779611218812.png';

export default function HomePage() {
  return (
    <main>
      <SeoHead
        title="Home"
        description="AXIS / NEUTRAL — cinematic tailoring for the modern city. Melbourne studio, Australia-wide shipping."
      />
      <Hero />
      <TrustBar />
      <ProductCarousel />
      <section
        id="editorial"
        className="py-24 px-8 md:px-16 max-w-screen-2xl mx-auto border-t border-brand-slate/20"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-brand-slate uppercase tracking-[0.3em] text-xs font-medium mb-4 block">
              Editorial
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-brand-white mb-6 leading-tight">
              City Lines, <span className="italic text-brand-slate">Neutral Forms</span>
            </h2>
            <p className="text-brand-light-slate text-sm leading-relaxed max-w-md mb-8">
              A visual study of proportion and pause. Shot across Melbourne&apos;s inner north — concrete,
              glass, and the quiet confidence of oversized tailoring.
            </p>
            <Link
              to="/collections/aw26"
              className="inline-block text-xs uppercase tracking-widest font-medium border-b border-brand-slate pb-1 hover:text-brand-light-slate hover:border-brand-light-slate transition-colors"
            >
              View Collection
            </Link>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-[#111]">
            <img
              src={editorialImage}
              alt="AW26 editorial"
              loading="lazy"
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
