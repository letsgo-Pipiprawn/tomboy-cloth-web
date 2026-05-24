import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = ['api', 'server'];
const importPattern =
  /from\s+['"](\.{1,2}\/[^'"]+)['"]|import\s+['"](\.{1,2}\/[^'"]+)['"]/g;

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];

  for (const entry of entries) {
    const next = path.join(dir, entry);
    const stats = statSync(next);
    if (stats.isDirectory()) {
      files.push(...walk(next));
    } else if (next.endsWith('.ts')) {
      files.push(next);
    }
  }

  return files;
}

const offenders = [];

for (const target of targets) {
  const targetDir = path.join(root, target);
  for (const file of walk(targetDir)) {
    const source = readFileSync(file, 'utf8');
    for (const match of source.matchAll(importPattern)) {
      const specifier = match[1] ?? match[2];
      if (!specifier || /\.[a-z]+$/i.test(specifier)) continue;
      offenders.push({
        file: path.relative(root, file),
        specifier,
      });
    }
  }
}

if (offenders.length) {
  console.error('Relative ESM imports in api/server must include file extensions:');
  for (const offender of offenders) {
    console.error(`- ${offender.file}: ${offender.specifier}`);
  }
  process.exit(1);
}

console.log('All api/server relative imports include explicit file extensions.');
