import { motion } from 'motion/react';
import { AU_COMMERCE } from '../data/site';
import { formatPrice } from '../data/products';

export default function AnnouncementBar() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-[45] bg-brand-white text-brand-black text-center py-2 px-4"
    >
      <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">
        Free AU shipping over {formatPrice(AU_COMMERCE.freeShippingThresholdAud)} ·{' '}
        {AU_COMMERCE.returnsDays}-day returns · Ships from Melbourne
      </p>
    </motion.div>
  );
}
