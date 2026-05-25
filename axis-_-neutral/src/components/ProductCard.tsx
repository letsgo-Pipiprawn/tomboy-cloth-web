import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Product } from '../data/products';
import { formatPrice } from '../data/products';
import { useState } from 'react';

type ProductCardProps = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const hoverMedia = product.images[1];
  const hasHoverMedia = Boolean(hoverMedia);
  const isHoverVideo = Boolean(hoverMedia && /\.(mp4|webm|mov)$/i.test(hoverMedia));

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }}
      className="w-[280px] md:w-[360px] lg:w-[400px] flex-shrink-0 flex flex-col group"
    >
      <Link
        to={`/products/${product.slug}`}
        className="flex flex-col cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-[#111]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] grayscale-[0.35] group-hover:grayscale-0 group-hover:scale-[1.03] ${
              hasHoverMedia ? 'opacity-100 group-hover:opacity-0' : 'opacity-100'
            }`}
          />
          {hasHoverMedia &&
            (isHoverVideo ? (
              <video
                src={hoverMedia}
                muted
                loop
                playsInline
                autoPlay={hovered}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            ) : (
              <img
                src={hoverMedia}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            ))}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/18 via-transparent to-transparent opacity-80" />
          <div className="absolute top-4 left-4">
            <span className="type-label text-brand-light-slate/80 border border-brand-white/12 bg-brand-black/35 px-2.5 py-1">
              {product.category}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-start gap-6 px-1">
          <h3 className="type-h3 text-brand-light-slate group-hover:text-brand-white transition-colors">
            {product.name}
          </h3>
          <span className="type-body text-brand-slate shrink-0 pt-0.5">{formatPrice(product.priceAud)}</span>
        </div>
      </Link>
    </motion.div>
  );
}
