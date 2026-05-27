-- Tier 1 hero: 1688 chain blazer — supplier photos + offer URL
-- Offer: https://detail.1688.com/offer/1031360516910.html (internal ref 6754)

update public.products
set
  supplier_ref = 'https://detail.1688.com/offer/1031360516910.html',
  image_url = 'https://cbu01.alicdn.com/img/ibank/O1CN01WTZbRH2KCDfifm93E_!!2219481329520-0-cib.jpg',
  images = '[
    "https://cbu01.alicdn.com/img/ibank/O1CN01WTZbRH2KCDfifm93E_!!2219481329520-0-cib.jpg",
    "https://cbu01.alicdn.com/img/ibank/O1CN01XTxLz12KCDfiUhEhz_!!2219481329520-0-cib.jpg",
    "https://cbu01.alicdn.com/img/ibank/O1CN01AC5zcf2KCDfijSYCT_!!2219481329520-0-cib.jpg",
    "https://cbu01.alicdn.com/img/ibank/O1CN01MEquzk2KCDfi5B3pK_!!2219481329520-0-cib.jpg",
    "https://cbu01.alicdn.com/img/ibank/O1CN01nfP5X22KCDfocqElu_!!2219481329520-0-cib.jpg",
    "https://cbu01.alicdn.com/img/ibank/O1CN0192IjCb2KCDfiMtJXF_!!2219481329520-0-cib.jpg"
  ]'::jsonb,
  updated_at = now()
where slug = 'black-double-breasted-chain-blazer-6754';
