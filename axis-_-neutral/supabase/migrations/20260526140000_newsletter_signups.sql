-- Drop notes / newsletter list (footer + marketing)

create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text,
  created_at timestamptz not null default now()
);

create unique index if not exists newsletter_signups_email_uidx
  on public.newsletter_signups (lower(email));

alter table public.newsletter_signups enable row level security;

-- Inserts handled via service role API (no direct anon insert needed)
create policy newsletter_signups_no_public_access
  on public.newsletter_signups
  for all
  to anon, authenticated
  using (false)
  with check (false);
