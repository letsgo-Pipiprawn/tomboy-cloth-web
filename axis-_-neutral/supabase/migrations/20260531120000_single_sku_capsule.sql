-- Single-SKU capsule: keep only Black Double-Breasted Chain Blazer active.

update public.products
set is_active = false, updated_at = now()
where slug <> 'black-double-breasted-chain-blazer-6754';

update public.products
set
  is_active = true,
  featured = true,
  updated_at = now()
where slug = 'black-double-breasted-chain-blazer-6754';
