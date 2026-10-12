import { describe, expect, test } from 'vitest';

import { buildTheme, EXAMPLE_TOKENS } from '../theme/index.mjs';

const build = (tokens: unknown) => buildTheme(tokens, { name: 'nybolig' });

describe('buildTheme', () => {
  test('a partial theme sets exactly the tokens in the file', () => {
    const { css, errors } = build({
      blue: { 900: '#1f2a44' },
      primary: { 'base-default': '#2d3a26', 'base-hover': { $value: 'rgb(36 48 30)' } },
    });

    expect(errors).toEqual([]);
    expect(css).toBe(`[data-theme='nybolig'] {
  --gm-blue-900: #1f2a44;
  --gm-color-primary-base-default: #2d3a26;
  --gm-color-primary-base-hover: rgb(36 48 30);
}
`);
  });

  test('a theme without tokens is valid and sets nothing', () => {
    expect(build({})).toEqual({ css: "[data-theme='nybolig'] {\n}\n", errors: [], contrast: [] });
  });

  test('a reference becomes a var() to the token it points at', () => {
    const { css } = build({ primary: { 'base-hover': '{primary.base-active}' } });
    expect(css).toContain('--gm-color-primary-base-hover: var(--gm-color-primary-base-active);');
  });

  test('a reference to a token the file leaves out resolves through the defaults', () => {
    // base-active isn't in the file. By default it's blue.800, which the file does set.
    const { contrast } = build({
      blue: { 800: '#000000' },
      primary: { 'base-hover': '{primary.base-active}' },
    });

    const hoverOnPage = contrast.find(
      ({ foreground, background }) => foreground === 'primary.base-hover' && background === 'white',
    );
    expect(hoverOnPage?.ratio).toBe(21);
  });

  test('a DTCG colour object is read by its hex', () => {
    const { css } = build({
      primary: { 'base-default': { $value: { colorSpace: 'srgb', hex: '#2d3a26' } } },
    });
    expect(css).toContain('--gm-color-primary-base-default: #2d3a26;');
  });

  test('an unknown token is an error that names the closest one', () => {
    const { css, errors } = build({ primary: { 'base-defualt': '#2d3a26' } });

    expect(css).toBe('');
    expect(errors).toEqual([
      expect.objectContaining({
        code: 'unknown-token',
        path: 'primary.base-defualt',
        suggestion: 'primary.base-default',
      }),
    ]);
  });

  test('a CSS name is pointed to its token', () => {
    const { errors } = build({ '--gm-color-primary-base-default': '#2d3a26' });
    expect(errors[0]?.suggestion).toBe('primary.base-default');
  });

  test('a value that is not a colour is an error', () => {
    const { css, errors } = build({ primary: { 'base-default': 'green' } });

    expect(css).toBe('');
    expect(errors).toEqual([
      expect.objectContaining({ code: 'invalid-color', path: 'primary.base-default' }),
    ]);
  });

  test('a reference to a token that does not exist is an error', () => {
    const { errors } = build({ primary: { 'base-default': '{blue.90}' } });
    expect(errors).toEqual([
      expect.objectContaining({ code: 'unresolved-reference', path: 'primary.base-default' }),
    ]);
  });

  test('a circular reference is an error, through the defaults too', () => {
    // primary.base-default points at blue.900 by default, which points back at it here
    const { css, errors } = build({ blue: { 900: '{primary.base-default}' } });

    expect(css).toBe('');
    expect(errors).toEqual([
      expect.objectContaining({ code: 'circular-reference', path: 'blue.900' }),
    ]);
  });

  test('tokens that are not an object are an error', () => {
    expect(build(['#2d3a26']).errors).toEqual([expect.objectContaining({ code: 'not-an-object' })]);
  });

  test('unreadable primary text is a contrast warning on that pair, not an error', () => {
    const { css, errors, contrast } = build({ primary: { 'text-default': '#cccccc' } });

    expect(errors).toEqual([]);
    expect(css).not.toBe('');
    expect(contrast).toContainEqual(
      expect.objectContaining({
        foreground: 'primary.text-default',
        background: 'primary.background-default',
        minimum: 4.5,
        passes: false,
      }),
    );
    // Only the pairs the theme changes, all of them about the text
    expect(contrast.every(({ foreground }) => foreground === 'primary.text-default')).toBe(true);
  });

  test('the example builds to the same values as the defaults', () => {
    const { errors, contrast } = buildTheme(EXAMPLE_TOKENS, { name: 'example' });

    expect(errors).toEqual([]);
    // The known violations in contrast.test.ts, and nothing else
    expect(contrast.filter(({ passes }) => !passes)).toHaveLength(7);
  });
});
