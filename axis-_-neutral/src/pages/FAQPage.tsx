import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import PageHero from '../components/PageHero';
import SeoHead from '../components/SeoHead';
import { faqCategories } from '../data/faq';
import { Link } from 'react-router-dom';

function FaqAccordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-slate/20">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-sm text-brand-light-slate group-hover:text-brand-white transition-colors pr-8">
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
            <p className="pb-6 text-brand-slate text-sm leading-relaxed max-w-2xl">{answer}</p>
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
      />
      <PageHero
        label="Support"
        title="Frequently Asked Questions"
        subtitle="Orders, delivery across Australia, returns, and how to read our fit."
      />
      <div className="max-w-3xl mx-auto px-8 md:px-16 py-20">
        {faqCategories.map((cat) => (
          <section key={cat.title} className="mb-16">
            <h2 className="font-serif text-2xl text-brand-white mb-8">{cat.title}</h2>
            {cat.items.map((item) => (
              <FaqAccordion key={item.question} {...item} />
            ))}
          </section>
        ))}
        <p className="text-brand-slate text-sm">
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
