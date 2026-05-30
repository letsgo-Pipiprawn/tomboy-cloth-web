/**
 * Writes CJ URLs to Supabase only — for fulfillment / reference.
 * Storefront PDP uses src/assets/images/products/{slug}/01-07 (see product_image_set_workflow.md).
 */
import fs from 'node:fs';

const shortlistPath = new URL('../docs/cj_candidate_shortlist.md', import.meta.url);
const envPath = new URL('../.env.local', import.meta.url);
const outputSqlPath = new URL('../supabase/cj_backfill_images.sql', import.meta.url);

function readEnvValue(key) {
  if (!fs.existsSync(envPath)) return null;
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  const line = lines.find((l) => l.startsWith(`${key}=`));
  return line ? line.slice(key.length + 1).trim() : null;
}

function parseShortlistIds() {
  const text = fs.readFileSync(shortlistPath, 'utf8');
  const rows = text.split(/\r?\n/).filter((line) => /^\|\s*\d+\s*\|/.test(line));
  return rows
    .map((line) => {
      const parts = line.split('|').map((v) => v.trim());
      return parts[5];
    })
    .filter(Boolean);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseImageList(data) {
  if (Array.isArray(data.productImageSet) && data.productImageSet.length) {
    return data.productImageSet.filter((x) => typeof x === 'string' && x);
  }

  if (typeof data.productImage === 'string') {
    try {
      const parsed = JSON.parse(data.productImage);
      if (Array.isArray(parsed)) {
        return parsed.filter((x) => typeof x === 'string' && x);
      }
    } catch {
      // ignore parse error
    }
  }

  if (data.bigImage && typeof data.bigImage === 'string') {
    return [data.bigImage];
  }

  return [];
}

function sqlQuote(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

async function main() {
  const apiKey = readEnvValue('CJ_API_KEY');
  if (!apiKey) throw new Error('CJ_API_KEY missing in .env.local');

  const ids = parseShortlistIds();
  if (!ids.length) throw new Error('No CJ IDs found in shortlist');

  const authRes = await fetch('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey }),
  });
  const authJson = await authRes.json();
  if (!authRes.ok || !authJson?.data?.accessToken) {
    throw new Error(`CJ auth failed: ${JSON.stringify(authJson)}`);
  }

  const token = authJson.data.accessToken;
  const updates = [];

  for (const id of ids) {
    await sleep(1200);

    const url = `https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${encodeURIComponent(id)}`;
    const res = await fetch(url, { headers: { 'CJ-Access-Token': token } });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json?.data) {
      continue;
    }

    const images = parseImageList(json.data);
    if (!images.length) continue;

    const primary = images[0];
    const jsonb = JSON.stringify(images);
    updates.push(
      `update public.products set image_url = ${sqlQuote(primary)}, images = ${sqlQuote(jsonb)}::jsonb where cj_product_id = ${sqlQuote(id)};`,
    );
  }

  if (!updates.length) {
    throw new Error('No image updates generated');
  }

  const sql = ['-- Auto-generated CJ image backfill', ...updates, ''].join('\n');
  fs.writeFileSync(outputSqlPath, sql, 'utf8');
  console.log(`Generated ${updates.length} image updates -> supabase/cj_backfill_images.sql`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
