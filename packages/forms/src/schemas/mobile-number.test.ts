import { expect, test } from 'vitest';

import type { Locale } from '../locale';
import { schemaMessages } from './messages';
import { mobileNumber } from './mobile-number';

const run = (locale: Locale, input: unknown) => mobileNumber({ locale }).safeParse(input);

test.each([
  ['nb', '41234567', '41234567'],
  ['nb', '912 34 567', '91234567'],
  ['nb', ' 4123\t4567 ', '41234567'],
  ['sv', '0701234567', '0701234567'],
  ['sv', '070 123 45 67', '0701234567'],
  ['sv', '0721234567', '0721234567'],
  ['en', '912 34 567', '91234567'],
] as const)('%s accepts %j and outputs %j', (locale, input, output) => {
  expect(run(locale, input)).toMatchObject({ success: true, data: output });
});

test.each([
  ['nb', '', 'required'],
  ['nb', '   ', 'required'],
  ['nb', undefined, 'required'],
  ['nb', '12345678', 'invalid'],
  ['nb', '4123456', 'invalid'],
  ['nb', '412345678', 'invalid'],
  ['nb', '4123456a', 'invalid'],
  ['nb', '+4741234567', 'invalid'],
  ['sv', '', 'required'],
  ['sv', '41234567', 'invalid'],
  ['sv', '0711234567', 'invalid'],
  ['sv', '070123456', 'invalid'],
  ['en', '', 'required'],
  ['en', '12345678', 'invalid'],
  ['en', '0701234567', 'invalid'],
] as const)('%s rejects %j with the %s message', (locale, input, key) => {
  const result = run(locale, input);
  expect(result.success).toBe(false);
  expect(result.error?.issues.map((issue) => issue.message)).toEqual([
    schemaMessages[locale].mobileNumber[key],
  ]);
});

test.each([
  ['nb', 'Du må fylle ut mobilnummer.', 'Du må fylle ut et gyldig mobilnummer.'],
  ['sv', 'Du måste fylla i mobilnummer.', 'Du måste fylla i ett giltigt mobilnummer.'],
  ['en', 'Please enter a mobile number.', 'Please enter a valid mobile number.'],
] as const)('%s has the exact messages', (locale, required, invalid) => {
  expect(run(locale, '').error?.issues[0]?.message).toBe(required);
  expect(run(locale, '1').error?.issues[0]?.message).toBe(invalid);
});
