"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products.types";

type ProductCardProps = {
  product: Product;
  index?: number;
};

function formatPriceAud(priceAud: number | null): string {
  if (priceAud === null) return "Price TBC";
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(priceAud);
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const hasImage = Boolean(product.imageUrl);

  return (
    <motion.article
      className="group relative w-[min(72vw,280px)] shrink-0 snap-start scroll-ml-6 sm:w-[300px] sm:scroll-ml-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-zinc-900 ring-1 ring-white/10">
        {hasImage ? (
          <motion.div
            className="relative h-full w-full"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={product.imageUrl!}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 72vw, 300px"
              className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
              loading="lazy"
            />
          </motion.div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-zinc-800/80 px-4 text-center">
            <span className="font-serif text-lg text-zinc-300">Coming soon</span>
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              {product.collection ?? "Collection"}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-xl tracking-wide text-zinc-100">
          {product.title}
        </h3>
        <p className="text-sm text-zinc-400">{formatPriceAud(product.priceAud)}</p>
      </div>
    </motion.article>
  );
}
