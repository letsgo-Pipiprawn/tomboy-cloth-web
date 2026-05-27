/**
 * CJ supplier imagery for local / offline catalog fallback.
 * Sync with supabase/cj_backfill_images.sql — never use AI model composites as product photos.
 */
export type SupplierImageSet = {
  hero: string;
  gallery: string[];
};

export const SUPPLIER_IMAGES_BY_SLUG: Record<string, SupplierImageSet> = {
  'loose-casual-black-multi-pocket-trousers-17638570': {
    hero: 'https://cf.cjdropshipping.com/quick/product/ca84bd70-450b-4656-b61f-cb2c6ac9e2aa.jpg',
    gallery: [
      'https://cf.cjdropshipping.com/quick/product/ca84bd70-450b-4656-b61f-cb2c6ac9e2aa.jpg',
      'https://cf.cjdropshipping.com/quick/product/fcbf3638-3d6d-4377-8ba6-5d1bcab3a062.jpg',
      'https://cf.cjdropshipping.com/quick/product/be287613-9782-4962-884e-e651827504b7.jpg',
      'https://cf.cjdropshipping.com/quick/product/ec884252-9d9c-4706-b014-8b6878110306.jpg',
      'https://cf.cjdropshipping.com/quick/product/4b187d90-aa62-4ad3-8df7-c4fad8e9dce5.jpg',
      'https://cf.cjdropshipping.com/quick/product/00d6547f-6e02-475e-9da1-2422e05790df.jpg',
    ],
  },
  'cargo-trousers-with-three-disional-pockets-solid-col-16866555': {
    hero: 'https://cf.cjdropshipping.com/a8a69569-7ee8-4fef-a697-4a5070c4c6a6.jpg',
    gallery: [
      'https://cf.cjdropshipping.com/a8a69569-7ee8-4fef-a697-4a5070c4c6a6.jpg',
      'https://cf.cjdropshipping.com/3d20459b-c2a1-46df-9380-87b1e5f89650.jpg',
      'https://oss-cf.cjdropshipping.com/product/2023/11/03/02/2413167e-c0be-46d6-9dff-6034b6843db3.jpg',
      'https://oss-cf.cjdropshipping.com/product/2024/03/20/06/fb31f3e1-9702-4373-b81c-beb0a37e4bcb.jpg',
      'https://cf.cjdropshipping.com/1305923e-19dd-4a14-adca-baed93c56bf3.jpg',
      'https://cf.cjdropshipping.com/4f953cfa-1fbc-414f-af67-ed42129d8dc2.jpg',
    ],
  },
  'neploe-new-arrival-high-waist-black-pants-solid-colo-13858804': {
    hero: 'https://cf.cjdropshipping.com/1619254495155.jpg',
    gallery: [
      'https://cf.cjdropshipping.com/1619254495155.jpg',
      'https://cf.cjdropshipping.com/1619254495143.jpg',
      'https://cf.cjdropshipping.com/1619254495147.jpg',
      'https://cf.cjdropshipping.com/1619254495153.jpg',
      'https://cf.cjdropshipping.com/1619254495142.jpg',
      'https://cf.cjdropshipping.com/1619254495140.jpg',
    ],
  },
  'straight-suit-pants-spring-and-summer-korean-style-h-13854743': {
    hero: 'https://cf.cjdropshipping.com/1619156998886.png',
    gallery: [
      'https://cf.cjdropshipping.com/1619156998886.png',
      'https://cf.cjdropshipping.com/1619156998884.png',
      'https://cf.cjdropshipping.com/1619156999182.png',
      'https://cf.cjdropshipping.com/1619156998888.png',
      'https://cf.cjdropshipping.com/1619156998890.png',
      'https://cf.cjdropshipping.com/1619156998889.png',
    ],
  },
  'summer-new-slim-legs-long-chiffon-wide-leg-pants-kor-b70c95dd': {
    hero: 'https://cf.cjdropshipping.com/2049/2440576246716.png',
    gallery: [
      'https://cf.cjdropshipping.com/2049/2440576246716.png',
      'https://cf.cjdropshipping.com/2049/1641306745287.png',
      'https://cf.cjdropshipping.com/2049/3224429298030.png',
      'https://cf.cjdropshipping.com/2049/12354146396124.png',
      'https://cf.cjdropshipping.com/2049/1229171106649.png',
      'https://cf.cjdropshipping.com/2049/511689908705.png',
    ],
  },
};

export function supplierImagesForSlug(slug: string): SupplierImageSet | undefined {
  return SUPPLIER_IMAGES_BY_SLUG[slug];
}
