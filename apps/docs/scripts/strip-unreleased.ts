/**
 * Flips `componentState: unreleased` to its first post-release state for
 * every migrated component MDX. Wired into the root `ci:version` script so
 * the changesets "Version Packages" PR contains both the npm version bump
 * and the frontmatter rewrite — when that PR merges, the component goes
 * live on npm and immediately appears in the docs nav.
 *
 * Grunnmuren lifecycle: unreleased → beta → new → stable → deprecated
 *
 * Which post-release state to land in is determined by whether any of the
 * component's documented exports is also an `UNSAFE_`-prefixed export from
 * `@obosbbl/grunnmuren-react`:
 *   - matches → `beta`
 *   - otherwise → `new`
 *
 * The Grunnmuren UNSAFE_ set is read directly from packages/react/src to
 * avoid false positives from RAC's own UNSAFE_ exports that may show up in
 * propsComponents via the auto-generated component-props.ts.
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
const reactSrc = join(here, '..', '..', '..', 'packages', 'react', 'src');

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---\n/;
const UNRELEASED_LINE_RE = /^componentState:\s*unreleased\s*$/m;
const PROPS_BLOCK_RE = /^propsComponents:\s*\n((?:[ \t]+-\s+.*\n?)+)/m;
const PROPS_ITEM_RE = /^\s+-\s+["']?(\w+)/gm;

const EXPORT_DECL_RE =
  /^\s*export\s+(?:const|function|class|interface|type|let|enum)\s+(UNSAFE_\w+)/gm;
const EXPORT_BLOCK_RE = /^\s*export\s+\{([^}]+)\}/gm;

/** Names of every `UNSAFE_`-prefixed export from packages/react/src. */
async function collectGrunnmurenUnsafeExports(): Promise<Set<string>> {
  const names = new Set<string>();
  for await (const file of glob(`${reactSrc}/**/*.{ts,tsx}`)) {
    const source = await readFile(file, 'utf8');
    for (const match of source.matchAll(EXPORT_DECL_RE)) {
      names.add(match[1]);
    }
    for (const block of source.matchAll(EXPORT_BLOCK_RE)) {
      for (const item of block[1].split(',')) {
        const parts = item.split(/\bas\b/);
        const name = (parts.at(-1) ?? '').trim();
        if (name.startsWith('UNSAFE_')) {
          names.add(name);
        }
      }
    }
  }
  return names;
}

function nextState(frontmatter: string, unsafeExports: Set<string>): 'beta' | 'new' {
  const propsBlock = frontmatter.match(PROPS_BLOCK_RE);
  if (!propsBlock) {
    return 'new';
  }
  const names = [...propsBlock[1].matchAll(PROPS_ITEM_RE)].map((m) => m[1]);
  if (names.some((name) => unsafeExports.has(name))) {
    return 'beta';
  }
  return 'new';
}

const unsafeExports = await collectGrunnmurenUnsafeExports();
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

  const state = nextState(frontmatter, unsafeExports);
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
