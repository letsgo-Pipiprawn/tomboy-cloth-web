/**
 * Active storefront SKUs — keep in sync with catalogCuration.ts
 * Auto-updated by scripts/auto-discover-cj-products.mjs
 */
export const STOREFRONT_CAPSULE_SLUGS = new Set<string>([
  'black-3d-tailored-wide-leg-cropped-pants-20171220',
  'black-gradient-high-waist-wide-leg-17696014',
  'black-high-waist-straight-loose-suit-13560692',
  'black-lace-stitching-wide-leg-pants-25091102',
  'black-leggings-high-waist-slimming-tight-13734549',
  'black-loose-drooping-straight-suit-pants-25101610',
  'black-printed-high-waisted-abdomen-hip-wide-leg--14514349',
  'black-profile-blazer-for-25053105',
  'black-solid-color-t-shirt-loose-oversize-14810857',
  'black-straight-leg-draping-cropped-loose-fit-pan-25121203',
  'black-straight-waist-wide-leg-trawl-17267753',
  'black-suit-draping-wide-leg-pants-25012212',
  'black-suit-pants-wide-leg-pants-straight-25010709',
  'elastic-leggings-outer-wear-high-waist-13847488',
  'high-waist-slim-black-suit-pants-13721086',
  'high-waist-slit-thin-loose-black-13971893',
  'high-waist-street-hipster-temperament-commuter-16133712',
  'japanese-dark-black-graffiti-straight-wide-15999671',
  'loose-black-multi-pocket-trousers-17638570',
  'loose-straight-black-trousers-25091902',
  'self-made-high-quality-elastic-black-high-13854697',
  'shiying-black-square-collar-smocking-pleated-16434950',
  'slim-fit-four-season-black-straight-leg-slim-you-25120201',
  'straight-suit-pants-spring-and-summer-13854743',
  'summer-short-sleeve-black-jumpsuit-woman-13898299',
  'summer-slim-legs-long-chiffon-wide-b70c95dd',
  'two-button-black-loose-fitting-wide-leg-pants-15050750',
  'wide-leg-long-pants-black-professional-14856676',
  'wide-leg-pants-high-waist-drape-14399066',
  'workwear-multi-pocket-straight-leg-pants-black-d-24092400',
]);

export function requiresBrandImagePack(slug: string): boolean {
  return STOREFRONT_CAPSULE_SLUGS.has(slug);
}
