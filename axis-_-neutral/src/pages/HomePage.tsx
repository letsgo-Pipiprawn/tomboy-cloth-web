import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCarousel from '../components/ProductCarousel';
import SeoHead from '../components/SeoHead';
import SectionLabel from '../components/SectionLabel';

const editorialImage = '/images/collection-aw26.png';

export default function HomePage() {
  return (
    <main>
      <SeoHead
        title="Home"
        description="AXIS / NEUTRAL - cinematic tailoring for the modern city. Melbourne studio, Australia-wide shipping."
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
              A study in restraint and proportion. Tailoring shot against concrete, glass, and the
              quieter edges of Melbourne&apos;s inner north.
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
              alt="AXIS / NEUTRAL AW26 editorial in Melbourne"
              loading="lazy"
              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-1000"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
