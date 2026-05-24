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
        path="/contact"
      />
      <PageHero
        label="Studio"
        title="Get in Touch"
        subtitle="Orders, sizing questions, and press — we reply within one business day (AEST)."
      />
      <div className="container-narrow section-content">
        <div className="mb-14 space-y-8 type-body text-brand-slate">
          <p>
            <span className="type-label text-brand-white block mb-2">Email</span>
            <a href={`mailto:${BRAND.email}`} className="hover:text-brand-white transition-colors">
              {BRAND.email}
            </a>
          </p>
          <p>
            <span className="type-label text-brand-white block mb-2">Location</span>
            {BRAND.location}
          </p>
        </div>

        {sent ? (
          <p className="type-body-lg text-brand-light-slate">
            Thank you — we&apos;ll be in touch shortly.
          </p>
        ) : (
          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <SectionLabel>Enquiry</SectionLabel>
            <div>
              <label htmlFor="name" className="type-label text-brand-slate block mb-3">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full bg-transparent border border-brand-slate/40 px-4 py-3.5 type-body text-brand-white focus:border-brand-white outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="type-label text-brand-slate block mb-3">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-transparent border border-brand-slate/40 px-4 py-3.5 type-body text-brand-white focus:border-brand-white outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="type-label text-brand-slate block mb-3">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full bg-transparent border border-brand-slate/40 px-4 py-3.5 type-body text-brand-white focus:border-brand-white outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="type-btn bg-brand-white text-brand-black px-10 py-4 hover:bg-brand-light-slate transition-colors"
            >
              Send Message
            </button>
            <p className="type-caption text-brand-slate">
              Form demo — connect to email API or Shopify contact in production.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
