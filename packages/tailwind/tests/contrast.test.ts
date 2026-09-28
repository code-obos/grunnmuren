import { describe, expect, test } from 'vitest';

import { contrastRatio } from './contrast.ts';
import { loadRootCustomProperties, resolveToken } from './design-system.ts';

const ROLES = ['primary', 'accent', 'neutral', 'success', 'danger', 'warning', 'info'];

// The page itself. Status roles don't declare a background of their own, since an alert
// sits on whatever the page is.
const PAGE = '--gm-white';

type ContrastRule = {
  name: string;
  minimum: number;
  foregrounds: Array<string>;
  backgrounds: Array<string>;
};

const CONTRAST_RULES: Array<ContrastRule> = [
  // WCAG 2.2 AA 1.4.3
  {
    name: 'text on surface',
    minimum: 4.5,
    foregrounds: ['text-default', 'text-subtle'],
    backgrounds: ['background-default', 'background-tinted', 'surface-default', 'surface-tinted'],
  },
  {
    name: 'text in button',
    minimum: 4.5,
    foregrounds: ['base-contrast-default'],
    backgrounds: ['base-default', 'base-hover', 'base-active'],
  },
  // WCAG 2.2 AA 1.4.11
  // Every state, since a hovered or pressed button has to stand out from the page too
  {
    name: 'button on page',
    minimum: 3,
    foregrounds: ['base-default', 'base-hover', 'base-active'],
    backgrounds: [PAGE],
  },
  {
    name: 'graphics on page',
    minimum: 3,
    foregrounds: ['border-default', 'border-strong'],
    backgrounds: [PAGE],
  },
];

/**
 * Pairs in the token set from AB#140595 that are below the minimum today. They show up in
 * every run, and the test flips to failing the moment one is fixed, so the entry gets
 * removed instead of lingering. Fix the value, don't add to this list to get a build green.
 */
const KNOWN_VIOLATIONS = new Set([
  // Coal on orange-700, 3.42:1
  '--gm-color-warning-base-contrast-default on --gm-color-warning-base-active',
  // orange-500 on white, 2.09:1. The token file itself notes orange-500 isn't fit for a
  // border, and a button fill needs the same 3:1.
  '--gm-color-warning-base-default on --gm-white',
  // orange-600 on white, 2.79:1
  '--gm-color-warning-base-hover on --gm-white',
]);

type ContrastPair = { rule: string; minimum: number; foreground: string; background: string };

const toToken = (role: string, name: string) =>
  name.startsWith('--') ? name : `--gm-color-${role}-${name}`;

const label = ({ foreground, background }: ContrastPair) => `${foreground} on ${background}`;

const rootProperties = await loadRootCustomProperties();

// Status roles only declare some of the 16 roles, so pairs are built from what exists.
// The snapshot below is what keeps a token disappearing from silently dropping its pair.
const contrastPairs = ROLES.flatMap((role) =>
  CONTRAST_RULES.flatMap(({ name, minimum, foregrounds, backgrounds }) =>
    foregrounds.flatMap((foreground) =>
      backgrounds.map(
        (background): ContrastPair => ({
          rule: name,
          minimum,
          foreground: toToken(role, foreground),
          background: toToken(role, background),
        }),
      ),
    ),
  ),
).filter(
  ({ foreground, background }) => rootProperties.has(foreground) && rootProperties.has(background),
);

const passingPairs = contrastPairs.filter((pair) => !KNOWN_VIOLATIONS.has(label(pair)));
const violatingPairs = contrastPairs.filter((pair) => KNOWN_VIOLATIONS.has(label(pair)));

const ratioFor = async ({ foreground, background }: ContrastPair) =>
  contrastRatio(await resolveToken(foreground), await resolveToken(background));

describe('contrast', () => {
  test.for(passingPairs)('$foreground on $background ($rule)', async (pair) => {
    expect(await ratioFor(pair)).toBeGreaterThanOrEqual(pair.minimum);
  });

  for (const pair of violatingPairs) {
    test.fails(`${label(pair)} (${pair.rule}, known violation)`, async () => {
      expect(await ratioFor(pair)).toBeGreaterThanOrEqual(pair.minimum);
    });
  }

  test('every known violation is a pair that is actually checked', () => {
    const checked = new Set(contrastPairs.map(label));
    expect([...KNOWN_VIOLATIONS].filter((violation) => !checked.has(violation))).toEqual([]);
  });

  test('the checked pairs match the snapshot', () => {
    expect(contrastPairs.map((pair) => `${label(pair)} >= ${pair.minimum}`)).toMatchSnapshot();
  });
});
