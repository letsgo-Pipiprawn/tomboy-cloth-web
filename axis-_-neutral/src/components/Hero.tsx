import { Link } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'motion/react';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  HERO_SLIDES,
  HERO_SLIDE_INTERVAL_MS,
  HERO_VIDEO_SRC,
  HERO_MASK_BACKGROUND,
  HERO_MASK_FOREGROUND,
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
  const [foregroundSrc, setForegroundSrc] = useState(HERO_MASK_FOREGROUND);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '16%']);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, reduced ? 1 : 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], ['0px', reduced ? '0px' : '48px']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-8%']);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 20, mass: 0.25 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 20, mass: 0.25 });
  const bgX = useTransform(smoothX, [-1, 1], ['-2.4%', '2.4%']);
  const bgY = useTransform(smoothY, [-1, 1], ['-1.5%', '1.5%']);
  const fgX = useTransform(smoothX, [-1, 1], ['1.2%', '-1.2%']);
  const fgY = useTransform(smoothY, [-1, 1], ['1%', '-1%']);

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
      className="relative w-full min-h-[100dvh] overflow-hidden bg-brand-black"
      onMouseMove={(event) => {
        if (reduced) return;
        const nx = (event.clientX / window.innerWidth - 0.5) * 2;
        const ny = (event.clientY / window.innerHeight - 0.5) * 2;
        pointerX.set(nx);
        pointerY.set(ny);
      }}
      onMouseLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: mediaY, scale: mediaScale, x: bgX }}
      >
        <motion.img
          src={HERO_MASK_BACKGROUND}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1.8s] hero-bg-layer ${
            showVideo || showStills ? 'opacity-0' : 'opacity-90 hero-ken-burns'
          }`}
          style={{ y: bgY }}
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
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none"
        style={{ y: titleY }}
        aria-hidden
      >
        <h2 className="hero-mask-title text-brand-white/92">
          AXIS <span className="opacity-45">/</span> NEUTRAL
        </h2>
      </motion.div>

      <motion.div className="absolute inset-0 z-30 pointer-events-none" style={{ x: fgX, y: fgY }} aria-hidden>
        <img
          src={foregroundSrc}
          alt=""
          className="hero-foreground-mask"
          onError={() => setForegroundSrc(heroPoster)}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-40 flex flex-col justify-end container-site pb-20 md:pb-32 pointer-events-none"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-3xl pointer-events-auto">
          <HeroRevealLine delay={0.55}>
            <SectionLabel className="text-brand-light-slate/70 mb-6">Autumn / Winter 26</SectionLabel>
          </HeroRevealLine>

          <h1 className="hero-main-title text-brand-white mb-6">
            <HeroRevealLine delay={0.7}>
              <span className="block">Own The Street.</span>
            </HeroRevealLine>
          </h1>

          <HeroRevealLine delay={1.05}>
            <p className="hero-main-subtitle text-brand-light-slate max-w-xl pb-8">
              Genderless tailoring for the modern soul.
            </p>
          </HeroRevealLine>

          <HeroRevealLine delay={1.12}>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pb-10">
              <p className="type-caption text-brand-light-slate/85">BEYOND LABELS.</p>
              <p className="type-caption text-brand-light-slate/85">THE NEW SUIT.</p>
            </div>
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-brand-slate/70"
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
