import { motion } from 'motion/react';
import { AU_COMMERCE } from '../data/site';
import { formatPrice } from '../data/products';

export default function AnnouncementBar() {
  const threshold = formatPrice(AU_COMMERCE.freeShippingThresholdAud);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative w-full shrink-0 bg-brand-white text-brand-black text-center py-2 px-3 sm:px-4"
    >
      <p className="type-label sm:text-xs leading-snug">
        <span className="sm:hidden">
          Free AU shipping {threshold}+ · {AU_COMMERCE.returnsDays}-day returns
        </span>
        <span className="hidden sm:inline">
          Free AU shipping over {threshold} · {AU_COMMERCE.returnsDays}-day returns · Ships from
          Melbourne
        </span>
      </p>
    </motion.div>
  );
}
