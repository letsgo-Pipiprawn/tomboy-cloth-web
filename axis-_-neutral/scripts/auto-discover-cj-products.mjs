/**
 * Pipeline A — auto-discover CJ products, filter by AXIS / NEUTRAL rules, upsert to Supabase.
 *
 * Usage:
 *   node scripts/auto-discover-cj-products.mjs [--count=30] [--apply] [--dry-run]
 *
 * Requires: CJ_API_KEY in .env.local
 * Apply:    npx supabase db query --linked -f supabase/cj_auto_discover.sql
 *            (or SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY for REST upsert)
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const TARGET_COUNT = Number.parseInt(
  process.argv.find((a) => a.startsWith('--count='))?.split('=')[1] ?? '30',
  10,
);
const APPLY = process.argv.includes('--apply');
const DRY_RUN = process.argv.includes('--dry-run');

const KEYWORDS = [
  'black wide leg trouser',
  'black cargo pants women',
  'black loose trousers',
  'charcoal wide leg pants',
  'black suit pants',
  'black blazer women',
  'black structured jacket',
  'black oversize shirt',
  'slate grey trousers',
  'black straight leg pants',
  'black high waist pants',
  'black trench coat',
];

const NEUTRAL_NAME_PATTERN =
  /\b(black|white|grey|gray|charcoal|slate|neutral|solid)\b/i;

const BLOCKED_NAME_PATTERN =
  /\b(plaid|striped|stripe|camouflage|camo|cow pattern|pu leather|faux leather|faux lambswool|jogger|track pants|sports|harajuku|hip-?hop|punk|paint|splatter|ink spot|korean fashion|denim|jeans|embroidery|embroidered|rhinestone|velvet bow|bandeau|sling top|washed|feet pants|skinny|legging|yoga|gym|neon|pink|red|blue|green|yellow|orange|purple|brown|beige|khaki|olive|navy|2pcs|knitted suit|cross-border|american|mop|mopping|top quality|light luxury|leisure slimming|cape blazer|shiny|contrast cow)\b/i;

const GOOD_SILHOUETTE_PATTERN =
  /\b(wide[\s-]?leg|loose|oversized|oversize|straight[\s-]?leg|cargo|blazer|trench|structured|high[\s-]?waist|multi[\s-]?pocket)\b/i;

const CJ_BASE = 'https://developers.cjdropshipping.com';
const RATE_MS = 1200;

function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    const p = path.join(ROOT, file);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!m || process.env[m[1]]) continue;
      process.env[m[1]] = m[2].trim();
    }
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function escapeSql(value) {
  return String(value).replaceAll("'", "''");
}

function slugify(input, pid) {
  const base = input
    .toLowerCase()
    .replace(/\b(women's|women|men's|men|ladies)\b/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  const suffix = String(pid).toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8);
  return `${base || 'cj-item'}-${suffix}`;
}

function parsePriceUsd(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value !== 'string') return 0;
  const first = value.split('-')[0]?.trim();
  const n = Number.parseFloat(first);
  return Number.isFinite(n) ? n : 0;
}

function retailAud(usd) {
  return Math.min(450, Math.max(89, Math.round((usd || 0) * 10.5)));
}

function categoryOf(name) {
  const v = name.toLowerCase();
  if (/trouser|pants|cargo/.test(v)) return 'Bottoms';
  if (/shirt|oxford|top|hoodie|tee|blouse/.test(v)) return 'Tops';
  return 'Outerwear';
}

function brandName(raw) {
  let n = raw
    .replace(
      /\b(women's|women|men's|men|ladies|office|fashion|trendy|korean|style|new|hot|2024|2025|2026|casual|personality|national|retro|streetwear|brand[s]?)\b/gi,
      ' ',
    )
    .replace(/\s+/g, ' ')
    .trim();

  const words = n.split(' ').filter(Boolean).slice(0, 6);
  return words
    .map((w) => {
      if (/^(and|or|the|for|with|in|on|of|a|an)$/i.test(w)) return w.toLowerCase();
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(' ')
    .replace(/\b(Black|White|Grey|Gray|Charcoal|Slate)\b/i, (m) => m.charAt(0).toUpperCase() + m.slice(1).toLowerCase());
}

function passesHardFilter(name) {
  if (!name || name.length < 8) return false;
  if (BLOCKED_NAME_PATTERN.test(name)) return false;
  if (!NEUTRAL_NAME_PATTERN.test(name)) return false;
  return true;
}

function scoreCandidate(item) {
  let score = 0;
  const name = item.nameEn || '';
  if (NEUTRAL_NAME_PATTERN.test(name)) score += 30;
  if (GOOD_SILHOUETTE_PATTERN.test(name)) score += 25;
  if (/\bblack\b/i.test(name)) score += 15;
  const listed = Number(item.listedNum) || 0;
  if (listed >= 20) score += 10;
  else if (listed >= 5) score += 5;
  const inv = Number(item.warehouseInventoryNum) || 0;
  if (inv > 100) score += 10;
  const usd = parsePriceUsd(item.sellPrice);
  if (usd >= 3 && usd <= 35) score += 10;
  return score;
}

function parseImageList(data) {
  if (Array.isArray(data.productImageSet) && data.productImageSet.length) {
    return data.productImageSet.filter((x) => typeof x === 'string' && x);
  }
  if (typeof data.productImage === 'string') {
    try {
      const parsed = JSON.parse(data.productImage);
      if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === 'string' && x);
    } catch {
      /* ignore */
    }
  }
  if (data.bigImage && typeof data.bigImage === 'string') return [data.bigImage];
  return [];
}

