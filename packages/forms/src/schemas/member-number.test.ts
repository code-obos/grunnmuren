import { expect, test } from 'vitest';

import type { Locale } from '../locale';
import { memberNumber } from './member-number';
import { schemaMessages } from './messages';

const run = (locale: Locale, input: unknown) => memberNumber({ locale }).safeParse(input);

test.each(['nb', 'sv', 'en'] as const)('%s accepts 7 digits and strips spaces', (locale) => {
  expect(run(locale, '1234567')).toMatchObject({ success: true, data: '1234567' });
  expect(run(locale, '123 4567')).toMatchObject({ success: true, data: '1234567' });
});

test.each([
  ['', 'required'],
  ['   ', 'required'],
  [undefined, 'required'],
  ['123456', 'invalid'],
  ['12345678', 'invalid'],
  ['123456a', 'invalid'],
] as const)('rejects %j with the %s message in all locales', (input, key) => {
  for (const locale of ['nb', 'sv', 'en'] as const) {
    expect(run(locale, input).error?.issues.map((issue) => issue.message)).toEqual([
      schemaMessages[locale].memberNumber[key],
    ]);
  }
});

test.each([
  ['nb', 'Du må fylle ut medlemsnummer.', 'Du må fylle ut et gyldig medlemsnummer.'],
  ['sv', 'Du måste fylla i medlemsnummer.', 'Du måste fylla i ett giltigt medlemsnummer.'],
  ['en', 'Please enter a member number.', 'Please enter a valid member number.'],
] as const)('%s has the exact messages', (locale, required, invalid) => {
  expect(run(locale, '').error?.issues[0]?.message).toBe(required);
  expect(run(locale, '1').error?.issues[0]?.message).toBe(invalid);
});
