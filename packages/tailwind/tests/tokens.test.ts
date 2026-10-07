import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, test } from 'vitest';

import {
  findBrokenTokenReferences,
  loadRootCustomProperties,
  formatDeclarations,
  getGrunnmurenTokens,
  loadThemeCustomProperties,
  resolveToken,
  resolveUtility,
} from './design-system.ts';
import { legacyPalette } from './legacy-palette.ts';
import { utilityPairs, type UtilityPair } from './utility-pairs.ts';

type MappedPair = UtilityPair & { to: string };

const isMapped = (pair: UtilityPair): pair is MappedPair => pair.to != null;

const mappedPairs = utilityPairs.filter(isMapped);
const renamedPairs = mappedPairs.filter((pair) => pair.change == null);
const changedPairs = mappedPairs.filter((pair) => pair.change != null);
const pendingPairs = utilityPairs.filter((pair) => !isMapped(pair));

const declarationsFor = async (candidate: string) =>
  formatDeclarations(await resolveUtility(candidate));

describe('utility parity', () => {
  test.for(renamedPairs)('$from computes the same as $to', async ({ from, to }) => {
    expect(await declarationsFor(from)).toEqual(await declarationsFor(to));
  });

  test.for(changedPairs)('$from differs from $to: $change', async ({ from, to }) => {
    expect(await declarationsFor(from)).not.toEqual(await declarationsFor(to));
  });

  // The pairs are the point of the file, so the ones still waiting on a token show up
  // in the run instead of only living in a comment.
  // oxlint-disable-next-line vitest/warn-todo
  for (const { from, change } of pendingPairs) test.todo(`${from} -> ? (${change})`);

  // A candidate that doesn't compile resolves to nothing, which would make the
  // assertions above pass against an empty list. `resolveUtility` throws instead.
  test('a utility that does not exist throws', async () => {
    await expect(resolveUtility('bg-not-a-real-color')).rejects.toThrow(
      'does not compile to anything',
    );
  });

  // Variants that only touch the selector would otherwise collapse into the same
  // declarations, so a pair with the wrong variant on `to` would pass as a rename
  test('variants that only change the selector are kept apart', async () => {
    expect(await declarationsFor('hover:bg-blue')).not.toEqual(
      await declarationsFor('focus-visible:bg-blue'),
    );
  });
});

describe('computed values', () => {
  // Snapshotting what the utilities compile to today is what turns a token change
  // into a reviewable diff instead of a silently different button.
  test.for(utilityPairs)('$from', async ({ from }) => {
    expect(await declarationsFor(from)).toMatchSnapshot();
  });

  test('the token set matches the snapshot', async () => {
    expect(await getGrunnmurenTokens()).toMatchSnapshot();
  });

  test('no token points at a token that does not exist', async () => {
    expect(await findBrokenTokenReferences()).toEqual([]);
  });
});

// The full role tokens, and the short ones `data-color` points at a role
const ROLE_TOKEN =
  /^--color-((primary|accent|neutral|success|danger|warning|info)-)?(background|surface|border|text|base)-/;

describe('ported primitives', () => {
  test.for(Object.entries(legacyPalette))('%s survives as %s', async ([legacy, primitive]) => {
    expect(await resolveToken(primitive)).toBe(await resolveToken(legacy));
  });

  // Otherwise a colour added to the palette later would never get checked above
  test('every colour in the palette is accounted for', async () => {
    const palette = Object.keys(await getGrunnmurenTokens()).filter(
      (token) => token.startsWith('--color-') && !ROLE_TOKEN.test(token),
    );
    expect(palette.toSorted()).toEqual(Object.keys(legacyPalette).toSorted());
  });
});

const SHORT_COLOR_TOKEN = /^--color-(background|surface|border|text|base)-/;
const shortColors = Object.keys(await getGrunnmurenTokens())
  .filter((token) => SHORT_COLOR_TOKEN.test(token))
  .map((token) => token.replace('--color-', ''));

describe('theme seam', () => {
  // Without data-color the short tokens are primary, so a component written against
  // them looks the same as one written against primary today
  test.for(shortColors)('bg-%s is primary without data-color', async (name) => {
    expect(await declarationsFor(`bg-${name}`)).toEqual(
      await declarationsFor(`bg-primary-${name}`),
    );
  });

  // The contrast run checks every theme, which proves nothing if the theme never got
  // as far as the roles. The short tokens are worked out from the roles on the same
  // element, so they have to pick the theme up too.
  test('a theme reaches the roles and the short tokens', async () => {
    const froenHage = await loadThemeCustomProperties('froen-hage');
    expect(await resolveToken('--gm-color-primary-base-default', froenHage)).toBe('#2d3a26');
    expect(await resolveToken('--gm-color-base-default', froenHage)).toBe('#2d3a26');
  });

  // Reduced motion is one of the things a theme must not be able to turn off, and an app's
  // own theme never goes through our build. So the block itself has to win: on every
  // [data-theme], where a theme sets its durations, and over a theme that comes later.
  test('reduced motion wins over any theme', async () => {
    const css = await readFile(resolve(import.meta.dirname, '../tokens/motion.css'), 'utf8');
    const reducedMotion = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
    const durations = [...(await loadRootCustomProperties()).keys()].filter((token) =>
      token.startsWith('--gm-duration-'),
    );

    expect(reducedMotion).toMatch(/:root,\s*\[data-theme\]\s*\{/);
    expect(durations.length).toBeGreaterThan(0);
    for (const duration of durations) {
      expect(reducedMotion).toContain(`${duration}: 0.01ms !important;`);
    }
  });
});

const TYPE_UTILITIES = [
  'heading-xl',
  'heading-l',
  'heading-m',
  'heading-s',
  'heading-xs',
  'lead',
  'lead-sm',
];

describe('typography', () => {
  // The headings and leads scale with the viewport through the clamp() tokens, instead of
  // jumping at lg. The snapshot is what turns a change in the type scale into a diff.
  test.for(TYPE_UTILITIES)('%s', async (utility) => {
    expect(await declarationsFor(utility)).toMatchSnapshot();
  });

  test.for(TYPE_UTILITIES)('%s has no breakpoint step', async (utility) => {
    const declarations = await resolveUtility(utility);
    expect(declarations.filter(({ condition }) => condition !== '')).toEqual([]);
  });
});
