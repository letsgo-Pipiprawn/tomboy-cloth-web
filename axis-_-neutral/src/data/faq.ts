export type FaqItem = { question: string; answer: string };

export const faqCategories: { title: string; items: FaqItem[] }[] = [
  {
    title: 'Orders & Shipping (Australia)',
    items: [
      {
        question: 'Where do you ship?',
        answer:
          'We currently ship Australia-wide. See our Shipping & Returns policy for delivery times, costs, and tracking.',
      },
      {
        question: 'How long does delivery take?',
        answer:
          'Delivery estimates depend on processing and transit. Full details are in our Shipping & Returns policy.',
      },
      {
        question: 'Is shipping free?',
        answer:
          'Complimentary standard shipping on orders over $200 AUD. Otherwise standard shipping is $12 AUD. See Shipping & Returns for the full breakdown.',
      },
      {
        question: 'Are prices inclusive of GST?',
        answer: 'Yes. All prices on this site are shown in AUD and include GST where applicable.',
      },
    ],
  },
  {
    title: 'Returns & Exchanges',
    items: [
      {
        question: 'What is your return policy?',
        answer:
          'Unworn items with original tags may be returned within 14 days of delivery for a refund or exchange. Sale items are final sale unless faulty.',
      },
      {
        question: 'How do I start a return?',
        answer:
          'Email studio@axisneutral.com with your order number. We provide a prepaid return label for Australian orders.',
      },
    ],
  },
  {
    title: 'Fit & Sizing',
    items: [
      {
        question: 'How should I choose a size?',
        answer:
          'We size on chest, shoulder, and length — the way you would wear menswear. See our Size Guide for garment measurements per size.',
      },
      {
        question: 'Do pieces run oversized?',
        answer:
          'Many AW26 pieces are intentionally relaxed. If between sizes and you want the borrowed look, size up; for a cleaner line, take your usual.',
      },
    ],
  },
];