function pickBlackVariant(variants) {
  if (!Array.isArray(variants) || !variants.length) return null;
  const black = variants.find((v) => {
    const key = `${v.variantKey || ''} ${v.variantNameEn || ''}`.toLowerCase();
    return /\bblack\b/.test(key);
  });
  return black || variants[0];
}

function extractSizes(variants) {
  const sizes = new Set();
  const order = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
  for (const v of variants || []) {
    const key = String(v.variantKey || v.variantNameEn || '');
    for (const s of order) {
      if (new RegExp(`\\b${s}\\b`, 'i').test(key)) sizes.add(s);
    }
  }
  if (sizes.size) return order.filter((s) => sizes.has(s));
  return ['S', 'M', 'L', 'XL'];
}

function buildDetails(name, variant) {
  const color = /\bblack\b/i.test(name) ? 'Black' : 'Neutral';
  const silhouette = GOOD_SILHOUETTE_PATTERN.exec(name)?.[0] || 'Relaxed';
  return [
    `Colour · ${color}`,
    `Silhouette · ${silhouette}`,
    'Source · CJ Dropshipping',
    variant?.variantSku ? `SKU · ${variant.variantSku}` : 'SKU · Pending',
    'Care · Cold wash gentle, dry flat',
  ];
}

async function getCjToken(apiKey) {
  const res = await fetch(`${CJ_BASE}/api2.0/v1/authentication/getAccessToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey }),
  });
  const json = await res.json();
  const token = json?.data?.accessToken;
  if (!token) throw new Error(`CJ auth failed: ${JSON.stringify(json)}`);
  return token;
}

async function searchListV2(token, keyword, page) {
  const params = new URLSearchParams({
    page: String(page),
    size: '50',
    keyWord: keyword,
    orderBy: '4',
    sort: 'desc',
  });
  const res = await fetch(`${CJ_BASE}/api2.0/v1/product/listV2?${params}`, {
    headers: { 'CJ-Access-Token': token },
  });
  const json = await res.json();
  if (json.code !== 200) return [];

  const content = json.data?.content || [];
  const items = [];
  for (const block of content) {
    for (const p of block.productList || []) {
      items.push({
        pid: p.id,
        nameEn: p.nameEn,
        sellPrice: p.sellPrice,
        bigImage: p.bigImage,
        listedNum: p.listedNum,
        warehouseInventoryNum: p.warehouseInventoryNum,
        sku: p.sku,
      });
    }
  }
  return items;
}

async function queryProduct(token, pid) {
  const res = await fetch(
    `${CJ_BASE}/api2.0/v1/product/query?pid=${encodeURIComponent(pid)}&countryCode=CN`,
    { headers: { 'CJ-Access-Token': token } },
  );
  const json = await res.json();
  if (json.code !== 200 || !json.data) return null;
  return json.data;
}

function flattenListItems(pages) {
  const byId = new Map();
  for (const item of pages) {
    if (!item.pid || byId.has(item.pid)) continue;
    if (!passesHardFilter(item.nameEn || '')) continue;
    byId.set(item.pid, { ...item, score: scoreCandidate(item) });
  }
  return [...byId.values()].sort((a, b) => b.score - a.score);
}

function buildSql(products) {
  let sql = `-- Auto-generated by scripts/auto-discover-cj-products.mjs at ${new Date().toISOString()}\n`;
  sql += `-- ${products.length} products\n\n`;
  sql += `insert into public.collections (slug, title, season, tagline, description, sort_order)
values (
  'aw26',
  'Autumn / Winter 26',
  'AW26',
  'The Shape of Form',
  'CJ auto-discovered assortment for AXIS / NEUTRAL',
  0
)
on conflict (slug) do nothing;\n\n`;

  sql += `insert into public.products (
  slug, name, price_aud, category, collection_slug,
  image_url, images, description, story, details, sizes,
  featured, cj_product_id, cj_variant_id, cj_sku,
  logistic_name, from_country_code, fulfillment_type, supply_source,
  is_active
) values\n`;

  sql += products
    .map((p) => {
      const imagesJson = JSON.stringify(p.images);
      const detailsJson = JSON.stringify(p.details);
      const sizesJson = JSON.stringify(p.sizes);
      return `(
  '${escapeSql(p.slug)}',
  '${escapeSql(p.name)}',
  ${p.priceAud},
  '${escapeSql(p.category)}',
  'aw26',
  '${escapeSql(p.imageUrl)}',
  '${escapeSql(imagesJson)}'::jsonb,
  '${escapeSql(p.description)}',
  '${escapeSql(p.story)}',
  '${escapeSql(detailsJson)}'::jsonb,
  '${escapeSql(sizesJson)}'::jsonb,
  false,
  '${escapeSql(p.cjProductId)}',
  '${escapeSql(p.cjVariantId)}',
  '${escapeSql(p.cjSku)}',
  '${escapeSql(p.logisticName)}',
  '${escapeSql(p.fromCountryCode)}',
  'in_stock',
  'cj',
  true
)`;
    })
    .join(',\n');

  sql += `\non conflict (slug) do update set
  name = excluded.name,
  price_aud = excluded.price_aud,
  category = excluded.category,
  image_url = excluded.image_url,
  images = excluded.images,
  description = excluded.description,
  story = excluded.story,
  details = excluded.details,
  sizes = excluded.sizes,
  cj_product_id = excluded.cj_product_id,
  cj_variant_id = excluded.cj_variant_id,
  cj_sku = excluded.cj_sku,
  logistic_name = excluded.logistic_name,
  from_country_code = excluded.from_country_code,
  fulfillment_type = excluded.fulfillment_type,
  supply_source = excluded.supply_source,
  updated_at = now();\n`;

  return sql;
}

function writeShortlistReport(products) {
  const lines = [
    '# CJ 自动找品报告',
    '',
    `> 生成时间：${new Date().toISOString()} · 共 ${products.length} 款`,
    '',
    '| # | slug | 品牌名 | CJ ID | 成本 USD | 售价 AUD | 评分 |',
    '|---|---|---|---|---:|---:|---:|',
  ];
  products.forEach((p, i) => {
    lines.push(
      `| ${i + 1} | ${p.slug} | ${p.name} | ${p.cjProductId} | ${p.costUsd.toFixed(2)} | ${p.priceAud} | ${p.score} |`,
    );
  });
  lines.push('', '---', '', '下一步：品牌 7 图包 → `npm run brand-stylize-cj -- {slug} <urls>`');
  const out = path.join(ROOT, 'docs', 'cj_auto_discover_report.md');
  fs.writeFileSync(out, lines.join('\n') + '\n', 'utf8');
  return out;
}

function updateStorefrontCapsule(slugs) {
  const file = path.join(ROOT, 'src', 'data', 'storefrontCapsule.ts');
  const slugEntries = [...slugs].sort().map((s) => `  '${s}',`).join('\n');
  const content = `/**
 * Active storefront SKUs — keep in sync with catalogCuration.ts
 * Auto-updated by scripts/auto-discover-cj-products.mjs
 */
export const STOREFRONT_CAPSULE_SLUGS = new Set<string>([
${slugEntries}
]);

export function requiresBrandImagePack(slug: string): boolean {
  return STOREFRONT_CAPSULE_SLUGS.has(slug);
}
`;
  fs.writeFileSync(file, content, 'utf8');
}

async function upsertViaRest(products) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || key.includes('your_')) return false;

  for (const p of products) {
    const row = {
      slug: p.slug,
      name: p.name,
      price_aud: p.priceAud,
      category: p.category,
      collection_slug: 'aw26',
      image_url: p.imageUrl,
      images: p.images,
      description: p.description,
      story: p.story,
      details: p.details,
      sizes: p.sizes,
      featured: false,
      cj_product_id: p.cjProductId,
      cj_variant_id: p.cjVariantId,
      cj_sku: p.cjSku,
      logistic_name: p.logisticName,
      from_country_code: p.fromCountryCode,
      fulfillment_type: 'in_stock',
      supply_source: 'cj',
      is_active: true,
    };

    const res = await fetch(`${url}/rest/v1/products?on_conflict=slug`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Supabase upsert failed for ${p.slug}: ${res.status} ${text}`);
    }
  }
  return true;
}

