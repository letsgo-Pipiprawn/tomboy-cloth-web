#!/usr/bin/env node
/**
 * Validate standard 7-file product image set for a SKU slug.
 * Usage: node scripts/check-product-image-set.mjs <slug>
 *        npm run check:product-images -- <slug>
 */
import { existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const productsRoot = join(root, 'src/assets/images/products');

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: npm run check:product-images -- <slug>');
  process.exit(1);
}

const dir = join(productsRoot, slug);
if (!existsSync(dir)) {
  console.error(`FAIL: missing folder ${dir}`);
  process.exit(1);
}

const files = readdirSync(dir);
const required = [
  { pattern: /^01-flatlay-white\.png$/i, label: '01 flat lay' },
  { pattern: /^02-detail-.+\.png$/i, label: '02 detail' },
  { pattern: /^03-detail-.+\.png$/i, label: '03 detail' },
  { pattern: /^04-detail-.+\.png$/i, label: '04 detail' },
  { pattern: /^05-detail-.+\.png$/i, label: '05 detail' },
  { pattern: /^06-detail-.+\.png$/i, label: '06 detail' },
  { pattern: /^07-model-cover-front\.png$/i, label: '07 model cover' },
];

const missing = [];
for (const req of required) {
  if (!files.some((f) => req.pattern.test(f))) {
    missing.push(req.label);
  }
}

if (!files.some((f) => /^README\.md$/i.test(f))) {
  missing.push('README.md');
}

if (missing.length) {
  console.error(`FAIL ${slug}: missing ${missing.join(', ')}`);
  console.error(`Folder: ${dir}`);
  process.exit(1);
}

console.log(`OK ${slug}: standard 7-file image set present`);
process.exit(0);
