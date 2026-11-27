import { expect, test } from 'vitest';

import type { Locale } from '../locale';
import { schemaMessages } from './messages';
import { phonePrefix } from './phone-prefix';

const run = (locale: Locale, input: unknown) => phonePrefix({ locale }).safeParse(input);
const messagesOf = (result: ReturnType<typeof run>) =>
  result.error?.issues.map((issue) => issue.message);

test.each(['nb', 'sv', 'en'] as const)('%s trims and accepts up to 10 characters', (locale) => {
  expect(run(locale, ' +47 ')).toMatchObject({ success: true, data: '+47' });
  expect(run(locale, '1234567890').success).toBe(true);
});

test.each([
  ['', 'required'],
  ['   ', 'required'],
  [undefined, 'required'],
  ['12345678901', 'tooLong'],
] as const)('rejects %j with the %s message in all locales', (input, key) => {
  for (const locale of ['nb', 'sv', 'en'] as const) {
    expect(messagesOf(run(locale, input))).toEqual([schemaMessages[locale].phonePrefix[key]]);
  }
});

test.each([
  [
    'nb',
    'Du må fylle ut landskode for mobil.',
    'Landskoden for mobil er for lang. Maks lengde er 10 tegn.',
  ],
  [
    'sv',
    'Du måste fylla i landskoden för mobil.',
    'Landskoden för mobil är för lång. Max längd är 10 tecken.',
  ],
  [
    'en',
    'Please enter the country code for the mobile number.',
    'The country code is too long. The maximum length is 10 characters.',
  ],
] as const)('%s has the exact messages', (locale, required, tooLong) => {
  expect(messagesOf(run(locale, ''))).toEqual([required]);
  expect(messagesOf(run(locale, '12345678901'))).toEqual([tooLong]);
});
