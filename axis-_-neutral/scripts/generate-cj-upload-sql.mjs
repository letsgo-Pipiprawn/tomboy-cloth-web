import fs from 'node:fs';

const shortlistPath = new URL('../docs/cj_candidate_shortlist.md', import.meta.url);
const outputPath = new URL('../supabase/cj_upload.sql', import.meta.url);

const text = fs.readFileSync(shortlistPath, 'utf8');
const lines = text.split(/\r?\n/).filter((line) => /^\|\s*\d+\s*\|/.test(line));

const rows = lines.map((line) => {
  const parts = line.split('|').map((v) => v.trim());
  return {
    name: parts[4],
    cjId: parts[5],
    usd: Number.parseFloat(parts[6] || '0'),
  };
});

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/women''s|women's|women|men's|men/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 52);
}

function categoryOf(name) {
  const value = name.toLowerCase();
  if (/trouser|pants|cargo/.test(value)) return 'Bottoms';
  if (/shirt|oxford/.test(value)) return 'Tops';
  return 'Outerwear';
}

function retailAud(usd) {
  return Math.min(450, Math.max(260, Math.round((usd || 0) * 10.5)));
}

function escapeSql(input) {
  return String(input).replaceAll("'", "''");
}

const usedSlugs = new Set();
const products = rows.map((row) => {
  let slug = `${slugify(row.name) || 'cj-item'}-${String(row.cjId).toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8)}`;
  while (usedSlugs.has(slug)) slug += 'x';
  usedSlugs.add(slug);

  return {
    slug,
    name: row.name,
    priceAud: retailAud(row.usd),
    category: categoryOf(row.name),
    cjProductId: row.cjId,
  };
});

let sql = '-- Auto-generated from docs/cj_candidate_shortlist.md\n';
sql += "insert into public.collections (slug,title,season,tagline,description,sort_order) values ('aw26','Autumn / Winter 26','AW26','The Shape of Form','Structured outerwear and wide-leg tailoring in neutral black and charcoal.',0) on conflict (slug) do nothing;\n\n";
sql += 'insert into public.products (slug,name,price_aud,category,collection_slug,description,story,details,sizes,featured,cj_product_id,is_active) values\n';
sql += products
  .map(
    (p) =>
      `('${p.slug}','${escapeSql(p.name)}',${p.priceAud},'${p.category}','aw26','Refined neutral piece from the AXIS / NEUTRAL collection.','','[]'::jsonb,'["S","M","L","XL"]'::jsonb,false,'${p.cjProductId}',true)`,
  )
  .join(',\n');
sql += '\n';
sql += "on conflict (slug) do update set name=excluded.name, price_aud=excluded.price_aud, category=excluded.category, description=excluded.description, story=excluded.story, details=excluded.details, sizes=excluded.sizes, cj_product_id=excluded.cj_product_id;\n";

fs.writeFileSync(outputPath, sql);
console.log(`Generated ${products.length} rows -> supabase/cj_upload.sql`);
