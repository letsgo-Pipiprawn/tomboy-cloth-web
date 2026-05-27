/**
 * Fetch 1688 offer page images and emit SQL + supplierImages snippet for Tier1 hero.
 *
 * Usage:
 *   node scripts/backfill-1688-images.mjs "https://detail.1688.com/offer/XXXXXXXX.html"
 *
 * Uses the mobile offer page (m.1688.com) because desktop often redirects to captcha.
 */
import fs from 'node:fs';

const inputUrl = process.argv[2];
const offerMatch = inputUrl?.match(/1688\.com\/offer\/(\d+)\.html/i);
if (!offerMatch) {
  console.error('Usage: node scripts/backfill-1688-images.mjs "https://detail.1688.com/offer/XXXXXXXX.html"');
  process.exit(1);
}

const offerId = offerMatch[1];
const offerUrl = `https://detail.1688.com/offer/${offerId}.html`;
const fetchUrl = `https://m.1688.com/offer/${offerId}.html`;
const slug =
  readEnvValue('HERO_6754_SLUG') ?? 'black-double-breasted-chain-blazer-6754';

function readEnvValue(key) {
  const envPath = new URL('../.env.local', import.meta.url);
  if (!fs.existsSync(envPath)) return null;
  const line = fs
    .readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .find((l) => l.startsWith(`${key}=`));
  return line ? line.slice(key.length + 1).trim() : null;
}

function uniqueUrls(urls) {
  const seen = new Set();
  return urls.filter((url) => {
    if (!url || seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}

function normalizeImageUrl(raw) {
  if (!raw) return null;
  let url = raw.replace(/\\u002F/g, '/').replace(/\\\//g, '/');
  if (url.startsWith('//')) url = `https:${url}`;
  if (!/^https?:\/\//i.test(url)) return null;
  if (!/alicdn\.com/i.test(url)) return null;
  if (/icon|logo|avatar|sprite|empty/i.test(url)) return null;
  return url.split('?')[0];
}

function extractImages(html) {
  const found = [];
  for (const match of html.matchAll(/https?:[^"'\\\s]+alicdn\.com[^"'\\\s]+\.(?:jpg|jpeg|png|webp)/gi)) {
    const normalized = normalizeImageUrl(match[0]);
    if (normalized) found.push(normalized);
  }
  return uniqueUrls(found).slice(0, 8);
}

function sqlQuote(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

const response = await fetch(fetchUrl, {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    Accept: 'text/html,application/xhtml+xml',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    Referer: 'https://m.1688.com/',
  },
});

if (!response.ok) {
  throw new Error(`1688 fetch failed (${response.status}). Try again or paste image URLs manually.`);
}

const html = await response.text();
const images = extractImages(html);

if (!images.length) {
  throw new Error(
    'No alicdn.com images found (1688 may have rate-limited this IP). Re-run later or paste image URLs manually.',
  );
}

const primary = images[0];
const jsonb = JSON.stringify(images);

console.log(`Found ${images.length} supplier images for ${slug}\n`);
console.log('--- supplierImages.ts snippet ---');
console.log(`  '${slug}': {`);
console.log(`    hero: ${JSON.stringify(primary)},`);
console.log(`    gallery: ${JSON.stringify(images, null, 6).replace(/^/gm, '    ')},`);
console.log(`  },\n`);

console.log('--- supabase SQL ---');
console.log(
  `update public.products set supplier_ref = ${sqlQuote(offerUrl)}, image_url = ${sqlQuote(primary)}, images = ${sqlQuote(jsonb)}::jsonb, updated_at = now() where slug = ${sqlQuote(slug)};`,
);
