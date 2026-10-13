#!/usr/bin/env node
// @ts-check
import { readFile, writeFile } from 'node:fs/promises';
import { basename, extname } from 'node:path';
import { parseArgs } from 'node:util';

import { buildTheme, EXAMPLE_TOKENS, toThemeName } from './index.mjs';

const HELP = `Builds a Grunnmuren theme from colour tokens, and checks it.

Usage:
  grunnmuren-theme <tokens.json> [--name <theme>] [--out <file.css>] [--strict]
  grunnmuren-theme --example > tokens.json

Options:
  -n, --name     The theme's name, what goes in data-theme="…". Defaults to the file's name
  -o, --out      Write the CSS to this file instead of stdout
      --strict   Fail on contrast below WCAG 2.2 AA too, without writing any CSS
      --example  Print every role token at its default, to start from
  -h, --help     Show this

The tokens are named like Grunnmuren's, nested by role or colour family:
  { "primary": { "base-default": "#2d3a26", "base-hover": "{primary.base-active}" } }
Designsystemet's paths, like color.primary.base-default, work too.

Guide: https://grunnmuren.obos.no/profil/temaer
`;

/** @type {(message: string) => never} */
const fail = (message) => {
  process.stderr.write(`${message}\n`);
  process.exit(1);
};

const parse = () => {
  try {
    return parseArgs({
      allowPositionals: true,
      options: {
        name: { type: 'string', short: 'n' },
        out: { type: 'string', short: 'o' },
        strict: { type: 'boolean' },
        example: { type: 'boolean' },
        help: { type: 'boolean', short: 'h' },
      },
    });
  } catch (error) {
    return fail(`${error instanceof Error ? error.message : String(error)}\n\n${HELP}`);
  }
};

/** Rows as columns padded to the widest cell @param {Array<Array<string>>} rows */
const table = (rows) => {
  const widths = rows[0].map((_, column) => Math.max(...rows.map((row) => row[column].length)));
  return rows.map((row) =>
    `  ${row.map((cell, column) => cell.padEnd(widths[column])).join('  ')}`.trimEnd(),
  );
};

const { values, positionals } = parse();

if (values.help) {
  process.stdout.write(HELP);
  process.exit(0);
}
if (values.example) {
  process.stdout.write(`${JSON.stringify(EXAMPLE_TOKENS, null, 2)}\n`);
  process.exit(0);
}

const [file, ...rest] = positionals;
if (!file || rest.length > 0) {
  fail(HELP);
}
const name = values.name ?? toThemeName(basename(file, extname(file)));

const read = async () => {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    return fail(`Couldn't read ${file}: ${error instanceof Error ? error.message : String(error)}`);
  }
};

const { css, errors, contrast } = buildTheme(await read(), { name });

if (errors.length > 0) {
  fail(
    [
      `${errors.length} ${errors.length === 1 ? 'error' : 'errors'} in ${file}:`,
      ...errors.map(({ code, message }) =>
        code === 'invalid-name' && !values.name
          ? `  ${message}. The name comes from the file, pass one with --name`
          : `  ${message}`,
      ),
    ].join('\n'),
  );
}

const failing = contrast.filter(({ passes }) => !passes);
if (failing.length > 0) {
  const rows = failing.map(({ foreground, background, ratio, minimum, rule }) => [
    `${foreground} on ${background}`,
    // Floored, so a ratio that fails never prints as one that passes
    `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`,
    `${minimum}:1`,
    rule,
  ]);
  process.stderr.write(
    [
      `${failing.length} of ${contrast.length} contrast pairs the theme changes are below WCAG 2.2 AA:`,
      ...table([['Pair', 'Ratio', 'Needs', 'Rule'], ...rows]),
      '',
    ].join('\n'),
  );
  if (values.strict) {
    fail('Wrote no CSS, since --strict fails on contrast below WCAG 2.2 AA.');
  }
}

if (values.out) {
  await writeFile(values.out, css);
  process.stderr.write(`Wrote ${values.out}\n`);
} else {
  process.stdout.write(css);
}
