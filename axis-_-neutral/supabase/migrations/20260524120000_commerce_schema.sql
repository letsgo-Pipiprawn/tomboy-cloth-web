-- AXIS / NEUTRAL commerce schema (Stripe + CJ automation ready)
-- Apply in Supabase Dashboard → SQL Editor, or via: supabase db push

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Collections
-- ---------------------------------------------------------------------------
create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  season text not null,
  tagline text,
  description text,
  hero_image_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Products (CJ mapping columns nullable until you link SKUs)
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  price_aud numeric(10, 2) not null check (price_aud >= 0),
  category text not null,
  collection_slug text not null references public.collections (slug) on update cascade,
  image_url text,
  images jsonb not null default '[]'::jsonb,
  description text not null default '',
  story text not null default '',
  details jsonb not null default '[]'::jsonb,
  sizes jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  cj_product_id text,
  cj_variant_id text,
  cj_sku text,
  logistic_name text,
  from_country_code text default 'CN',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_collection_slug_idx on public.products (collection_slug);
create index if not exists products_active_idx on public.products (is_active) where is_active = true;

-- ---------------------------------------------------------------------------
-- Orders (written by Stripe webhook / API — service role only)
-- ---------------------------------------------------------------------------
create type public.order_status as enum (
  'pending',
  'paid',
  'cj_submitted',
  'cj_failed',
  'shipped',
  'cancelled',
  'refunded'
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  status public.order_status not null default 'pending',
  customer_email text,
  shipping_address jsonb,
  subtotal_aud numeric(10, 2) not null default 0,
  shipping_aud numeric(10, 2) not null default 0,
  total_aud numeric(10, 2) not null default 0,
  currency text not null default 'AUD',
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  cj_order_id text,
  cj_error text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_stripe_session_idx on public.orders (stripe_checkout_session_id);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  slug text not null,
  name text not null,
  size text not null,
  quantity int not null default 1 check (quantity > 0),
  unit_price_aud numeric(10, 2) not null,
  cj_product_id text,
  cj_variant_id text,
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

-- ---------------------------------------------------------------------------
-- CJ fulfillment retry queue
-- ---------------------------------------------------------------------------
create type public.fulfillment_status as enum (
  'pending',
  'processing',
  'completed',
  'failed'
);

create table if not exists public.fulfillment_jobs (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  status public.fulfillment_status not null default 'pending',
  attempts int not null default 0,
  max_attempts int not null default 5,
  last_error text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists fulfillment_jobs_pending_idx
  on public.fulfillment_jobs (status)
  where status in ('pending', 'failed');

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists collections_updated_at on public.collections;
create trigger collections_updated_at
  before update on public.collections
  for each row execute function public.set_updated_at();

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

drop trigger if exists fulfillment_jobs_updated_at on public.fulfillment_jobs;
create trigger fulfillment_jobs_updated_at
  before update on public.fulfillment_jobs
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.collections enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.fulfillment_jobs enable row level security;

-- Public read: active catalog only
drop policy if exists "collections_public_read" on public.collections;
create policy "collections_public_read"
  on public.collections for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products for select
  to anon, authenticated
  using (is_active = true);

-- Orders: no public API access (use service role in Vercel API / webhooks)
-- No policies for anon/authenticated on orders, order_items, fulfillment_jobs
