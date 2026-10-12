import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';

import { afterAll, describe, expect, test } from 'vitest';

import { buildTheme, EXAMPLE_TOKENS, toThemeName } from '../theme/index.mjs';
import colors from '../tokens/colors.json' with { type: 'json' };

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
      ({ foreground, background }) =>
        foreground === 'primary.base-hover' && background === 'primary.background-default',
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

  test.for([
    ['rgb(0, 0, 0)', 21],
    ['rgba(0, 0, 0, 0.5)', 3.98],
    ['rgb(0 0 0)', 21],
    ['rgb(0 0 0 / 50%)', 3.98],
  ] as const)('%s is a colour, with its contrast on white', ([color, ratio]) => {
    const { errors, contrast } = build({ primary: { 'text-default': color } });

    expect(errors).toEqual([]);
    const onPage = contrast.find(({ background }) => background === 'primary.background-default');
    expect(onPage?.ratio).toBeCloseTo(ratio, 2);
  });

  test.for(['rgb(1 2, 3)', 'rgb(0 0 0 0.5)', 'rgb(0, 0, 0 / 0.5)', 'rgb(0 0 0 /)'])(
    '%s mixes or breaks the two rgb() forms, and is an error',
    (color) => {
      expect(build({ primary: { 'text-default': color } }).errors).toEqual([
        expect.objectContaining({ code: 'invalid-color', path: 'primary.text-default' }),
      ]);
    },
  );

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

  test('the example points every role at its default, and changes no contrast', () => {
    const { css, errors, contrast } = buildTheme(EXAMPLE_TOKENS, { name: 'example' });
    const defaults = colors.roles.flatMap(({ tokens }) =>
      tokens.map(({ name, refName }) => `  --${name}: var(--${refName});\n`),
    );

    expect(errors).toEqual([]);
    expect(css).toBe(`[data-theme='example'] {\n${defaults.join('')}}\n`);
    expect(contrast).toEqual([]);
  });

  test.for(['{blue.900}', '#002169', '#002169FF', 'rgb(0 33 105)'])(
    'restating a default as %s reports no contrast',
    (value) => {
      expect(build({ primary: { 'text-default': value } }).contrast).toEqual([]);
    },
  );

  test('"default" is not a theme name, it resets to the defaults', () => {
    expect(buildTheme({}, { name: 'default' }).errors).toEqual([
      expect.objectContaining({ code: 'invalid-name' }),
    ]);
  });
});

describe('toThemeName', () => {
  test.for([
    ['Frøen Hage', 'froen-hage'],
    ['Blåbær_Æble 2', 'blabaer_aeble-2'],
    ['  --Nytt tema!-- ', 'nytt-tema'],
  ])('%s is %s', ([input, name]) => {
    expect(toThemeName(input)).toBe(name);
  });
});

const CLI = resolve(import.meta.dirname, '../theme/cli.mjs');
const run = promisify(execFile);
const directory = await mkdtemp(join(tmpdir(), 'grunnmuren-theme-'));
afterAll(() => rm(directory, { recursive: true }));

/** Runs the CLI with `tokens` in a file, and resolves to its output and exit code either way. */
const cliWithFile = async (fileName: string, tokens: unknown, ...args: Array<string>) => {
  const file = join(directory, fileName);
  await writeFile(file, JSON.stringify(tokens));
  try {
    const { stdout, stderr } = await run('node', [CLI, file, ...args]);
    return { stdout, stderr, code: 0 };
  } catch (error) {
    const { stdout, stderr, code } = error as { stdout: string; stderr: string; code: number };
    return { stdout, stderr, code };
  }
};

const cli = (tokens: unknown, ...args: Array<string>) =>
  cliWithFile('tokens.json', tokens, ...args);

describe('grunnmuren-theme', () => {
  test('prints the CSS', async () => {
    const { stdout, code } = await cli({ primary: { 'base-default': '#2d3a26' } }, '-n', 'x');

    expect(code).toBe(0);
    expect(stdout).toBe("[data-theme='x'] {\n  --gm-color-primary-base-default: #2d3a26;\n}\n");
  });

  test('names the theme after the file without --name', async () => {
    const { stdout } = await cli({ primary: { 'base-default': '#2d3a26' } });
    expect(stdout).toMatch(/^\[data-theme='tokens'\]/);
  });

  test('makes a theme name out of the file name', async () => {
    const { stdout } = await cliWithFile('Frøen Hage.json', {
      primary: { 'base-default': '#000' },
    });
    expect(stdout).toMatch(/^\[data-theme='froen-hage'\]/);
  });

  test('points to --name when the file name makes an invalid theme name', async () => {
    const { stdout, stderr, code } = await cliWithFile('default.json', {});

    expect(code).toBe(1);
    expect(stdout).toBe('');
    expect(stderr).toContain('--name');
  });

  test('writes the CSS to --out', async () => {
    const out = join(directory, 'x.css');
    await cli({ primary: { 'base-default': '#2d3a26' } }, '-n', 'x', '--out', out);
    expect(await readFile(out, 'utf8')).toContain('--gm-color-primary-base-default: #2d3a26;');
  });

  test('fails on errors, and prints no CSS', async () => {
    const { stdout, stderr, code } = await cli({ primary: { 'base-default': 'green' } }, '-n', 'x');

    expect(code).toBe(1);
    expect(stdout).toBe('');
    expect(stderr).toContain('"green" in "primary.base-default" isn\'t a colour');
  });

  test('warns about contrast, and only fails on it with --strict', async () => {
    const tokens = { primary: { 'text-default': '#cccccc' } };
    const lenient = await cli(tokens, '-n', 'x');
    const strict = await cli(tokens, '-n', 'x', '--strict');

    expect(lenient.code).toBe(0);
    expect(lenient.stderr).toContain('primary.text-default on primary.background-default');
    expect(strict.code).toBe(1);
  });

  test('writes no CSS when --strict fails on contrast', async () => {
    const out = join(directory, 'strict.css');
    const { stdout, stderr, code } = await cli(
      { primary: { 'text-default': '#cccccc' } },
      '-n',
      'x',
      '--strict',
      '--out',
      out,
    );

    expect(code).toBe(1);
    expect(stdout).toBe('');
    expect(stderr).toContain('Wrote no CSS');
    await expect(readFile(out, 'utf8')).rejects.toThrow(/ENOENT/);
  });
});
