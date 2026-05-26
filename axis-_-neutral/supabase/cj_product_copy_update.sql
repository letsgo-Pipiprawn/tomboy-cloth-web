-- Premium product copy — replaces CJ supplier placeholder text on active capsule SKUs.
-- Run: npx supabase db query --linked -f supabase/cj_product_copy_update.sql

update public.products set
  name = 'Black Multi-Pocket Cargo Trouser',
  description = 'Relaxed wide-leg cargo in solid black with utility pocketing and a clean city-line drape.',
  story = 'Cut with a high rise and generous leg. Size down if you prefer a closer waist; take your usual size for the intended oversized tomboy proportion.',
  details = '["Colour · Black","Composition · Cotton blend twill","Rise · High rise","Leg · Wide straight with cargo volume","Closure · Zip fly, button waist","Pockets · Multi-pocket utility layout","Care · Cold machine wash · Line dry · Cool iron"]'::jsonb,
  updated_at = now()
where slug = 'loose-casual-black-multi-pocket-trousers-17638570';

update public.products set
  name = 'Solid Utility Cargo Trouser',
  description = 'Structured cargo trouser in a matte solid finish — dimensional pockets, no print, no noise.',
  story = 'Straight relaxed leg with room through the thigh. Designed to sit at the natural waist with a column silhouette.',
  details = '["Colour · Solid black / charcoal","Composition · Cotton-poly utility weave","Rise · Mid–high rise","Leg · Relaxed straight","Pockets · Three-dimensional cargo pockets","Care · Cold wash · Do not bleach · Line dry"]'::jsonb,
  updated_at = now()
where slug = 'cargo-trousers-with-three-disional-pockets-solid-col-16866555';

update public.products set
  name = 'High-Rise Black Trouser',
  description = 'Minimal black trouser with a defined high waist and clean leg — foundation piece for suiting or solo wear.',
  story = 'Slim-straight through the leg with structure at the waist. For an androgynous drape, size up one.',
  details = '["Colour · Black","Composition · Polyester-viscose suiting blend","Rise · High rise","Leg · Slim straight","Closure · Concealed zip · Hook bar","Care · Dry clean recommended · Cool iron"]'::jsonb,
  updated_at = now()
where slug = 'neploe-new-arrival-high-waist-black-pants-solid-colo-13858804';

update public.products set
  name = 'Oversized Black Coat',
  description = 'Long-line outer layer in deep black with a soft hand-feel and dropped shoulder — city weight without bulk.',
  story = 'Intentionally oversized. Take your usual size for a generous coat; size down for a closer layer over tailoring.',
  details = '["Colour · Black","Composition · Polyester fleece with faux shearling hand-feel","Length · Long line · Below hip","Shoulder · Dropped, unstructured","Lining · Fully lined","Care · Dry clean only"]'::jsonb,
  updated_at = now()
where slug = 'faux-lambswool-oversized-jacket-coat-winter-black-wa-d1134fb0';

update public.products set
  name = 'Black Formal Blazer',
  description = 'Single-breasted black blazer with a sharp lapel and relaxed office-to-street shoulder.',
  story = 'Tailored block with room through the body. Size to shoulder width first; body ease is part of the tomboy proportion.',
  details = '["Colour · Black","Composition · Polyester-viscose suiting","Shoulder · Soft structured","Lapel · Notched · Single breasted","Lining · Fully lined","Care · Dry clean only"]'::jsonb,
  updated_at = now()
where slug = 'office-ladies-black-formal-blazer-work-suit-14533346';

update public.products set
  name = 'Long-Line Black Blazer',
  description = 'Extended black blazer with an asymmetrical line and notched collar — editorial length, everyday wear.',
  story = 'Longer hem than a classic blazer. Best worn open or single-button closed for a vertical silhouette.',
  details = '["Colour · Black","Composition · Suiting blend","Length · Long line · Hip covering","Collar · Notched lapel","Closure · Single button","Care · Dry clean recommended"]'::jsonb,
  updated_at = now()
where slug = 'solid-long-style-black-jacket-and-blazer-female-notc-70fa7cf4';

update public.products set
  name = 'Relaxed Black Suit Jacket',
  description = 'Loose black suit jacket with a calm shoulder and minimal detailing — structure without stiffness.',
  story = 'Relaxed fit through the chest and waist. Designed for layering over a tee or fine knit.',
  details = '["Colour · Black","Composition · Polyester-viscose suiting","Fit · Relaxed · Unstructured","Lapel · Notched","Lining · Lined","Care · Dry clean only"]'::jsonb,
  updated_at = now()
where slug = 'black-suit-jacket-sense-of-design-niche-autumn-loose-14300765';

update public.products set
  name = 'Black Suit Trouser',
  description = 'Pressed black suit trouser with a high waist and clean cigarette line — sharp enough for work, calm enough for off-duty.',
  story = 'Cropped-nine length on most heights. High rise sits at the natural waist; check inseam against size chart.',
  details = '["Colour · Black","Composition · Suiting blend","Rise · High rise","Leg · Straight · Cropped length","Closure · Zip fly · Hook bar","Care · Dry clean recommended"]'::jsonb,
  updated_at = now()
where slug = 'straight-suit-pants-spring-and-summer-korean-style-h-13854743';

update public.products set
  name = 'Wide-Leg Black Trouser',
  description = 'Fluid wide-leg trouser in black with a soft drape — movement-first tailoring for warm city days.',
  story = 'Lightweight hand with a full leg. Size to waist measurement; refer to flat chart for length.',
  details = '["Colour · Black","Composition · Lightweight woven poly blend","Rise · High rise","Leg · Wide leg · Full length","Hand-feel · Soft drape","Care · Cold gentle wash · Line dry · Low iron"]'::jsonb,
  updated_at = now()
where slug = 'summer-new-slim-legs-long-chiffon-wide-leg-pants-kor-b70c95dd';

update public.products set
  description = 'Refined neutral piece from the AXIS / NEUTRAL collection.',
  story = '',
  details = '[]'::jsonb,
  updated_at = now()
where description ilike '%cj sourced%'
   or story ilike '%cj import%'
   or details::text ilike '%cj sourced%';
