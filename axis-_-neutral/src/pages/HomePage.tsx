import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Hero from '../components/Hero';
import HomeShopBands from '../components/HomeShopBands';
import ProductCarousel from '../components/ProductCarousel';
import SeoHead from '../components/SeoHead';
import EditorialLookbook from '../components/EditorialLookbook';

const MARQUEE_TEXT = 'NO GENDER.   •   NO BOUNDARIES.   •   JUST ATTITUDE.';

function InfiniteMarquee() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [direction, setDirection] = useState(-1);
  const [x, setX] = useState(0);
  const [active, setActive] = useState(false);
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
    const node = sectionRef.current;
    if (!node || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '80px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

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
    if (reduced || !active) return;

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
  }, [direction, active, reduced]);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 border-y border-brand-slate/20 overflow-hidden"
      aria-label="Brand statement"
    >
      <div className="relative w-full marquee-fade">
        {reduced ? (
          <p className="marquee-outline text-center px-6 !whitespace-normal !text-[clamp(2rem,8vw,4rem)]">
            {MARQUEE_TEXT}
          </p>
        ) : (
          <div className="flex will-change-transform" style={{ transform: `translate3d(${x}px,0,0)` }}>
            <span ref={chunkRef} className="marquee-outline px-8 md:px-12">
              {MARQUEE_TEXT}
            </span>
            <span className="marquee-outline px-8 md:px-12">{MARQUEE_TEXT}</span>
            <span className="marquee-outline px-8 md:px-12">{MARQUEE_TEXT}</span>
          </div>
        )}
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
    </main>
  );
}
