/**
 * Enforces the documentation image budget so the repo stays light without the
 * Sanity CDN's on-the-fly optimisation. Runs in CI and locally.
 *
 * Rules (see apps/docs/CONTRIBUTING.md):
 *   - Format must be .webp (photos/screenshots) or .svg (diagrams/icons).
 *   - WebP files must be ≤ 250 KB and ≤ 2000px wide.
 *
 * Usage: node scripts/lint-images.ts
 */
import { glob, readFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { imageSize } from 'image-size';

const MAX_BYTES = 250 * 1024;
const MAX_WIDTH = 2000;
const ALLOWED = new Set(['.webp', '.svg']);

const here = dirname(fileURLToPath(import.meta.url));
const contentRoot = join(here, '..', 'src', 'content');

const errors: string[] = [];

for await (const file of glob(`${contentRoot}/**/images/**/*.*`)) {
  const ext = extname(file).toLowerCase();
  const rel = relative(contentRoot, file);

  if (!ALLOWED.has(ext)) {
    errors.push(
      `${rel}: unsupported format "${ext}". Use .webp for photos/screenshots or .svg for diagrams.`,
    );
    continue;
  }

  const buffer = await readFile(file);

  if (buffer.byteLength > MAX_BYTES) {
    errors.push(
      `${rel}: ${(buffer.byteLength / 1024).toFixed(0)} KB exceeds the ${MAX_BYTES / 1024} KB budget. Re-export at a lower WebP quality or smaller size.`,
    );
  }

  if (ext === '.webp') {
    const { width } = imageSize(buffer);
    if (width && width > MAX_WIDTH) {
      errors.push(`${rel}: ${width}px wide exceeds the ${MAX_WIDTH}px limit. Downscale it first.`);
    }
  }
}

if (errors.length > 0) {
  console.error(`✗ image lint failed (${errors.length} issue(s)):`);
  for (const error of errors) console.error(`  - ${error}`);
  console.error('\nSee apps/docs/CONTRIBUTING.md for the documentation image guidelines.');
  process.exit(1);
}

console.log('✓ all documentation images are within budget');
