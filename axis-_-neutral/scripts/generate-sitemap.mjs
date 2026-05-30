#!/usr/bin/env node
/**
 * Regenerate public/sitemap.xml from local catalog slugs.
 * Usage: node scripts/generate-sitemap.mjs [siteOrigin]
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const origin = (process.argv[2] ?? process.env.VITE_SITE_URL ?? 'https://tomboy-cloth-web.vercel.app').replace(
  /\/$/,
  '',
);

const staticPaths = [
  '/',
  '/collections/all',
  '/collections/aw26',
  '/lookbook',
  '/about',
  '/faq',
  '/policies',
  '/shipping',
  '/returns',
  '/privacy',
  '/terms',
  '/contact',
  '/size-guide',
  '/cart',
  '/account',
];

const productSlugs = [
  'black-loose-zip-hoodie-cardigan-2773343',
  'black-double-breasted-chain-blazer-6754',
  'black-double-breasted-trench-coat-14565116',
  'loose-casual-black-multi-pocket-trousers-17638570',
  'cargo-trousers-with-three-disional-pockets-solid-col-16866555',
  'neploe-new-arrival-high-waist-black-pants-solid-colo-13858804',
  'straight-suit-pants-spring-and-summer-korean-style-h-13854743',
  'summer-new-slim-legs-long-chiffon-wide-leg-pants-kor-b70c95dd',
];

const urls = [
  ...staticPaths.map((p) => ({ loc: `${origin}${p}`, priority: p === '/' ? '1.0' : '0.6' })),
  ...productSlugs.map((slug) => ({
    loc: `${origin}/products/${slug}`,
    priority: '0.8',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url><loc>${u.loc}</loc><changefreq>weekly</changefreq><priority>${u.priority}</priority></url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml);
console.log(`[sitemap] wrote ${urls.length} URLs → public/sitemap.xml`);
