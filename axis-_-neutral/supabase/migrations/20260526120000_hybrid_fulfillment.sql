-- Hybrid catalog: wishlist / preorder / in_stock + waitlist signups

create type public.product_fulfillment_type as enum ('in_stock', 'preorder', 'wishlist');
create type public.product_supply_source as enum ('cj', 'domestic_1688', 'odm');

alter table public.products
  add column if not exists fulfillment_type public.product_fulfillment_type not null default 'in_stock',
  add column if not exists supply_source public.product_supply_source not null default 'cj',
  add column if not exists compare_at_price_aud numeric(10, 2),
  add column if not exists preorder_discount_percent int not null default 30
    check (preorder_discount_percent >= 0 and preorder_discount_percent <= 50),
  add column if not exists ships_in_weeks int not null default 4
    check (ships_in_weeks >= 1 and ships_in_weeks <= 12),
  add column if not exists wishlist_goal int not null default 40
    check (wishlist_goal >= 1),
  add column if not exists wishlist_opens_at timestamptz,
  add column if not exists supplier_ref text;

comment on column public.products.fulfillment_type is 'in_stock=CJ ready; preorder=domestic batch; wishlist=waitlist only';
comment on column public.products.supply_source is 'cj | domestic_1688 | odm';
comment on column public.products.supplier_ref is 'e.g. 1688 item no. 6754';

create table if not exists public.wishlist_signups (
  id uuid primary key default gen_random_uuid(),
  product_slug text not null references public.products (slug) on update cascade on delete cascade,
  email text not null,
  size_preference text,
  source text,
  created_at timestamptz not null default now()
);

create index if not exists wishlist_signups_product_slug_idx on public.wishlist_signups (product_slug);
create unique index if not exists wishlist_signups_product_email_uidx
  on public.wishlist_signups (product_slug, lower(email));

alter table public.wishlist_signups enable row level security;

-- Public insert for waitlist (anon key)
create policy wishlist_signups_insert_anon
  on public.wishlist_signups
  for insert
  to anon, authenticated
  with check (true);

-- No public read (counts via service role / future RPC)
create policy wishlist_signups_no_public_select
  on public.wishlist_signups
  for select
  to anon, authenticated
  using (false);

-- Tier 1 hero: 1688 double-breasted blazer (wishlist)
insert into public.products (
  slug,
  name,
  price_aud,
  compare_at_price_aud,
  category,
  collection_slug,
  description,
  story,
  details,
  sizes,
  featured,
  is_active,
  fulfillment_type,
  supply_source,
  supplier_ref,
  wishlist_goal,
  ships_in_weeks,
  preorder_discount_percent
) values (
  'black-double-breasted-chain-blazer-6754',
  'Black Double-Breasted Chain Blazer',
  199,
  285,
  'Outerwear',
  'aw26',
  'Oversize double-breasted blazer in matte black with a clean lapel and metal chain accent — structured shoulder, city pace.',
  'Sized for an androgynous drape; order by shoulder first. Chain detail is optional styling — wear open over a bare tee or layered knit.',
  '["Colour · Black","Silhouette · Double-breasted blazer","Accent · Metal chain","Fabric · Polyester suiting (supplier spec)","Care · Dry clean recommended"]'::jsonb,
  '["S","M","L","XL"]'::jsonb,
  true,
  true,
  'wishlist',
  'domestic_1688',
  '6754',
  40,
  4,
  30
)
on conflict (slug) do update set
  name = excluded.name,
  price_aud = excluded.price_aud,
  compare_at_price_aud = excluded.compare_at_price_aud,
  description = excluded.description,
  story = excluded.story,
  details = excluded.details,
  fulfillment_type = excluded.fulfillment_type,
  supply_source = excluded.supply_source,
  supplier_ref = excluded.supplier_ref,
  wishlist_goal = excluded.wishlist_goal,
  featured = excluded.featured,
  updated_at = now();
