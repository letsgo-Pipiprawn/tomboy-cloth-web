import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import SectionLabel from './SectionLabel';
import heroBanner from '@/src/assets/images/hero_banner_1779611218812.png';
import blazer from '@/src/assets/images/oversized_blazer_1779611239597.png';
import trench from '@/src/assets/images/trench_coat_1779611276152.png';
import trousers from '@/src/assets/images/wide_leg_trousers_1779611256512.png';
import longBlazerWideTrouserLook from '@/src/assets/images/models/long_line_blazer_wide_trouser_lookbook.png';

export default function EditorialLookbook() {
  const reduced = useReducedMotion();

  return (
    <section id="editorial" className="section-y container-site mb-20 md:mb-[150px]">
      <div className="mb-12 md:mb-16">
        <SectionLabel className="mb-4">Lookbook</SectionLabel>
        <h2 className="type-h2 text-brand-white">
          The second act, <span className="italic text-brand-slate">from mood to product.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
        <motion.article
          className="md:col-span-7 lg:col-span-6 md:row-span-2 aspect-[4/5] overflow-hidden bg-[#111]"
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.85, ease: [0.2, 1, 0.3, 1] }}
        >
          <img
            src={longBlazerWideTrouserLook}
            alt="Long-line black blazer with wide-leg black trousers, city lookbook"
            loading="lazy"
            data-cursor-label="VIEW LOOK"
            className="product-image w-full h-full object-cover object-[center_12%] scale-[1.04] md:hover:scale-[1.08] transition-transform duration-[2200ms]"
          />
        </motion.article>

        <motion.article
          className="md:col-span-5 lg:col-span-3 aspect-[3/4] overflow-hidden bg-[#111]"
          initial={{ opacity: 0, y: reduced ? 0 : 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ delay: 0.12, duration: 0.85 }}
        >
          <img
            src={blazer}
            alt="Fabric and shoulder line close-up"
            loading="lazy"
            data-cursor-label="VIEW LOOK"
            className="product-image w-full h-full object-cover object-[center_18%] md:hover:scale-[1.06] transition-transform duration-[1800ms]"
          />
        </motion.article>

        <motion.article
          className="md:col-span-5 lg:col-span-3 aspect-[3/4] overflow-hidden bg-[#111]"
          initial={{ opacity: 0, y: reduced ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ delay: 0.18, duration: 0.85 }}
        >
          <img
            src={trench}
            alt="Walking back silhouette shot"
            loading="lazy"
            data-cursor-label="VIEW LOOK"
            className="product-image w-full h-full object-cover object-[center_20%] md:hover:scale-[1.06] transition-transform duration-[1800ms]"
          />
        </motion.article>

        <motion.article
          className="md:col-span-12 lg:col-span-3 aspect-[16/10] overflow-hidden bg-[#111]"
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ delay: 0.22, duration: 0.85 }}
        >
          <img
            src={trousers}
            alt="Wide leg drape detail"
            loading="lazy"
            data-cursor-label="VIEW LOOK"
            className="product-image w-full h-full object-cover object-[center_32%] md:hover:scale-[1.04] transition-transform duration-[1800ms]"
          />
        </motion.article>
      </div>

      <div className="mt-12 md:mt-16 text-center">
        <Link
          to="/collections/aw26"
          className="type-link text-brand-slate border-b border-brand-slate pb-1 hover:text-brand-white transition-colors"
        >
          Shop the collection
        </Link>
      </div>

      <figure className="mt-16 md:mt-24 aspect-[21/9] overflow-hidden bg-[#111] hidden md:block">
        <img
          src={heroBanner}
          alt="AXIS / NEUTRAL AW26 campaign editorial"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </figure>
    </section>
  );
}
