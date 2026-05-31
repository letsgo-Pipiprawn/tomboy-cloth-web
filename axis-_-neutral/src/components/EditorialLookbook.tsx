import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import SectionLabel from './SectionLabel';
import EditorialCampaignVideo from './EditorialCampaignVideo';
import {
  EDITORIAL_BLAZER_CHAIN,
  EDITORIAL_BLAZER_FLATLAY,
  EDITORIAL_CAMPAIGN_STILL,
  EDITORIAL_LOOKBOOK_HERO,
} from '../config/editorialImages';

const SHOP_PATH = '/collections/all';

const lookbookLinkClass =
  'block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-white';

const tileMotion = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-120px' as const },
  transition: { duration: 0.85, ease: [0.2, 1, 0.3, 1] as const },
};

export default function EditorialLookbook() {
  const reduced = useReducedMotion();

  return (
    <section id="editorial" className="section-y container-site">
      <div className="mb-14 md:mb-20 max-w-2xl">
        <SectionLabel className="mb-5">Lookbook</SectionLabel>
        <h2 className="type-h2 text-brand-white leading-[1.15]">
          The second act, <span className="italic text-brand-slate">from mood to product.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
        <motion.article
          className="md:col-span-7 lg:col-span-6 md:row-span-2 aspect-[4/5] overflow-hidden bg-[#111]"
          {...tileMotion}
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
        >
          <EditorialCampaignVideo />
        </motion.article>

        <motion.article
          className="md:col-span-5 lg:col-span-3 aspect-[3/4] overflow-hidden bg-[#111]"
          {...tileMotion}
          initial={{ opacity: 0, y: reduced ? 0 : 42 }}
          transition={{ ...tileMotion.transition, delay: 0.12 }}
        >
          <Link to={SHOP_PATH} className={lookbookLinkClass} data-cursor-label="SEE PIECE">
            <img
              src={EDITORIAL_LOOKBOOK_HERO}
              alt="Long-line black blazer with wide-leg black trousers, city lookbook"
              loading="lazy"
              decoding="async"
              className="product-image w-full h-full object-cover object-[center_12%] scale-[1.03] md:hover:scale-[1.06] transition-transform duration-[2200ms]"
            />
          </Link>
        </motion.article>

        <motion.article
          className="md:col-span-5 lg:col-span-3 aspect-[3/4] overflow-hidden bg-[#111]"
          {...tileMotion}
          initial={{ opacity: 0, y: reduced ? 0 : 30 }}
          transition={{ ...tileMotion.transition, delay: 0.18 }}
        >
          <Link to={SHOP_PATH} className={lookbookLinkClass} data-cursor-label="SEE DETAIL">
            <img
              src={EDITORIAL_BLAZER_CHAIN}
              alt="Chest chain and carabiner detail"
              loading="lazy"
              decoding="async"
              className="product-image w-full h-full object-cover object-[center_20%] md:hover:scale-[1.06] transition-transform duration-[1800ms]"
            />
          </Link>
        </motion.article>

        <motion.article
          className="md:col-span-12 lg:col-span-3 aspect-[16/10] overflow-hidden bg-[#111]"
          {...tileMotion}
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
          transition={{ ...tileMotion.transition, delay: 0.22 }}
        >
          <Link to={SHOP_PATH} className={lookbookLinkClass} data-cursor-label="SEE DETAIL">
            <img
              src={EDITORIAL_BLAZER_FLATLAY}
              alt="Blazer flat lay on white"
              loading="lazy"
              decoding="async"
              className="product-image w-full h-full object-cover object-[center_32%] md:hover:scale-[1.04] transition-transform duration-[1800ms]"
            />
          </Link>
        </motion.article>
      </div>

      <div className="mt-16 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
        <Link
          to={SHOP_PATH}
          className="type-btn bg-brand-bone px-8 py-3.5 text-brand-ink hover:bg-brand-white transition-colors"
        >
          Join waitlist
        </Link>
        <Link
          to="/collections/aw26"
          className="type-link text-brand-slate border-b border-brand-slate pb-1 hover:text-brand-white transition-colors"
        >
          AW26 collection
        </Link>
      </div>

      <figure className="mt-20 md:mt-28 w-full overflow-hidden bg-[#111] hidden md:block">
        <Link to={SHOP_PATH} className={lookbookLinkClass} data-cursor-label="JOIN WAITLIST">
          <img
            src={EDITORIAL_CAMPAIGN_STILL}
            alt="Model C in minimal tailoring, AW26 campaign editorial in Melbourne laneway"
            loading="lazy"
            decoding="async"
            className="block w-full h-auto max-h-[min(72vh,820px)] object-contain object-center mx-auto md:hover:scale-[1.02] transition-transform duration-[1800ms]"
          />
        </Link>
      </figure>
    </section>
  );
}
