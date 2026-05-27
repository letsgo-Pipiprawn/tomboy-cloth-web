-- Seed AW26 collection metadata only.
-- Product catalog: run supabase/cj_upload.sql + cj_curation_deactivate.sql + hybrid_fulfillment migration.
-- Do NOT seed fictional demo SKUs (Portugal blazer, Italy loafers, etc.).

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

-- Retire legacy placeholder products if they were seeded earlier.
update public.products
set is_active = false, updated_at = now()
where slug in (
  'oversized-charcoal-blazer',
  'unstructured-slate-trench',
  'wide-leg-suit-trousers',
  'chunky-leather-loafers'
);
