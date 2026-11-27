import { expect, test } from 'vitest';

import type { Locale } from '../locale';
import { email } from './email';
import { schemaMessages } from './messages';

const run = (locale: Locale, input: unknown) => email({ locale }).safeParse(input);

test.each(['nb', 'sv', 'en'] as const)('%s trims and lowercases the output', (locale) => {
  expect(run(locale, '  Ola.Nordmann@Example.COM \n')).toMatchObject({
    success: true,
    data: 'ola.nordmann@example.com',
  });
});

test.each([
  ['nb', '', 'required'],
  ['nb', '   ', 'required'],
  ['nb', undefined, 'required'],
  ['nb', 'ola', 'invalid'],
  ['nb', 'ola@', 'invalid'],
  ['nb', 'ola@example', 'invalid'],
  ['nb', 'o la@example.com', 'invalid'],
  ['nb', `${'a'.repeat(250)}@example.com`, 'tooLong'],
  ['sv', '', 'required'],
  ['sv', 'anna', 'invalid'],
  ['sv', `${'a'.repeat(250)}@example.com`, 'tooLong'],
  ['en', '', 'required'],
  ['en', 'john', 'invalid'],
  ['en', `${'a'.repeat(250)}@example.com`, 'tooLong'],
] as const)('%s rejects %j with the %s message', (locale, input, key) => {
  const result = run(locale, input);
  expect(result.error?.issues.map((issue) => issue.message)).toEqual([
    schemaMessages[locale].email[key],
  ]);
});

test.each([
  ['nb', 'Du må fylle ut e-post.', 'Du må fylle ut en gyldig e-post.'],
  ['sv', 'Du måste fylla i e-post.', 'Du måste fylla i en giltig e-postadress.'],
  ['en', 'Please enter an email address.', 'Please enter a valid email address.'],
] as const)('%s has the exact messages', (locale, required, invalid) => {
  expect(run(locale, '').error?.issues[0]?.message).toBe(required);
  expect(run(locale, 'x').error?.issues[0]?.message).toBe(invalid);
});
