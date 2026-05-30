#!/usr/bin/env node
/**
 * Download CJ supplier images and apply AXIS / NEUTRAL studio grade
 * (cool grey tone, desaturated, lifted shadows — brand-safe ecommerce look).
 *
 * Usage:
 *   node scripts/brand-stylize-cj-images.mjs <slug> <url1> <url2> ...
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const slug = process.argv[2];
const urls = process.argv.slice(3);

if (!slug || !urls.length) {
  console.error('Usage: node scripts/brand-stylize-cj-images.mjs <slug> <url...>');
  process.exit(1);
}

const root = path.join(fileURLToPath(new URL('..', import.meta.url)));
const outDir = path.join(root, 'src', 'assets', 'images', 'products', slug);
const rawDir = path.join(root, 'tmp', 'supplier-raw', slug);

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(rawDir, { recursive: true });

const STUDIO_GREY = { r: 232, g: 230, b: 225 };

async function download(url, index) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = url.includes('.png') ? 'png' : 'jpg';
  const rawPath = path.join(rawDir, `${String(index).padStart(2, '0')}-raw.${ext}`);
  fs.writeFileSync(rawPath, buf);
  return buf;
}

/** Brand grade: neutral palette, soft contrast, grey studio feel. */
async function stylize(input, size = 1400) {
  const base = sharp(input).rotate().resize(size, size, {
    fit: 'inside',
    withoutEnlargement: false,
    background: STUDIO_GREY,
  });

  const { data, info } = await base
    .flatten({ background: STUDIO_GREY })
    .modulate({ saturation: 0.82, brightness: 1.03 })
    .normalize()
    .linear(1.05, -(128 * 0.05))
    .sharpen({ sigma: 0.6 })
    .png()
    .toBuffer({ resolveWithObject: true });

  const pad = Math.max(info.width, info.height, size);
  return sharp(data)
    .extend({
      top: Math.floor((pad - info.height) / 2),
      bottom: Math.ceil((pad - info.height) / 2),
      left: Math.floor((pad - info.width) / 2),
      right: Math.ceil((pad - info.width) / 2),
      background: STUDIO_GREY,
    })
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer();
}

async function cropDetail(input, region) {
  const meta = await sharp(input).metadata();
  const w = meta.width ?? 1000;
  const h = meta.height ?? 1000;
  const left = Math.round(w * region.left);
  const top = Math.round(h * region.top);
  const width = Math.round(w * region.width);
  const height = Math.round(h * region.height);
  return sharp(input)
    .extract({ left, top, width: Math.min(width, w - left), height: Math.min(height, h - top) })
    .resize(1200, 1200, { fit: 'cover', position: 'centre', background: STUDIO_GREY })
    .png()
    .toBuffer();
}

const outputs = [
  { file: '01-flatlay-white.png', pick: 0, crop: null },
  { file: '02-detail-zip.png', pick: 0, crop: { left: 0.35, top: 0.2, width: 0.35, height: 0.45 } },
  { file: '03-detail-hood.png', pick: 0, crop: { left: 0.2, top: 0, width: 0.6, height: 0.35 } },
  { file: '04-detail-cuff.png', pick: 0, crop: { left: 0.05, top: 0.55, width: 0.35, height: 0.35 } },
  { file: '05-detail-pocket.png', pick: 1, crop: { left: 0.25, top: 0.35, width: 0.5, height: 0.45 } },
  { file: '06-detail-fabric.png', pick: 0, crop: { left: 0.3, top: 0.4, width: 0.4, height: 0.35 } },
  { file: '07-model-cover-front.png', pick: 2, crop: null, modelSize: 1600 },
];

const raws = [];
for (let i = 0; i < urls.length; i++) {
  raws.push(await download(urls[i], i));
  await new Promise((r) => setTimeout(r, 200));
}

for (const spec of outputs) {
  const source = raws[Math.min(spec.pick, raws.length - 1)];
  let buf;
  if (spec.crop) {
    buf = await cropDetail(source, spec.crop);
    buf = await stylize(buf, spec.modelSize ?? 1200);
  } else {
    buf = await stylize(source, spec.modelSize ?? 1400);
  }
  fs.writeFileSync(path.join(outDir, spec.file), buf);
  console.log(`Wrote ${spec.file}`);
}

console.log(`Done -> ${outDir}`);
