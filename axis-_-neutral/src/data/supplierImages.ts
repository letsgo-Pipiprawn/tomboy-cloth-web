/**
 * Supplier imagery for local / offline catalog fallback.
 * CJ: sync with supabase/cj_backfill_images.sql
 * 1688: sync with supabase/migrations/*hero*1688*.sql
 */
export type SupplierImageSet = {
  hero: string;
  gallery: string[];
};

const HERO_1688_OFFER_URL = 'https://detail.1688.com/offer/1031360516910.html';

export const SUPPLIER_IMAGES_BY_SLUG: Record<string, SupplierImageSet> = {
  'black-double-breasted-chain-blazer-6754': {
    hero: 'https://cbu01.alicdn.com/img/ibank/O1CN01WTZbRH2KCDfifm93E_!!2219481329520-0-cib.jpg',
    gallery: [
      'https://cbu01.alicdn.com/img/ibank/O1CN01WTZbRH2KCDfifm93E_!!2219481329520-0-cib.jpg',
      'https://cbu01.alicdn.com/img/ibank/O1CN01XTxLz12KCDfiUhEhz_!!2219481329520-0-cib.jpg',
      'https://cbu01.alicdn.com/img/ibank/O1CN01AC5zcf2KCDfijSYCT_!!2219481329520-0-cib.jpg',
      'https://cbu01.alicdn.com/img/ibank/O1CN01MEquzk2KCDfi5B3pK_!!2219481329520-0-cib.jpg',
      'https://cbu01.alicdn.com/img/ibank/O1CN01nfP5X22KCDfocqElu_!!2219481329520-0-cib.jpg',
      'https://cbu01.alicdn.com/img/ibank/O1CN0192IjCb2KCDfiMtJXF_!!2219481329520-0-cib.jpg',
    ],
  },
};

export function supplierImagesForSlug(slug: string): SupplierImageSet | undefined {
  return SUPPLIER_IMAGES_BY_SLUG[slug];
}

export { HERO_1688_OFFER_URL };
