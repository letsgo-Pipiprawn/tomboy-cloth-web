-- Deactivate CJ SKUs outside AXIS / NEUTRAL capsule (5 in_stock bottoms + wishlist hero is domestic).
-- Run: npx supabase db query --linked -f supabase/cj_curation_deactivate.sql

update public.products
set is_active = false,
    updated_at = now()
where cj_product_id is not null
  and upper(cj_product_id) not in (
    '1763857009402716160',
    '1686655519383105536',
    '1385880424588382208',
    '1385474312223461376',
    'B70C95DD-FF12-4079-B962-69EDD6FEF81A'
  );

-- Trimmed from capsule 2026-05-26 (blazer stack + faux coat)
update public.products
set is_active = false,
    updated_at = now()
where slug in (
  'faux-lambswool-oversized-jacket-coat-winter-black-wa-d1134fb0',
  'office-ladies-black-formal-blazer-work-suit-14533346',
  'solid-long-style-black-jacket-and-blazer-female-notc-70fa7cf4',
  'black-suit-jacket-sense-of-design-niche-autumn-loose-14300765',
  'pu-leather-high-waist-loose-black-trousers-casual-st-14154978',
  'black-plaid-shirt-long-sleeve-casual-loose-shirt-coa-25022105',
  'cargo-pants-loose-feet-pants-d7d99ccc',
  'fashion-individual-casual-jacket-25020406',
  'loose-casual-camouflage-wide-leg-trousers-for-25012713',
  'cotton-multi-pocket-loose-cargo-trousers-straight-ou-17764959',
  'camouflage-cargo-casual-pants-328444fd',
  'splash-ink-paint-spots-loose-cargo-pants-and-17192421',
  'sibybo-black-cotton-thicken-cargo-pants-autumn-high--13822281',
  'streetwear-cargo-pants-for-black-jogger-trousers-13779076',
  's-sports-pants-with-pockets-casual-cargo-trousers-16492895',
  'letter-embroidery-personality-all-match-black-jeans--14086013',
  'punk-washed-and-worn-loose-straight-cargo-trousers-17913835',
  'national-fashion-retro-loose-denim-cargo-pants-wide--24091708',
  'rivet-design-casual-pants-high-waist-crimp-stitching-17503374',
  'multi-pocket-loose-straight-cargo-trousers-24061306',
  'plus-size-loose-cargo-pants-24080509',
  'loose-cargo-trousers-fashion-brands-knee-pleated-17914601',
  'loose-cargo-straight-leg-trousers-high-street-17913854',
  'double-breasted-blazer-fashion-casual-lapel-jacket-c-15648102',
  'loose-button-casual-wide-leg-trousers-24122602'
);

-- CJ bottoms: in_stock
update public.products
set fulfillment_type = 'in_stock',
    supply_source = 'cj',
    updated_at = now()
where slug in (
  'loose-casual-black-multi-pocket-trousers-17638570',
  'cargo-trousers-with-three-disional-pockets-solid-col-16866555',
  'neploe-new-arrival-high-waist-black-pants-solid-colo-13858804',
  'straight-suit-pants-spring-and-summer-korean-style-h-13854743',
  'summer-new-slim-legs-long-chiffon-wide-leg-pants-kor-b70c95dd'
)
  and is_active = true;
