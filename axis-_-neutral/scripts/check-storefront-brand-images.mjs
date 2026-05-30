#!/usr/bin/env node
/**
 * Fail if any capsule SKU is missing the committed 01–07 brand pack.
 * Prevents shipping storefront that falls back to CJ supplier photos.
 *
 * Usage: npm run check:storefront-images
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const capsuleFile = join(root, 'src/data/storefrontCapsule.ts');
const productsRoot = join(root, 'src/assets/images/products');

const text = readFileSync(capsuleFile, 'utf8');
const slugs = [...text.matchAll(/'([a-z0-9-]+)'/g)]
  .map((m) => m[1])
  .filter((s) => s.includes('-'));

const required = [
  /^01-flatlay-white\.png$/i,
  /^02-detail-.+\.png$/i,
  /^03-detail-.+\.png$/i,
  /^04-detail-.+\.png$/i,
  /^05-detail-.+\.png$/i,
  /^06-detail-.+\.png$/i,
  /^07-model-cover-front\.png$/i,
];

let failed = false;
for (const slug of slugs) {
  const dir = join(productsRoot, slug);
  if (!existsSync(dir)) {
    console.error(`FAIL ${slug}: missing folder ${dir}`);
    failed = true;
    continue;
  }
  const files = readdirSync(dir);
  const missing = [];
  for (const pattern of required) {
    if (!files.some((f) => pattern.test(f))) missing.push(pattern.source);
  }
  if (missing.length) {
    console.error(`FAIL ${slug}: missing brand pack (${missing.join(', ')})`);
    console.error(`  Run: npm run brand-stylize-cj -- ${slug} <cj-urls...>`);
    failed = true;
  } else {
    console.log(`OK ${slug}: storefront brand pack ready`);
  }
}

process.exit(failed ? 1 : 0);