function runSupabaseQueryFile(sqlFilePath) {
  const absPath = path.resolve(sqlFilePath);
  try {
    return execSync(`npx supabase db query --linked -f "${absPath}"`, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    });
  } catch (err) {
    return `${err.stdout || ''}\n${err.stderr || ''}\n${err.message || ''}`;
  }
}

function fetchExistingCjProductIds() {
  const tmp = path.join(ROOT, 'supabase', '_existing_cj_ids.sql');
  fs.writeFileSync(tmp, 'select cj_product_id from public.products where cj_product_id is not null;\n', 'utf8');
  const output = runSupabaseQueryFile(tmp);
  const ids = new Set();
  for (const m of output.matchAll(/"cj_product_id":\s*"([^"]+)"/g)) ids.add(m[1]);
  return ids;
}

function fetchActiveSlugs() {
  const tmp = path.join(ROOT, 'supabase', '_active_slugs.sql');
  fs.writeFileSync(tmp, 'select slug from public.products where is_active = true order by slug;\n', 'utf8');
  const output = runSupabaseQueryFile(tmp);
  const slugs = [];
  for (const m of output.matchAll(/"slug":\s*"([^"]+)"/g)) slugs.push(m[1]);
  return slugs;
}

function applyViaSupabaseCli(sqlPath) {
  const output = runSupabaseQueryFile(sqlPath);
  if (/failed to read SQL file|error/i.test(output) && !/"rows"/.test(output)) {
    console.error('[cj-discover] Supabase CLI apply failed');
    console.error(output.slice(-600));
    return false;
  }
  return true;
}

