import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Product } from '../data/products';
import { formatPrice } from '../data/products';

type ProductCardProps = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }}
      className="w-[280px] md:w-[360px] lg:w-[420px] flex-shrink-0 flex flex-col group"
    >
      <Link to={`/products/${product.slug}`} className="flex flex-col cursor-pointer">
        <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-[#111]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-brand-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 left-4">
            <span className="text-[10px] uppercase tracking-widest text-brand-white/70 bg-brand-black/50 px-2 py-1 backdrop-blur-md">
              {product.category}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-start gap-4 px-1">
          <h3 className="font-medium text-brand-light-slate group-hover:text-brand-white transition-colors text-sm font-sans tracking-wide">
            {product.name}
          </h3>
          <span className="font-sans text-brand-slate text-sm shrink-0">
            {formatPrice(product.priceAud)}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
