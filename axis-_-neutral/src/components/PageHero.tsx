import { motion } from 'motion/react';
import SectionLabel from './SectionLabel';

type PageHeroProps = {
  label: string;
  title: string;
  subtitle?: string;
  image?: string;
  tall?: boolean;
};

export default function PageHero({ label, title, subtitle, image, tall = false }: PageHeroProps) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-brand-black ${tall ? 'h-[70vh] min-h-[480px]' : 'h-[50vh] min-h-[360px]'}`}
    >
      {image && (
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img src={image} alt="" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-brand-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black/60 to-transparent" />
        </motion.div>
      )}
      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <SectionLabel className="mb-4">{label}</SectionLabel>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-brand-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-brand-light-slate text-sm md:text-base font-light max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
