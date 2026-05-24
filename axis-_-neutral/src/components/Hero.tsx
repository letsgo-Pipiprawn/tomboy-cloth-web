import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import heroBanner from '@/src/assets/images/hero_banner_1779611218812.png';

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-brand-black">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={heroBanner}
          alt="AXIS / NEUTRAL Fall Collection"
          className="w-full h-full object-cover opacity-80 hero-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/50 to-transparent" />
      </motion.div>

      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-24 md:pb-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="text-brand-slate uppercase tracking-[0.3em] text-xs font-medium mb-4 block">
            Autumn / Winter 26
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight text-brand-white mb-6">
            The Shape <br />
            <span className="italic text-brand-slate">of Form</span>
          </h1>
          <p className="text-brand-light-slate text-sm md:text-base font-light max-w-md pb-8 leading-relaxed">
            Exploring the boundaries between structure and fluidity. Premium tailoring for the
            modern city aesthetic.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <Link
              to="/collections/aw26"
              className="bg-brand-white text-brand-black px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-brand-light-slate transition-colors"
            >
              Explore Collection
            </Link>
            <Link
              to="/products/oversized-charcoal-blazer"
              className="text-brand-white text-xs uppercase tracking-widest font-medium border-b border-brand-slate pb-1 hover:text-brand-light-slate hover:border-brand-light-slate transition-colors"
            >
              View Signature Piece
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
