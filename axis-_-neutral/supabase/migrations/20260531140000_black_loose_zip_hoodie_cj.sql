-- CJ Tier 2: Black loose zip hoodie cardigan (pid 2603030850021614800)
-- https://cjdropshipping.com/product/korean-style-loose-fitting-sports-top-for-students-p-2603030850021614800.html

insert into public.collections (slug, title, season, tagline, description, sort_order)
values (
  'aw26',
  'Autumn / Winter 26',
  'AW26',
  'The Shape of Form',
  'Structured outerwear and relaxed layers in neutral black and charcoal.',
  0
)
on conflict (slug) do nothing;

insert into public.products (
  slug,
  name,
  price_aud,
  category,
  collection_slug,
  image_url,
  images,
  description,
  story,
  details,
  sizes,
  featured,
  cj_product_id,
  cj_variant_id,
  cj_sku,
  logistic_name,
  from_country_code,
  fulfillment_type,
  supply_source,
  compare_at_price_aud,
  is_active
)
values (
  'black-loose-zip-hoodie-cardigan-2773343',
  'Black Loose Zip Hoodie Cardigan',
  89,
  'Tops',
  'aw26',
  'https://cf.cjdropshipping.com/quick/product/3c2bce24-93f0-4e7e-9001-2e2dbd4e9273.jpg',
  '[
    "https://cf.cjdropshipping.com/quick/product/3c2bce24-93f0-4e7e-9001-2e2dbd4e9273.jpg",
    "https://cf.cjdropshipping.com/quick/product/1acc7b5d-ef97-4889-a48a-2028ba3e16d0.jpg",
    "https://cf.cjdropshipping.com/quick/product/4f66a523-aed8-4303-a959-f909cb1e54aa.jpg",
    "https://cf.cjdropshipping.com/quick/product/2514c713-7fff-4ad3-b7b7-bab3800a4189.jpg",
    "https://cf.cjdropshipping.com/quick/product/db26e716-9d48-44bc-b19c-15ae5f031435.jpg",
    "https://cf.cjdropshipping.com/quick/product/9ffd35c8-9d41-441b-a683-e6befbb7e565.jpg"
  ]'::jsonb,
  'Oversized zip-through hoodie cardigan in matte black — relaxed drop shoulder, clean hardware, city layer.',
  'Borrowed lines, owned attitude. A neutral layer for androgynous city dressing — zip half-open over a tee or closed under a blazer.',
  '[
    "Colour · Black",
    "Silhouette · Loose zip hoodie cardigan",
    "Fabric · Polyester (supplier spec)",
    "Closure · Full zip",
    "Care · Cold wash gentle, dry flat"
  ]'::jsonb,
  '["S","M","L","XL","2XL","3XL"]'::jsonb,
  true,
  '2603030850021614800',
  '2603030850021619100',
  'CJWY277334308HS',
  'CJPacket',
  'CN',
  'in_stock',
  'cj',
  129,
  true
)
on conflict (slug) do update set
  name = excluded.name,
  price_aud = excluded.price_aud,
  category = excluded.category,
  image_url = excluded.image_url,
  images = excluded.images,
  description = excluded.description,
  story = excluded.story,
  details = excluded.details,
  sizes = excluded.sizes,
  featured = excluded.featured,
  cj_product_id = excluded.cj_product_id,
  cj_variant_id = excluded.cj_variant_id,
  cj_sku = excluded.cj_sku,
  logistic_name = excluded.logistic_name,
  from_country_code = excluded.from_country_code,
  fulfillment_type = excluded.fulfillment_type,
  supply_source = excluded.supply_source,
  compare_at_price_aud = excluded.compare_at_price_aud,
  is_active = excluded.is_active,
  updated_at = now();

-- Single-SKU capsule: activate new CJ hero, pause legacy blazer wishlist row
update public.products
set is_active = false, featured = false, updated_at = now()
where slug <> 'black-loose-zip-hoodie-cardigan-2773343';

update public.products
set is_active = true, featured = true, updated_at = now()
where slug = 'black-loose-zip-hoodie-cardigan-2773343';
