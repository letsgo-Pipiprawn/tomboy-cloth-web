import { motion } from 'motion/react';
import SectionLabel from './SectionLabel';

type PageHeroProps = {
  label: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  tall?: boolean;
};

export default function PageHero({
  label,
  title,
  subtitle,
  image,
  imageAlt,
  tall = false,
}: PageHeroProps) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-brand-black ${
        tall ? 'min-h-[68svh] md:h-[68vh] md:min-h-[420px]' : 'min-h-[48svh] md:h-[48vh] md:min-h-[340px]'
      }`}
    >
      {image && (
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={image}
            alt={imageAlt ?? title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-brand-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black/60 to-transparent" />
        </motion.div>
      )}
      <div className="absolute inset-0 flex flex-col justify-end container-site pb-14 md:pb-20">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl w-full min-w-0"
        >
          <SectionLabel className="mb-5">{label}</SectionLabel>
          <h1 className="type-h1 text-brand-white mb-5">{title}</h1>
          {subtitle && (
            <p className="type-body-lg text-brand-light-slate max-w-xl">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
