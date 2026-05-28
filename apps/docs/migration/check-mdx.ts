/**
 * Compiles every MDX file under src/content with the same remark pipeline the
 * app uses, to catch broken content before it reaches the dev server or a
 * deploy. Intended for local use and CI.
 *
 * Usage: node migration/check-mdx.ts
 */
import { readFile } from 'node:fs/promises';
import { glob } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { compile } from '@mdx-js/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

import { remarkCodeBlocks } from '../src/lib/mdx/remark-code-blocks.ts';
import { remarkHeadings } from '../src/lib/mdx/remark-headings.ts';

const here = dirname(fileURLToPath(import.meta.url));
const contentRoot = join(here, '..', 'src', 'content');

const remarkPlugins = [
  remarkFrontmatter,
  [remarkMdxFrontmatter, { name: 'frontmatter' }],
  remarkGfm,
  remarkCodeBlocks,
  remarkHeadings,
];

let failures = 0;
let checked = 0;

for await (const file of glob(`${contentRoot}/**/*.mdx`)) {
  const source = await readFile(file, 'utf8');
  try {
    // @ts-expect-error remark plugin tuple typing is loose here
    await compile(source, { remarkPlugins, jsx: true });
    checked += 1;
  } catch (error) {
    failures += 1;
    console.error(`✗ ${relative(contentRoot, file)}\n  ${(error as Error).message}\n`);
  }
}

console.log(`Checked ${checked} MDX file(s), ${failures} failure(s).`);
if (failures > 0) {
  process.exit(1);
}
