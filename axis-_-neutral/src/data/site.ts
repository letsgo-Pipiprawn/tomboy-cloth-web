export const BRAND = {
  name: 'AXIS / NEUTRAL',
  tagline: 'The architecture of the modern wardrobe.',
  description:
    'Premium materials, meticulous construction, effortless form. Tailoring for the tomboy city aesthetic — structure without stiffness, neutrality without boredom.',
  email: 'studio@axisneutral.com',
  location: 'Melbourne, Australia',
  abn: '00 000 000 000',
} as const;

export const AU_COMMERCE = {
  freeShippingThresholdAud: 200,
  standardShippingAud: 12,
  expressShippingAud: 22,
  returnsDays: 14,
  currency: 'AUD',
} as const;

export const NAV_LINKS = [
  { label: 'Shop', href: '/collections/aw26' },
  { label: 'Lookbook', href: '/#editorial' },
  { label: 'About', href: '/about' },
] as const;

export const FOOTER_EXPLORE = [
  { label: 'Autumn / Winter 26', href: '/collections/aw26' },
  { label: 'New Arrivals', href: '/#new-arrivals' },
  { label: 'About the Studio', href: '/about' },
  { label: 'Editorial', href: '/#editorial' },
] as const;

export const FOOTER_SUPPORT = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Size Guide', href: '/size-guide' },
  { label: 'Shipping & Returns', href: '/policies' },
  { label: 'Contact', href: '/contact' },
] as const;
