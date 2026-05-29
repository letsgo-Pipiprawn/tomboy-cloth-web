import PageHero from '../components/PageHero';
import SectionLabel from '../components/SectionLabel';
import SeoHead from '../components/SeoHead';
import { AU_COMMERCE, BRAND } from '../data/site';

const sections = [
  {
    id: 'shipping',
    label: 'Shipping',
    title: 'Delivery within Australia',
    content: [
      'We ship Australia-wide. Orders are fulfilled through selected overseas manufacturing and logistics partners, then delivered to your address with tracking.',
      'Processing: we place your order with our logistics partner within 1–3 business days after payment clears.',
      `Standard delivery: typically ${AU_COMMERCE.standardDeliveryDays} to metro Australia once dispatched. Regional areas may take longer.`,
      `Complimentary standard shipping on orders over $${AU_COMMERCE.freeShippingThresholdAud} AUD. Otherwise standard shipping is $${AU_COMMERCE.standardShippingAud} AUD.`,
      'We email your tracking number when the parcel is in transit (usually within a few days of dispatch).',
      'We currently ship to Australia only.',
    ],
  },
  {
    id: 'returns',
    label: 'Returns',
    title: 'Returns & exchanges',
    content: [
      `Unworn items with original tags attached may be returned within ${AU_COMMERCE.returnsDays} days of delivery for a full refund or exchange.`,
      'Sale items are final sale unless faulty.',
      `To initiate a return, email ${BRAND.email} with your order number. We will send return instructions for Australian orders.`,
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
      'You may request access to or deletion of your data at any time by contacting studio@axisneutral.com.au.',
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
      <SeoHead
        title="Policies"
        description="Shipping, returns, privacy, and terms for AXIS / NEUTRAL — Australian customers."
        path="/policies"
      />
      <PageHero
        label="Support"
        title="Policies"
        subtitle="Clear terms for shipping, returns, and your data — written for Australian customers."
      />

      <div className="container-narrow section-content">
        <nav
          className="flex flex-wrap gap-5 mb-16 md:mb-20 pb-10 border-b border-brand-slate/20"
          aria-label="Policy sections"
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="type-link text-brand-slate hover:text-brand-white transition-colors"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="space-y-20 md:space-y-24">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-32">
              <SectionLabel className="mb-5">{section.label}</SectionLabel>
              <h2 className="type-h2 text-brand-white mb-10">{section.title}</h2>
              <ul className="space-y-6">
                {section.content.map((paragraph) => (
                  <li
                    key={paragraph.slice(0, 40)}
                    className="type-body-lg text-brand-light-slate pl-5 border-l border-brand-slate/30"
                  >
                    {paragraph}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-20 md:mt-24 pt-10 border-t border-brand-slate/20 type-caption text-brand-slate">
          Questions? {BRAND.email} · {BRAND.location}
        </p>
      </div>
    </main>
  );
}
