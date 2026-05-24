"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site.config";

/** Replace with CDN URL when assets move to Supabase Storage / R2 */
const HERO_VIDEO_SRC = "/hero.mp4";
// const HERO_VIDEO_SRC = "https://your-cdn.example/hero.mp4";

const HERO_POSTER = "/hero-poster.jpg";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const play = async () => {
      try {
        await video.play();
        setVideoReady(true);
      } catch {
        setVideoReady(false);
      }
    };

    void play();
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-zinc-950">
      <div className="absolute inset-0">
        <Image
          src={HERO_POSTER}
          alt=""
          fill
          priority
          className={`object-cover transition-opacity duration-700 ${
            videoReady && !prefersReducedMotion ? "opacity-0" : "opacity-100"
          }`}
          sizes="100vw"
        />

        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_POSTER}
            preload="metadata"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        )}
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/30 to-zinc-950/90"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-end px-6 pb-24 pt-32 text-center sm:pb-32">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-zinc-300/90">
            {siteConfig.brandName}
            {siteConfig.brandSubtitle}
          </p>
          <h1 className="font-serif text-5xl font-light leading-tight tracking-wide text-white sm:text-7xl">
            Between silence
            <br />
            and structure
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-zinc-300/90 sm:text-base">
            {siteConfig.tagline}
          </p>
          <Link
            href={siteConfig.collectionsAnchor}
            className="mt-10 inline-block border border-white/40 bg-white/5 px-8 py-3 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-sm transition hover:border-white/70 hover:bg-white/10"
          >
            {siteConfig.heroCtaLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
