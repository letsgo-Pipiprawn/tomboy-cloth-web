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
  'black-loose-zip-hoodie-cardigan-2773343': {
    hero: 'https://cf.cjdropshipping.com/quick/product/3c2bce24-93f0-4e7e-9001-2e2dbd4e9273.jpg',
    gallery: [
      'https://cf.cjdropshipping.com/quick/product/3c2bce24-93f0-4e7e-9001-2e2dbd4e9273.jpg',
      'https://cf.cjdropshipping.com/quick/product/1acc7b5d-ef97-4889-a48a-2028ba3e16d0.jpg',
      'https://cf.cjdropshipping.com/quick/product/4f66a523-aed8-4303-a959-f909cb1e54aa.jpg',
      'https://cf.cjdropshipping.com/quick/product/2514c713-7fff-4ad3-b7b7-bab3800a4189.jpg',
      'https://cf.cjdropshipping.com/quick/product/db26e716-9d48-44bc-b19c-15ae5f031435.jpg',
      'https://cf.cjdropshipping.com/quick/product/9ffd35c8-9d41-441b-a683-e6befbb7e565.jpg',
    ],
  },
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
