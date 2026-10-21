import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

// tsdown escapes quotes in string literals in the bundle, so consumers' Tailwind extracts
// `[data-slot=\"media\"]` and generates selectors that never match. Leave the values unquoted.

const srcDir = join(import.meta.dirname, '../src');

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return sourceFiles(path);
    }
    return /\.tsx?$/.test(entry.name) && !/\.(stories|test)\./.test(entry.name) ? [path] : [];
  });

test('Tailwind arbitrary variants have no quoted attribute values', () => {
  const offenders = sourceFiles(srcDir).flatMap((file) =>
    readFileSync(file, 'utf8')
      .split(/\s+/)
      .filter((token) => /\]:(?!not\()/.test(token) && /=["']/.test(token))
      .map((token) => `${file.slice(srcDir.length + 1)}: ${token}`),
  );

  expect(offenders).toEqual([]);
});
