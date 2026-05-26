-- Preorder automation: flip wishlist → preorder + email outbox

alter table public.products
  add column if not exists preorder_opened_at timestamptz;

comment on column public.products.preorder_opened_at is 'When wishlist threshold opened preorder (auto or manual)';

alter table public.wishlist_signups
  add column if not exists preorder_notified_at timestamptz;

create table if not exists public.email_outbox (
  id uuid primary key default gen_random_uuid(),
  to_email text not null,
  subject text not null,
  body text not null,
  template text,
  metadata jsonb not null default '{}'::jsonb,
  status text not null default 'pending'
    check (status in ('pending', 'sent', 'failed')),
  attempts int not null default 0,
  last_error text,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists email_outbox_pending_idx
  on public.email_outbox (status, created_at)
  where status = 'pending';

alter table public.email_outbox enable row level security;

create policy email_outbox_no_public_access
  on public.email_outbox
  for all
  to anon, authenticated
  using (false)
  with check (false);
