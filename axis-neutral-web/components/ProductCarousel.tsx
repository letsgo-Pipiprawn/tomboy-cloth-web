"use client";

import { motion } from "framer-motion";
import { getPlaceholderProducts } from "@/lib/products.placeholder";
import { ProductCard } from "./ProductCard";

export function ProductCarousel() {
  const products = getPlaceholderProducts();

  return (
    <section
      id="collections"
      className="scroll-mt-20 border-t border-white/10 bg-zinc-950 px-6 py-20 sm:px-8 sm:py-28"
      aria-labelledby="collections-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.header
          className="mb-12 max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-zinc-500">
            Collections
          </p>
          <h2
            id="collections-heading"
            className="font-serif text-4xl font-light tracking-wide text-zinc-50 sm:text-5xl"
          >
            Curated pieces
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            Horizontal scroll. Grayscale to color on hover. Product data will
            sync from Supabase in a later phase.
          </p>
        </motion.header>

        {products.length === 0 ? (
          <motion.div
            className="flex min-h-[220px] flex-col items-center justify-center rounded-sm border border-dashed border-zinc-700/80 bg-zinc-900/40 px-6 py-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-serif text-2xl text-zinc-300">
              Collections coming soon
            </p>
            <p className="mt-3 max-w-md text-sm text-zinc-500">
              The catalog slot is ready. Add products in{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400">
                lib/products.placeholder.ts
              </code>{" "}
              or connect Supabase when ready.
            </p>
          </motion.div>
        ) : (
          <div
            className="carousel-scroll -mx-6 flex gap-6 overflow-x-auto px-6 pb-4 sm:-mx-8 sm:gap-8 sm:px-8"
            role="list"
          >
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
