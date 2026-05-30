#!/usr/bin/env node
/**
 * Grade every CJ supplier URL into brand-styled gallery PNGs (one file per source image).
 * Usage: node scripts/brand-stylize-cj-gallery.mjs <slug> <url...>
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const slug = process.argv[2];
const urls = process.argv.slice(3);
if (!slug || !urls.length) {
  console.error('Usage: node scripts/brand-stylize-cj-gallery.mjs <slug> <url...>');
  process.exit(1);
}

const root = path.join(fileURLToPath(new URL('..', import.meta.url)));
const outDir = path.join(root, 'src', 'assets', 'images', 'products', slug, 'supplier-branded');
fs.mkdirSync(outDir, { recursive: true });

const STUDIO_GREY = { r: 232, g: 230, b: 225 };

async function stylize(buf) {
  return sharp(buf)
    .rotate()
    .resize(1600, 1600, { fit: 'inside', background: STUDIO_GREY })
    .flatten({ background: STUDIO_GREY })
    .modulate({ saturation: 0.82, brightness: 1.03 })
    .normalize()
    .linear(1.05, -(128 * 0.05))
    .sharpen({ sigma: 0.6 })
    .png()
    .toBuffer();
}

for (let i = 0; i < urls.length; i++) {
  const res = await fetch(urls[i]);
  if (!res.ok) throw new Error(`Failed ${urls[i]}`);
  const out = await stylize(Buffer.from(await res.arrayBuffer()));
  const name = `gallery-${String(i + 1).padStart(2, '0')}.png`;
  fs.writeFileSync(path.join(outDir, name), out);
  console.log(`Wrote ${name}`);
}
