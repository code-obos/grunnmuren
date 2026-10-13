import { readdir } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

import { describe, expect, test } from 'vitest';

import { CONTRAST_PAIRS, contrastRatio } from '../theme/contrast.mjs';
import colors from '../tokens/colors.json' with { type: 'json' };
import { loadThemeCustomProperties, resolveToken } from './design-system.ts';

const cssNames = new Map(
  colors.roles.flatMap(({ tokens }) => tokens.map(({ path, name }) => [path, `--${name}`])),
);

const toCssName = (path: string) => {
  const name = cssNames.get(path);
  if (!name) throw new Error(`\`${path}\` isn't a role colour`);
  return name;
};

// The pairs by CSS name, which is what the CSS is resolved by
const pairs = CONTRAST_PAIRS.map((pair) => ({
  ...pair,
  foreground: toCssName(pair.foreground),
  background: toCssName(pair.background),
}));

type ContrastPair = (typeof pairs)[number];

/**
 * Pairs in the token set from AB#140595 that are below the minimum today. They show up in
 * every run, and the test flips to failing the moment one is fixed, so the entry gets
 * removed instead of lingering. Fix the value, don't add to this list to get a build green.
 */
const DEFAULT_VIOLATIONS = [
  // Coal on orange-700, 3.42:1
  '--gm-color-warning-base-contrast-default on --gm-color-warning-base-active',
  // orange-500 on white, 2.09:1. The token file itself notes orange-500 isn't fit for a
  // border, and a button fill needs the same 3:1.
  '--gm-color-warning-base-default on --gm-color-warning-background-default',
  // orange-600 on white, 2.79:1
  '--gm-color-warning-base-hover on --gm-color-warning-background-default',
  // orange-700 as subtle text is under 4.5:1 on every warning surface: 3.69:1 on white,
  // 3.38:1 on yellow-100 and 2.99:1 on orange-100
  '--gm-color-warning-text-subtle on --gm-color-warning-background-default',
  '--gm-color-warning-text-subtle on --gm-color-warning-background-tinted',
  '--gm-color-warning-text-subtle on --gm-color-warning-surface-default',
  '--gm-color-warning-text-subtle on --gm-color-warning-surface-tinted',
  // Found when hover and active surfaces and base-contrast-subtle joined the pairs, to
  // match what Designsystemet promises. orange-700 on orange-100, 2.99:1
  '--gm-color-warning-text-subtle on --gm-color-warning-surface-hover',
  '--gm-color-warning-text-subtle on --gm-color-warning-surface-active',
  // mint-200 on green-500, 4.03:1
  '--gm-color-success-base-contrast-subtle on --gm-color-success-base-default',
  // Coal on orange-700, 3.42:1, like base-contrast-default above
  '--gm-color-warning-base-contrast-subtle on --gm-color-warning-base-active',
];

/**
 * The same, per theme. A theme only lists what it adds: the defaults' violations carry
 * over for every role it doesn't set.
 */
const THEME_VIOLATIONS: Record<string, Array<string>> = {
  'froen-hage': [
    // beige-900 on beige-300, 3.64:1. Muted text on their section colour, which the
    // design team's own file says not to do
    '--gm-color-neutral-text-subtle on --gm-color-neutral-background-tinted',
    // The same beige-900 on beige-300, as the pressed surface, 3.64:1
    '--gm-color-neutral-text-subtle on --gm-color-neutral-surface-active',
    '--gm-color-primary-text-subtle on --gm-color-primary-surface-active',
    // Brown on beige-100 hovered, 4.22:1, and on beige-200 pressed, 3.49:1
    '--gm-color-accent-text-default on --gm-color-accent-surface-hover',
    '--gm-color-accent-text-default on --gm-color-accent-surface-active',
  ],
};

const violationsIn = (theme: string) =>
  new Set([...DEFAULT_VIOLATIONS, ...(THEME_VIOLATIONS[theme] ?? [])]);

const label = ({ foreground, background }: ContrastPair) => `${foreground} on ${background}`;

// Every theme is held to the same rules as the defaults. A theme only changes primitives,
// so this is where a brand colour that's too light shows up, before any component uses it.
const THEMES_DIR = resolve(import.meta.dirname, '../tokens/themes');
const themes = [
  { name: 'default', overrides: new Map<string, string>() },
  ...(await Promise.all(
    (
      await readdir(THEMES_DIR)
    )
      // The folder also has the themes' colours as data, for the docs
      .filter((file) => file.endsWith('.css'))
      .map(async (file) => {
        const name = basename(file, '.css');
        return { name, overrides: await loadThemeCustomProperties(name) };
      }),
  )),
];

const ratioFor = async ({ foreground, background }: ContrastPair, overrides: Map<string, string>) =>
  contrastRatio(
    await resolveToken(foreground, overrides),
    await resolveToken(background, overrides),
  );

for (const { name, overrides } of themes) {
  const violations = violationsIn(name);
  const passingPairs = pairs.filter((pair) => !violations.has(label(pair)));
  const violatingPairs = pairs.filter((pair) => violations.has(label(pair)));

  describe(`contrast in ${name}`, () => {
    test.for(passingPairs)('$foreground on $background ($rule)', async (pair) => {
      expect(await ratioFor(pair, overrides)).toBeGreaterThanOrEqual(pair.minimum);
    });

    for (const pair of violatingPairs) {
      test.fails(`${label(pair)} (${pair.rule}, known violation)`, async () => {
        expect(await ratioFor(pair, overrides)).toBeGreaterThanOrEqual(pair.minimum);
      });
    }
  });
}

describe('contrast', () => {
  test('every known violation is a pair that is actually checked', () => {
    const checked = new Set(pairs.map(label));
    const known = [...DEFAULT_VIOLATIONS, ...Object.values(THEME_VIOLATIONS).flat()];
    expect(known.filter((violation) => !checked.has(violation))).toEqual([]);
  });

  test('the checked pairs match the snapshot', () => {
    expect(pairs.map((pair) => `${label(pair)} >= ${pair.minimum}`)).toMatchSnapshot();
  });
});
