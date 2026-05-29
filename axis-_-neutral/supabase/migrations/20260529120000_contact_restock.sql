-- Contact enquiries + back-in-stock signups

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_inquiries_email_idx on public.contact_inquiries (email);

alter table public.contact_inquiries enable row level security;

create table if not exists public.restock_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  product_slug text not null,
  size text not null,
  created_at timestamptz not null default now(),
  unique (email, product_slug, size)
);

create index if not exists restock_signups_slug_idx on public.restock_signups (product_slug);

alter table public.restock_signups enable row level security;
