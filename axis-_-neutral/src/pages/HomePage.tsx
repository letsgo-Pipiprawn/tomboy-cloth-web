import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCarousel from '../components/ProductCarousel';
import SeoHead from '../components/SeoHead';
import SectionLabel from '../components/SectionLabel';
import editorialImage from '@/src/assets/images/hero_banner_1779611218812.png';

export default function HomePage() {
  return (
    <main>
      <SeoHead
        title="Home"
        description="AXIS / NEUTRAL — cinematic tailoring for the modern city. Melbourne studio, Australia-wide shipping."
      />
      <Hero />
      <ProductCarousel />
      <section id="editorial" className="section-y container-site border-t border-brand-slate/20">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <SectionLabel className="mb-5">Editorial</SectionLabel>
            <h2 className="type-h2 text-brand-white mb-8">
              City Lines, <span className="italic text-brand-slate">Neutral Forms</span>
            </h2>
            <p className="type-body-lg text-brand-light-slate max-w-md mb-10">
              A visual study of proportion and pause. Shot across Melbourne&apos;s inner north — concrete,
              glass, and the quiet confidence of oversized tailoring.
            </p>
            <Link
              to="/collections/aw26"
              className="type-link text-brand-slate border-b border-brand-slate pb-1 hover:text-brand-light-slate hover:border-brand-light-slate transition-colors"
            >
              View Collection
            </Link>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-[#111]">
            <img
              src={editorialImage}
              alt="AW26 editorial — oversized tailoring in Melbourne"
              loading="lazy"
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
