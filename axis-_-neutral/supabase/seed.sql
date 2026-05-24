-- Seed AW26 catalog (run after migration in Supabase SQL Editor)
-- Images: frontend merges slug → bundled assets until you upload to Storage.

insert into public.collections (slug, title, season, tagline, description, sort_order)
values (
  'aw26',
  'Autumn / Winter 26',
  'AW26',
  'The Shape of Form',
  'Exploring the boundaries between structure and fluidity. A capsule of outerwear, suiting, and foundation pieces in charcoal, slate, and neutral black.',
  0
)
on conflict (slug) do update set
  title = excluded.title,
  season = excluded.season,
  tagline = excluded.tagline,
  description = excluded.description;

insert into public.products (
  slug, name, price_aud, category, collection_slug,
  description, story, details, sizes, featured,
  cj_product_id, cj_variant_id, cj_sku
) values
(
  'oversized-charcoal-blazer',
  'The Oversized Charcoal Blazer',
  450,
  'Outerwear',
  'aw26',
  'A relaxed-shoulder blazer cut from brushed Italian wool. Designed to drape rather than constrain — the defining piece of the AW26 silhouette.',
  'We began AW26 with a single question: what if structure could feel weightless? The Oversized Charcoal Blazer borrows from classic menswear proportions but removes the internal canvas, letting the shoulder fall naturally.',
  '["100% brushed Italian wool","Relaxed shoulder, single-button closure","Fully lined in cupro","Dry clean only","Made in Portugal"]'::jsonb,
  '["XS","S","M","L","XL"]'::jsonb,
  true,
  null, null, null
),
(
  'unstructured-slate-trench',
  'Unstructured Slate Trench',
  680,
  'Outerwear',
  'aw26',
  'A fluid trench without shoulder padding. Water-resistant cotton blend in cool slate grey.',
  'The trench reimagined for movement. No epaulettes, no rigidity — only a clean belted line and a storm flap that actually functions in Melbourne weather.',
  '["Cotton-nylon blend, water-resistant finish","Unstructured shoulder","Removable belt","Hidden side pockets"]'::jsonb,
  '["XS","S","M","L","XL"]'::jsonb,
  false,
  null, null, null
),
(
  'wide-leg-suit-trousers',
  'Wide-Leg Suit Trousers',
  320,
  'Bottoms',
  'aw26',
  'High-rise wide leg in charcoal wool suiting. Pressed crease optional — we prefer it broken in.',
  'Built to sit at the natural waist and fall in a clean column. Pair with the Charcoal Blazer for a full suit, or with a white tee for off-duty proportion.',
  '["Wool blend suiting","High rise, zip fly","Side adjusters","Dry clean only"]'::jsonb,
  '["XS","S","M","L","XL"]'::jsonb,
  false,
  null, null, null
),
(
  'chunky-leather-loafers',
  'Chunky Leather Loafers',
  490,
  'Footwear',
  'aw26',
  'Substantial leather loafer with a sculptural sole. Grounds the oversized proportions above.',
  'Footwear as anchor. The chunky sole balances wide-leg trousers and long-line outerwear without tipping into costume.',
  '["Full-grain leather upper","Leather sole with rubber insert","Cushioned insole","Made in Italy"]'::jsonb,
  '["36","37","38","39","40","41","42","43"]'::jsonb,
  false,
  null, null, null
)
on conflict (slug) do update set
  name = excluded.name,
  price_aud = excluded.price_aud,
  category = excluded.category,
  description = excluded.description,
  story = excluded.story,
  details = excluded.details,
  sizes = excluded.sizes,
  featured = excluded.featured;
