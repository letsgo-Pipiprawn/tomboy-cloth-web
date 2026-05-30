-- Deactivate off-brand rows from first auto-discover pass
update public.products set is_active = false, updated_at = now()
where slug in (
  '2pcs-black-striped-knitted-suit-summer-17947406',
  'trousers-loose-oversized-track-pants-spring-25101407',
  'black-washed-jeans-hip-hop-loose-17029394',
  'high-waist-hip-hop-black-loose-16065338',
  'american-heavy-washed-black-and-gray-25040703',
  'black-shiny-rhinestone-blazer-pants-suit-18609292',
  'black-velvet-bow-jacket-wide-leg-18551649',
  'black-bandeau-sling-top-high-waist-25062706',
  'black-formal-blazer-work-suit-14533346',
  'black-slim-fit-embroidered-lettering-blazer-14908925',
  'loose-leisure-slimming-black-blazer-for-25061307',
  'solid-long-black-jacket-and-blazer-70fa7cf4',
  'classic-rhinestone-chain-black-blazer-for-16648880',
  'black-cape-blazer-suit-with-cropped-19837789',
  'plus-size-thick-black-american-loose-fitting-14619674',
  'top-quality-loose-mid-knitted-elegant-14101358',
  'loose-black-wide-leg-mop-trousers-17865724',
  'black-suit-pants-light-luxury-advanced-24070702',
  'cross-border-versatile-black-suit-wide-leg-sickl-25082107',
  'black-and-white-contrast-cow-pattern-14217424',
  'high-waist-drooping-straight-mopping-pants-17910212'
);
