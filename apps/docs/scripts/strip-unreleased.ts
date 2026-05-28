/**
 * Flips `componentState: unreleased` to its first post-release state for
 * every migrated component MDX. Wired into the root `ci:version` script so
 * the changesets "Version Packages" PR contains both the npm version bump
 * and the frontmatter rewrite — when that PR merges, the component goes
 * live on npm and immediately appears in the docs nav.
 *
 * Grunnmuren lifecycle: unreleased → beta → new → stable → deprecated
 *
 * Which post-release state to land in is determined by whether the component
 * is still `UNSAFE_`-prefixed:
 *   - any `UNSAFE_…` in `propsComponents` → `beta`
 *   - otherwise                            → `new`
 *
 * Idempotent — running again with no unreleased components is a no-op.
 *
 * Usage: node apps/docs/scripts/strip-unreleased.ts
 */
import { glob, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const componentsRoot = join(here, '..', 'src', 'content', 'komponenter');

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---\n/;
const UNRELEASED_LINE_RE = /^componentState:\s*unreleased\s*$/m;
const PROPS_BLOCK_RE = /^propsComponents:\s*\n((?:[ \t]+-\s+.*\n?)+)/m;
const UNSAFE_ITEM_RE = /^\s+-\s+["']?UNSAFE_/m;

/** A component is still beta-grade if any of its documented exports is `UNSAFE_`-prefixed. */
function nextState(frontmatter: string): 'beta' | 'new' {
  const propsBlock = frontmatter.match(PROPS_BLOCK_RE);
  if (propsBlock && UNSAFE_ITEM_RE.test(propsBlock[1])) {
    return 'beta';
  }
  return 'new';
}

let changed = 0;

for await (const file of glob(`${componentsRoot}/*.mdx`)) {
  const original = await readFile(file, 'utf8');
  const match = original.match(FRONTMATTER_RE);
  if (!match) {
    continue;
  }

  const frontmatter = match[1];
  if (!UNRELEASED_LINE_RE.test(frontmatter)) {
    continue;
  }

  const state = nextState(frontmatter);
  const updated = original.replace(
    match[0],
    `---\n${frontmatter.replace(UNRELEASED_LINE_RE, `componentState: ${state}`)}\n---\n`,
  );
  await writeFile(file, updated);
  console.log(`✓ ${relative(componentsRoot, file)}: unreleased → ${state}`);
  changed += 1;
}

if (changed === 0) {
  console.log('No unreleased components to release.');
} else {
  console.log(`Released ${changed} component(s).`);
}
