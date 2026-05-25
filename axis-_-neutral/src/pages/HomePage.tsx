import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import Hero from '../components/Hero';
import ProductCarousel from '../components/ProductCarousel';
import SeoHead from '../components/SeoHead';
import SectionLabel from '../components/SectionLabel';
import heroBanner from '@/src/assets/images/hero_banner_1779611218812.png';
import blazer from '@/src/assets/images/oversized_blazer_1779611239597.png';
import trench from '@/src/assets/images/trench_coat_1779611276152.png';
import trousers from '@/src/assets/images/wide_leg_trousers_1779611256512.png';

export default function HomePage() {
  const reduced = useReducedMotion();

  return (
    <main>
      <SeoHead
        title="Home"
        description="AXIS / NEUTRAL - cinematic tailoring for the modern city. Melbourne studio, Australia-wide shipping."
      />
      <Hero />

      <section className="bg-[#0f0f0f] border-y border-brand-slate/20">
        <div className="container-site section-y-sm text-center">
          <motion.p
            initial={{ opacity: 0.2, y: reduced ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="hero-main-title text-brand-white tracking-[0.06em]"
          >
            BEYOND LABELS.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="hero-main-subtitle text-brand-slate mt-4"
          >
            Genderless tailoring for the modern soul.
          </motion.p>
        </div>
      </section>

      <section id="editorial" className="section-y container-site">
        <div className="mb-12 md:mb-16">
          <SectionLabel className="mb-4">Lookbook</SectionLabel>
          <h2 className="type-h2 text-brand-white">
            The second act, <span className="italic text-brand-slate">from mood to product.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          <motion.article
            className="md:col-span-7 lg:col-span-6 md:row-span-2 aspect-[4/5] overflow-hidden bg-[#111]"
            initial={{ opacity: 0, y: reduced ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.85, ease: [0.2, 1, 0.3, 1] }}
          >
            <img
              src={heroBanner}
              alt="Model in cinematic city lookbook frame"
              loading="lazy"
              className="w-full h-full object-cover scale-[1.04] md:hover:scale-[1.08] transition-transform duration-[2200ms]"
            />
          </motion.article>

          <motion.article
            className="md:col-span-5 lg:col-span-3 aspect-[3/4] overflow-hidden bg-[#111]"
            initial={{ opacity: 0, y: reduced ? 0 : 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ delay: 0.12, duration: 0.85 }}
          >
            <img
              src={blazer}
              alt="Fabric and shoulder line close-up"
              loading="lazy"
              className="w-full h-full object-cover object-[center_18%] md:hover:scale-[1.06] transition-transform duration-[1800ms]"
            />
          </motion.article>

          <motion.article
            className="md:col-span-5 lg:col-span-3 aspect-[3/4] overflow-hidden bg-[#111]"
            initial={{ opacity: 0, y: reduced ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ delay: 0.18, duration: 0.85 }}
          >
            <img
              src={trench}
              alt="Walking back silhouette shot"
              loading="lazy"
              className="w-full h-full object-cover object-[center_20%] md:hover:scale-[1.06] transition-transform duration-[1800ms]"
            />
          </motion.article>

          <motion.article
            className="md:col-span-12 lg:col-span-3 aspect-[16/10] overflow-hidden bg-[#111]"
            initial={{ opacity: 0, y: reduced ? 0 : 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ delay: 0.22, duration: 0.85 }}
          >
            <img
              src={trousers}
              alt="Wide leg drape detail"
              loading="lazy"
              className="w-full h-full object-cover object-[center_32%] md:hover:scale-[1.04] transition-transform duration-[1800ms]"
            />
          </motion.article>
        </div>
      </section>

      <ProductCarousel />

      <section className="section-y container-site border-t border-brand-slate/20">
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
              src={heroBanner}
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
