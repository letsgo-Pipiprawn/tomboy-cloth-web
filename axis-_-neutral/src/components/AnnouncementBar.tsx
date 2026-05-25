import { motion } from 'motion/react';
import { AU_COMMERCE } from '../data/site';
import { formatPrice } from '../data/products';

export default function AnnouncementBar({ overlayMode = false }: { overlayMode?: boolean }) {
  const threshold = formatPrice(AU_COMMERCE.freeShippingThresholdAud);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`relative w-full shrink-0 text-center py-2.5 px-3 sm:px-4 transition-colors duration-300 ${
        overlayMode
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-brand-slate/20 bg-brand-black/95'
      }`}
    >
      <p className="type-label text-brand-light-slate/85 sm:text-[0.6875rem] leading-snug">
        <span className="sm:hidden">
          AU delivery over {threshold} / {AU_COMMERCE.returnsDays}-day returns
        </span>
        <span className="hidden sm:inline">
          Complimentary AU delivery over {threshold} / {AU_COMMERCE.returnsDays}-day returns /
          Melbourne studio dispatch
        </span>
      </p>
    </motion.div>
  );
}
