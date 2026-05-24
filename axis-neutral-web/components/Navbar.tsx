"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/site.config";

const navLinks = [
  { label: "Shop", href: siteConfig.collectionsAnchor },
  { label: "About", href: "#" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/60 backdrop-blur-md backdrop-saturate-150">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8"
        aria-label="Main"
      >
        <Link
          href="/"
          className="font-serif text-lg tracking-[0.2em] text-zinc-100 sm:text-xl"
        >
          {siteConfig.brandName}
          <span className="text-zinc-500">{siteConfig.brandSubtitle}</span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-zinc-400 transition hover:text-zinc-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={siteConfig.collectionsAnchor}
              className="border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-100 transition hover:border-white/60 hover:bg-white/5"
            >
              View all
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px w-5 bg-zinc-100 transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-zinc-100 transition ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-zinc-100 transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="border-t border-white/10 bg-zinc-950/95 px-6 py-6 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block text-sm uppercase tracking-[0.2em] text-zinc-300"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
