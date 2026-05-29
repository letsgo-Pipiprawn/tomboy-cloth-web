export const BRAND = {
  name: 'AXIS / NEUTRAL',
  tagline: 'The architecture of the modern wardrobe.',
  description:
    'Premium materials, meticulous construction, effortless form. Androgynous city tailoring for alpha-energy dressing — structure without stiffness, neutrality without boredom.',
  email: 'studio@axisneutral.com',
  location: 'Melbourne, Australia',
  abn: '00 000 000 000',
} as const;

/** Validation phase: manual CJ fulfill, conservative shipping copy, no express checkout. */
export const VALIDATION_MODE = true as const;

export const AU_COMMERCE = {
  freeShippingThresholdAud: 200,
  standardShippingAud: 12,
  expressShippingAud: 22,
  returnsDays: 14,
  currency: 'AUD',
  /** CJ AU transit — validation-phase honest range */
  standardDeliveryDays: '10–20 business days after dispatch',
} as const;

export const NAV_LINKS = [
  { label: 'Shop', href: '/collections/all' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
] as const;

export const PACKAGING = {
  title: 'Packaging',
  lines: [
    'Orders ship in protective mailer or box.',
    'Pieces are folded for transit; exact presentation may vary during our launch phase.',
    'Care and sizing notes are on the product page and Size Guide.',
  ],
} as const;

export const FOOTER_EXPLORE = [
  { label: 'All Objects', href: '/collections/all' },
  { label: 'Autumn / Winter 26', href: '/collections/aw26' },
  { label: 'New Arrivals', href: '/#new-arrivals' },
  { label: 'About the Studio', href: '/about' },
  { label: 'Editorial', href: '/lookbook' },
] as const;

export const FOOTER_SUPPORT = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Track order', href: '/orders/track' },
  { label: 'Size Guide', href: '/size-guide' },
  { label: 'Shipping & Returns', href: '/policies' },
  { label: 'Contact', href: '/contact' },
] as const;
