-- One-off: remove fictional AW26 demo SKUs from the live storefront.
-- Safe to re-run.

update public.products
set
  is_active = false,
  image_url = null,
  images = '[]'::jsonb,
  updated_at = now()
where slug in (
  'oversized-charcoal-blazer',
  'unstructured-slate-trench',
  'wide-leg-suit-trousers',
  'chunky-leather-loafers'
);
