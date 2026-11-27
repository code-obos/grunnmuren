import { expect, test } from 'vitest';

import type { Locale } from '../locale';
import { requiredText } from './required-text';

const run = (locale: Locale, input: unknown, max?: number) =>
  requiredText({ locale, max }).safeParse(input);

test.each(['nb', 'sv', 'en'] as const)('%s trims the output', (locale) => {
  expect(run(locale, '  Ola Nordmann \n')).toMatchObject({ success: true, data: 'Ola Nordmann' });
});

test.each([
  ['nb', '', 'Du må fylle ut dette feltet.'],
  ['nb', '   ', 'Du må fylle ut dette feltet.'],
  ['nb', undefined, 'Du må fylle ut dette feltet.'],
  ['sv', '', 'Du måste fylla i det här fältet.'],
  ['sv', ' \t ', 'Du måste fylla i det här fältet.'],
  ['en', '', 'Please fill in this field.'],
] as const)('%s rejects %j with the exact message', (locale, input, message) => {
  expect(run(locale, input).error?.issues.map((issue) => issue.message)).toEqual([message]);
});

test.each([
  ['nb', 'Maks lengde er 5 tegn.'],
  ['sv', 'Max 5 tecken.'],
  ['en', 'The maximum length is 5 characters.'],
] as const)('%s enforces max on the trimmed value', (locale, message) => {
  expect(run(locale, '  abcde  ', 5).success).toBe(true);
  expect(run(locale, 'abcdef', 5).error?.issues.map((issue) => issue.message)).toEqual([message]);
});

test('nb max means no length limit', () => {
  expect(run('nb', 'a'.repeat(5000)).success).toBe(true);
});
