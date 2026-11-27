import { expect, test } from 'vitest';

import type { Locale } from '../locale';
import { schemaMessages } from './messages';
import { nationalIdNumber } from './national-id-number';

const run = (locale: Locale, input: unknown, allowDNumber?: boolean) =>
  nationalIdNumber({ locale, allowDNumber }).safeParse(input);

const FNR = '01019000008';
const DNR = '41019000077';
const HNR = '01509000014';

test.each([
  ['nb', FNR, FNR],
  ['nb', '010190 00008', FNR],
  ['nb', ' 010190\t00008 ', FNR],
  ['sv', '900101-0017', '900101-0017'],
  ['sv', '9001010017', '9001010017'],
  ['sv', '19900101-0017', '19900101-0017'],
  ['sv', ' 900101 - 0017 ', '900101-0017'],
  ['en', '010190 00008', FNR],
] as const)('%s accepts %j and outputs %j', (locale, input, output) => {
  expect(run(locale, input)).toMatchObject({ success: true, data: output });
});

test.each([
  ['nb', '', undefined, 'required'],
  ['nb', '   ', undefined, 'required'],
  ['nb', undefined, undefined, 'required'],
  ['nb', '12345678910', undefined, 'invalid'],
  ['nb', '0101900000', undefined, 'invalid'],
  ['nb', '01019000009', undefined, 'invalid'],
  ['nb', DNR, undefined, 'invalid'],
  ['nb', DNR, false, 'invalid'],
  ['nb', HNR, true, 'invalidWithDNumber'],
  ['nb', '12345678910', true, 'invalidWithDNumber'],
  ['sv', '', undefined, 'required'],
  ['sv', '900101-0018', undefined, 'invalid'],
  ['sv', FNR, undefined, 'invalid'],
  ['en', '', undefined, 'required'],
  ['en', DNR, undefined, 'invalid'],
  ['en', HNR, true, 'invalidWithDNumber'],
  ['en', '900101-0017', undefined, 'invalid'],
] as const)('%s rejects %j (allowDNumber %s) with the %s message', (locale, input, allow, key) => {
  const result = run(locale, input, allow);
  expect(result.error?.issues.map((issue) => issue.message)).toEqual([
    schemaMessages[locale].nationalIdNumber[key],
  ]);
});

test('nb accepts a d-number only when allowed', () => {
  expect(run('nb', DNR, true)).toMatchObject({ success: true, data: DNR });
  expect(run('nb', FNR, true)).toMatchObject({ success: true, data: FNR });
  expect(run('nb', DNR).success).toBe(false);
});

test.each([
  ['nb', false, 'Du må fylle ut et gyldig fødselsnummer.'],
  ['nb', true, 'Du må fylle ut et gyldig fødselsnummer eller d-nummer.'],
  ['sv', false, 'Du måste fylla i ett giltigt personnummer.'],
  ['en', false, 'Please enter a valid national identity number.'],
  ['en', true, 'Please enter a valid national identity number or D number.'],
] as const)('%s (allowDNumber %s) has the exact invalid message', (locale, allow, message) => {
  expect(run(locale, '1', allow).error?.issues[0]?.message).toBe(message);
});

test.each([
  ['nb', 'Du må fylle ut fødselsnummer.'],
  ['sv', 'Du måste fylla i personnummer.'],
  ['en', 'Please enter a national identity number.'],
] as const)('%s has the exact required message', (locale, message) => {
  expect(run(locale, '').error?.issues[0]?.message).toBe(message);
});