async function main() {
  loadEnv();
  const apiKey = process.env.CJ_API_KEY;
  if (!apiKey) throw new Error('CJ_API_KEY missing in .env.local');

  console.log(`[cj-discover] Target: ${TARGET_COUNT} products`);
  const token = await getCjToken(apiKey);

  console.log('[cj-discover] Searching CJ catalog…');
  const existingIds = fetchExistingCjProductIds();
  if (existingIds.size) {
    console.log(`[cj-discover] Skipping ${existingIds.size} existing CJ product IDs in DB`);
  }
  const allListItems = [];
  for (const keyword of KEYWORDS) {
    for (let page = 1; page <= 2; page++) {
      await sleep(400);
      const items = await searchListV2(token, keyword, page);
      allListItems.push(...items);
      if (!items.length) break;
    }
  }

  const candidates = flattenListItems(allListItems);
  console.log(`[cj-discover] ${candidates.length} candidates after brand filter`);

  const products = [];
  const usedSlugs = new Set();

  for (const candidate of candidates) {
    if (products.length >= TARGET_COUNT) break;
    if (existingIds.has(String(candidate.pid))) continue;
    await sleep(RATE_MS);

    const detail = await queryProduct(token, candidate.pid);
    if (!detail) continue;

    const nameEn = detail.productNameEn || candidate.nameEn || '';
    if (!passesHardFilter(nameEn)) continue;

    const variants = detail.variants || [];
    const variant = pickBlackVariant(variants);
    if (!variant?.vid) continue;

    const costUsd = parsePriceUsd(variant.variantSellPrice ?? detail.sellPrice ?? candidate.sellPrice);
    if (costUsd < 2 || costUsd > 40) continue;

    const images = parseImageList(detail);
    if (!images.length && candidate.bigImage) images.push(candidate.bigImage);
    if (!images.length) continue;

    let slug = slugify(brandName(nameEn), candidate.pid);
    while (usedSlugs.has(slug)) slug += 'x';
    usedSlugs.add(slug);

    const name = brandName(nameEn);
    const category = categoryOf(nameEn);
    const sizes = extractSizes(variants);
    const details = buildDetails(nameEn, variant);

    products.push({
      slug,
      name,
      priceAud: retailAud(costUsd),
      costUsd,
      category,
      imageUrl: images[0],
      images,
      description: `${name} — structured neutral piece from the AXIS / NEUTRAL collection.`,
      story: 'Relaxed androgynous proportion for city layering. Fit note pending final try-on.',
      details,
      sizes,
      cjProductId: String(detail.pid || candidate.pid),
      cjVariantId: String(variant.vid),
      cjSku: String(variant.variantSku || detail.productSku || candidate.sku || ''),
      logisticName: process.env.CJ_DEFAULT_LOGISTIC_NAME || 'CJPacket',
      fromCountryCode: process.env.CJ_DEFAULT_FROM_COUNTRY_CODE || 'CN',
      score: candidate.score,
    });
  }

  if (!products.length) throw new Error('No products passed discovery pipeline');
  console.log(`[cj-discover] Prepared ${products.length} products for upload`);

  const sql = buildSql(products);
  const sqlPath = path.join(ROOT, 'supabase', 'cj_auto_discover.sql');
  fs.writeFileSync(sqlPath, sql, 'utf8');
  console.log(`[cj-discover] SQL → ${path.relative(ROOT, sqlPath)}`);

  const reportPath = writeShortlistReport(products);
  console.log(`[cj-discover] Report → ${path.relative(ROOT, reportPath)}`);

  if (DRY_RUN) {
    console.log('[cj-discover] Dry run — skipping DB apply');
    return;
  }

  let applied = false;
  if (APPLY) {
    applied = await upsertViaRest(products);
    if (!applied) {
      console.log('[cj-discover] REST upsert unavailable — applying via Supabase CLI…');
      applied = applyViaSupabaseCli(sqlPath);
    }
  } else {
    console.log('[cj-discover] Pass --apply to write to Supabase');
  }

  if (applied) {
    const slugs = fetchActiveSlugs();
    if (slugs.length) {
      updateStorefrontCapsule(slugs);
      console.log(`[cj-discover] Updated storefrontCapsule.ts (${slugs.length} active slugs)`);
    }
  }

  console.log('[cj-discover] Done.');
  products.slice(0, 5).forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.name} (${p.slug}) — AUD ${p.priceAud}`);
  });
  if (products.length > 5) console.log(`  … and ${products.length - 5} more`);
}

main().catch((err) => {
  console.error('[cj-discover]', err.message || err);
  process.exit(1);
});
