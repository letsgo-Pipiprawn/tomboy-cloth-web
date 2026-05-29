import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import PageHero from '../components/PageHero';
import SeoHead from '../components/SeoHead';
import { faqCategories } from '../data/faq';
import { Link } from 'react-router-dom';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  ),
};

function FaqAccordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-slate/20">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-7 text-left group"
      >
        <span className="type-body text-brand-light-slate group-hover:text-brand-white transition-colors pr-8">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-brand-slate shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-7 type-body text-brand-slate max-w-2xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <main>
      <SeoHead
        title="FAQ"
        description="Shipping, returns, and sizing for AXIS / NEUTRAL — Australia-wide delivery from Melbourne."
        path="/faq"
        jsonLd={faqJsonLd}
      />
      <PageHero
        label="Support"
        title="Frequently Asked Questions"
        subtitle="Orders, delivery across Australia, returns, and how to read our fit."
      />
      <div className="container-narrow section-content">
        {faqCategories.map((cat) => (
          <section key={cat.title} className="mb-16 md:mb-20 last:mb-0">
            <h2 className="type-h2 text-brand-white mb-10">{cat.title}</h2>
            {cat.items.map((item) => (
              <FaqAccordion key={item.question} {...item} />
            ))}
          </section>
        ))}
        <p className="type-body text-brand-slate mt-16">
          Still need help?{' '}
          <Link to="/contact" className="text-brand-white border-b border-brand-slate pb-0.5">
            Contact the studio
          </Link>{' '}
          or read our{' '}
          <Link to="/policies" className="text-brand-white border-b border-brand-slate pb-0.5">
            policies
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
