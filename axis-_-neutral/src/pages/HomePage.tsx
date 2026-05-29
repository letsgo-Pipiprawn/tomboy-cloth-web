import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import Hero from '../components/Hero';
import HomeShopBands from '../components/HomeShopBands';
import ProductCarousel from '../components/ProductCarousel';
import SeoHead from '../components/SeoHead';
import SectionLabel from '../components/SectionLabel';
import heroBanner from '@/src/assets/images/hero_banner_1779611218812.png';
import blazer from '@/src/assets/images/oversized_blazer_1779611239597.png';
import trench from '@/src/assets/images/trench_coat_1779611276152.png';
import trousers from '@/src/assets/images/wide_leg_trousers_1779611256512.png';
import EditorialLookbook from '../components/EditorialLookbook';

const MARQUEE_TEXT = 'NO GENDER.   •   NO BOUNDARIES.   •   JUST ATTITUDE.';

function InfiniteMarquee() {
  const [direction, setDirection] = useState(-1);
  const [x, setX] = useState(0);
  const chunkRef = useRef<HTMLSpanElement | null>(null);
  const lastScrollY = useRef(0);
  const widthRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      widthRef.current = chunkRef.current?.offsetWidth ?? 0;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const nextY = window.scrollY;
      if (nextY > lastScrollY.current) {
        setDirection(-1);
      } else if (nextY < lastScrollY.current) {
        setDirection(1);
      }
      lastScrollY.current = nextY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let raf = 0;
    const speed = 1.1;

    const animate = () => {
      const width = widthRef.current;
      setX((prev) => {
        if (!width) return prev;
        const next = prev + speed * direction;
        if (next <= -width) return next + width;
        if (next >= 0) return next - width;
        return next;
      });
      raf = window.requestAnimationFrame(animate);
    };

    raf = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(raf);
  }, [direction]);

  return (
    <section className="py-20 md:py-[150px] border-y border-brand-slate/20 overflow-hidden">
      <div className="relative w-full marquee-fade">
        <div className="flex will-change-transform" style={{ transform: `translate3d(${x}px,0,0)` }}>
          <span ref={chunkRef} className="marquee-outline px-8 md:px-12">
            {MARQUEE_TEXT}
          </span>
          <span className="marquee-outline px-8 md:px-12">{MARQUEE_TEXT}</span>
          <span className="marquee-outline px-8 md:px-12">{MARQUEE_TEXT}</span>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const reduced = useReducedMotion();

  return (
    <main>
      <SeoHead
        title="Home"
        description="AXIS / NEUTRAL — androgynous city tailoring for the modern woman. Melbourne studio, Australia-wide shipping."
      />
      <Hero />

      <HomeShopBands />

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
            Structure first. Labels optional.
          </motion.p>
        </div>
      </section>

      <EditorialLookbook />

      <InfiniteMarquee />

      <ProductCarousel />

      <section className="container-site py-20 md:py-[150px] border-t border-brand-slate/20">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-1 lg:sticky lg:top-[25vh] self-start">
            <SectionLabel className="mb-6">Featured Cut</SectionLabel>
            <h2 className="hero-main-title text-brand-white leading-[0.9] mb-8">
              THE PERFECT
              <br />
              CUT.
            </h2>
            <p className="type-body-lg text-brand-light-slate max-w-sm mb-10">
              Clean shoulder line. Relaxed drape. Structure without stiffness. Made to move from
              office light to night concrete.
            </p>
            <Link
              to="/collections/aw26"
              className="type-link text-brand-slate border-b border-brand-slate pb-1 hover:text-brand-light-slate hover:border-brand-light-slate transition-colors"
            >
              View Look
            </Link>
          </div>

          <div className="lg:col-span-2 space-y-10 md:space-y-14">
            <figure className="aspect-[4/5] overflow-hidden bg-[#111]">
              <img
                src={blazer}
                alt="Oversized blazer front detail"
                loading="lazy"
                data-cursor-label="DISCOVER"
                className="product-image w-full h-full object-cover"
              />
            </figure>
            <figure className="aspect-[4/5] overflow-hidden bg-[#111]">
              <img
                src={trench}
                alt="Back drape and seam details"
                loading="lazy"
                data-cursor-label="DISCOVER"
                className="product-image w-full h-full object-cover"
              />
            </figure>
            <figure className="aspect-[4/5] overflow-hidden bg-[#111]">
              <img
                src={trousers}
                alt="Wide leg movement study"
                loading="lazy"
                data-cursor-label="DISCOVER"
                className="product-image w-full h-full object-cover"
              />
            </figure>
            <figure className="aspect-[4/5] overflow-hidden bg-[#111]">
            <img
              src={heroBanner}
              alt="AXIS / NEUTRAL AW26 editorial in Melbourne"
              loading="lazy"
                data-cursor-label="DISCOVER"
                className="product-image w-full h-full object-cover"
            />
            </figure>
          </div>
        </div>
      </section>
    </main>
  );
}
