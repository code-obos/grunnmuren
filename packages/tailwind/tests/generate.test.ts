import { describe, expect, test } from 'vitest';

import { CONTRAST_PAIRS, contrastRatio } from '../theme/contrast.mjs';
import { buildTheme, generateRole } from '../theme/index.mjs';
import colors from '../tokens/colors.json' with { type: 'json' };

const VARIANTS = colors.roles[0].groups.flatMap(({ tokens }) =>
  tokens.map(({ path }) => path.split('.')[1]),
);

// One role's pairs by variant, `text-default` on `background-default`
const PAIRS = CONTRAST_PAIRS.filter(({ foreground }) => foreground.startsWith('primary.')).map(
  (pair) => ({
    ...pair,
    foreground: pair.foreground.split('.')[1],
    background: pair.background.split('.')[1],
  }),
);

// Grunnmuren's own, the edges of the colour wheel, the extremes of lightness and grey
const COLORS = [
  '#0047BA',
  '#008761',
  '#C0385D',
  '#E8A74A',
  '#2D3A26',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#00FFFF',
  '#FF00FF',
  '#FFFFFF',
  '#000000',
  '#333333',
  '#F5E6C8',
];

describe('generateRole', () => {
  test('returns every variant a role has', () => {
    expect(Object.keys(generateRole('#2d3a26'))).toEqual(VARIANTS);
  });

  test.for(COLORS)('%s holds every contrast pair', (color) => {
    const role = generateRole(color);
    const failing = PAIRS.filter(
      ({ foreground, background, minimum }) =>
        contrastRatio(role[foreground], role[background]) < minimum,
    );
    expect(failing).toEqual([]);
  });

  test('a colour already at the target lightness comes back as base-default', () => {
    expect(generateRole('#0047BA')['base-default']).toBe('#0047BA');
  });

  test('a grey stays grey', () => {
    for (const color of Object.values(generateRole('#333333'))) {
      const [red, green, blue] = (color.slice(1).match(/../g) ?? []).map((pair) =>
        Number.parseInt(pair, 16),
      );
      expect(Math.max(red, green, blue) - Math.min(red, green, blue)).toBeLessThanOrEqual(1);
    }
  });

  test('takes rgb() too', () => {
    expect(generateRole('rgb(0 71 186)')).toEqual(generateRole('#0047BA'));
  });

  test('throws on something that is not a colour', () => {
    expect(() => generateRole('blue')).toThrow('Expected a hex or rgb() colour');
  });

  test('builds to a theme without contrast warnings', () => {
    const { errors, contrast } = buildTheme(
      { primary: generateRole('#2d3a26'), accent: generateRole('#8b674b') },
      { name: 'generert' },
    );
    expect(errors).toEqual([]);
    expect(contrast.filter(({ passes }) => !passes)).toEqual([]);
  });
});
