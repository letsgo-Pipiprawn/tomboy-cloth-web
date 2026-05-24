import { Link } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'motion/react';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  HERO_SLIDES,
  HERO_SLIDE_INTERVAL_MS,
  HERO_VIDEO_SRC,
} from '../config/hero';
import heroPoster from '@/src/assets/images/hero_banner_1779611218812.png';
import SectionLabel from './SectionLabel';

function HeroRevealLine({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={reduced ? { opacity: 0 } : { y: '115%' }}
        animate={reduced ? { opacity: 1 } : { y: 0 }}
        transition={{ duration: 1.15, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function HeroStillsSlideshow() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || HERO_SLIDES.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="sync" initial={false}>
        {HERO_SLIDES.map((slide, i) =>
          i === index ? (
            <motion.div
              key={slide.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.8, ease: [0.42, 0, 0.18, 1] }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className={`w-full h-full object-cover opacity-90 ${
                  i % 2 === 0 ? 'hero-ken-burns' : 'hero-ken-burns-alt'
                }`}
              />
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  const [videoMode, setVideoMode] = useState<'checking' | 'ready' | 'fallback'>('checking');
  const [videoVisible, setVideoVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '18%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, reduced ? 1 : 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], ['0px', reduced ? '0px' : '48px']);

  const onVideoReady = useCallback(() => {
    setVideoMode('ready');
    setVideoVisible(true);
  }, []);

  const onVideoError = useCallback(() => {
    setVideoMode('fallback');
    setVideoVisible(false);
  }, []);

  useEffect(() => {
    if (reduced) {
      setVideoMode('fallback');
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        await video.play();
        onVideoReady();
      } catch {
        if (video.readyState >= 2) onVideoReady();
        else onVideoError();
      }
    };

    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('error', onVideoError);

    if (video.readyState >= 2) void tryPlay();

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('error', onVideoError);
    };
  }, [reduced, onVideoReady, onVideoError]);

  const showVideo = videoMode === 'ready' && videoVisible;
  const showStills = videoMode === 'fallback';

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[calc(100dvh-var(--site-header-height,5.5rem))] overflow-hidden bg-brand-black"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: mediaY, scale: mediaScale }}
      >
        <img
          src={heroPoster}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1.8s] ${
            showVideo || showStills ? 'opacity-0' : 'opacity-90 hero-ken-burns'
          }`}
        />

        {!reduced && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1.8s] ${
              showVideo ? 'opacity-95 hero-ken-burns' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroPoster}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        )}

        {showStills && <HeroStillsSlideshow />}

        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/18 to-brand-black/28" />
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-brand-black/80 to-transparent" />
        <div className="hero-vignette absolute inset-0" aria-hidden />
        {!reduced && (
          <div
            className="hero-film-grain hero-film-grain-animated absolute inset-0"
            aria-hidden
          />
        )}
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-end container-site pb-20 md:pb-32 pointer-events-none"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-3xl pointer-events-auto">
          <HeroRevealLine delay={0.55}>
            <SectionLabel className="text-brand-light-slate/70 mb-6">Autumn / Winter 26</SectionLabel>
          </HeroRevealLine>

          <h1 className="type-display text-brand-white mb-8">
            <HeroRevealLine delay={0.7}>
              <span className="block">The Shape</span>
            </HeroRevealLine>
            <HeroRevealLine delay={0.88}>
              <span className="block italic text-brand-slate">of Form</span>
            </HeroRevealLine>
          </h1>

          <HeroRevealLine delay={1.05}>
            <p className="type-body-lg text-brand-light-slate max-w-md pb-12">
              Exploring the boundaries between structure and fluidity. Premium tailoring for the
              modern city aesthetic.
            </p>
          </HeroRevealLine>

          <HeroRevealLine delay={1.2}>
            <div className="flex items-center gap-8 flex-wrap">
              <Link
                to="/collections/aw26"
                className="type-btn bg-brand-bone text-brand-ink px-9 py-4 hover:bg-brand-white transition-colors duration-500"
              >
                Explore Collection
              </Link>
              <Link
                to="/products/oversized-charcoal-blazer"
                className="type-link text-brand-white border-b border-brand-white/30 pb-1 hover:text-brand-light-slate hover:border-brand-light-slate transition-colors duration-500"
              >
                View Signature Piece
              </Link>
            </div>
          </HeroRevealLine>
        </div>
      </motion.div>

      {!reduced && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-brand-slate/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          aria-hidden
        >
          <span className="type-caption text-brand-slate/70">Scroll</span>
          <div className="h-10 w-px bg-brand-slate/40 overflow-hidden">
            <div className="hero-scroll-indicator h-full w-full bg-brand-white/80" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
