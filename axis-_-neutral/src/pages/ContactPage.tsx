import { useState } from 'react';
import PageHero from '../components/PageHero';
import SeoHead from '../components/SeoHead';
import SectionLabel from '../components/SectionLabel';
import { BRAND } from '../data/site';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main>
      <SeoHead
        title="Contact"
        description={`Contact ${BRAND.name} studio in Melbourne — orders, sizing, and press.`}
      />
      <PageHero
        label="Studio"
        title="Get in Touch"
        subtitle="Orders, sizing questions, and press — we reply within one business day (AEST)."
      />
      <div className="max-w-xl mx-auto px-8 md:px-16 py-20">
        <div className="mb-12 space-y-4 text-sm text-brand-slate">
          <p>
            <span className="text-brand-white uppercase tracking-widest text-xs block mb-1">
              Email
            </span>
            <a href={`mailto:${BRAND.email}`} className="hover:text-brand-white transition-colors">
              {BRAND.email}
            </a>
          </p>
          <p>
            <span className="text-brand-white uppercase tracking-widest text-xs block mb-1">
              Location
            </span>
            {BRAND.location}
          </p>
        </div>

        {sent ? (
          <p className="text-brand-light-slate text-sm">
            Thank you — we&apos;ll be in touch shortly.
          </p>
        ) : (
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <SectionLabel>Enquiry</SectionLabel>
            <div>
              <label htmlFor="name" className="text-xs uppercase tracking-widest text-brand-slate block mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full bg-transparent border border-brand-slate/40 px-4 py-3 text-sm text-brand-white focus:border-brand-white outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs uppercase tracking-widest text-brand-slate block mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-transparent border border-brand-slate/40 px-4 py-3 text-sm text-brand-white focus:border-brand-white outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-xs uppercase tracking-widest text-brand-slate block mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full bg-transparent border border-brand-slate/40 px-4 py-3 text-sm text-brand-white focus:border-brand-white outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-white text-brand-black px-10 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-brand-light-slate transition-colors"
            >
              Send Message
            </button>
            <p className="text-[10px] text-brand-slate">
              Form demo — connect to email API or Shopify contact in production.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
