import PageHero from '../components/PageHero';
import SectionLabel from '../components/SectionLabel';
import { BRAND } from '../data/site';

const sections = [
  {
    id: 'shipping',
    label: 'Shipping',
    title: 'Delivery within Australia',
    content: [
      'Standard shipping: 3–7 business days via Australia Post. Express: 1–3 business days (metro areas).',
      'Complimentary standard shipping on orders over $200 AUD.',
      'Orders are dispatched from our Melbourne studio within 1–2 business days. You will receive tracking once your parcel leaves.',
      'We currently ship to Australia only. International expansion is planned for 2026.',
    ],
  },
  {
    id: 'returns',
    label: 'Returns',
    title: 'Returns & exchanges',
    content: [
      'Unworn items with original tags attached may be returned within 14 days of delivery for a full refund or exchange.',
      'Sale items are final sale unless faulty.',
      'To initiate a return, email studio@axisneutral.com with your order number. We will provide a prepaid return label for Australian orders.',
      'Refunds are processed within 5–10 business days after we receive and inspect the item.',
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy',
    title: 'Privacy policy',
    content: [
      'We collect only information necessary to fulfil your order: name, email, shipping address, and payment details (processed securely via our payment provider — we do not store card numbers).',
      'Your data is used solely for order fulfilment, customer support, and — if you opt in — editorial communications.',
      'We do not sell your personal information to third parties.',
      'You may request access to or deletion of your data at any time by contacting studio@axisneutral.com.',
      'This policy is governed by the Australian Privacy Act 1988.',
    ],
  },
  {
    id: 'terms',
    label: 'Terms',
    title: 'Terms of service',
    content: [
      'By purchasing from AXIS / NEUTRAL you agree to these terms. All prices are in AUD and include GST where applicable.',
      'We reserve the right to cancel orders in cases of pricing errors or stock unavailability, with a full refund.',
      'Product images are representative; slight colour variation may occur due to screen calibration and natural fibres.',
      'Nothing on this site constitutes medical, therapeutic, or professional advice.',
    ],
  },
];

export default function PolicyPage() {
  return (
    <main>
      <PageHero
        label="Support"
        title="Policies"
        subtitle="Clear terms for shipping, returns, and your data — written for Australian customers."
      />

      <div className="max-w-3xl mx-auto px-8 md:px-16 py-20">
        <nav className="flex flex-wrap gap-4 mb-16 pb-8 border-b border-brand-slate/20">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-xs uppercase tracking-widest text-brand-slate hover:text-brand-white transition-colors"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="space-y-20">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-32">
              <SectionLabel className="mb-4">{section.label}</SectionLabel>
              <h2 className="font-serif text-2xl md:text-3xl text-brand-white mb-8">
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.content.map((paragraph) => (
                  <li
                    key={paragraph.slice(0, 40)}
                    className="text-brand-light-slate text-sm leading-relaxed pl-4 border-l border-brand-slate/30"
                  >
                    {paragraph}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-20 pt-8 border-t border-brand-slate/20 text-xs text-brand-slate uppercase tracking-widest">
          Questions? {BRAND.email} · {BRAND.location}
        </p>
      </div>
    </main>
  );
}
