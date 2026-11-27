import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import type { Locale } from '../locale';
import { birthDate } from './birth-date';
import { schemaMessages } from './messages';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 5, 15, 12));
});

afterEach(() => {
  vi.useRealTimers();
});

const run = (locale: Locale, input: unknown, minimumAge?: number) =>
  birthDate({ locale, minimumAge }).safeParse(input);

const messagesOf = (result: ReturnType<typeof run>) =>
  result.error?.issues.map((issue) => issue.message);

test.each(['nb', 'sv', 'en'] as const)('%s accepts valid dates and trims', (locale) => {
  expect(run(locale, '1990-01-01')).toMatchObject({ success: true, data: '1990-01-01' });
  expect(run(locale, ' 1990-01-01 ')).toMatchObject({ success: true, data: '1990-01-01' });
  expect(run(locale, '1900-01-01').success).toBe(true);
  expect(run(locale, '2026-06-15').success).toBe(true);
  expect(run(locale, '2000-02-29').success).toBe(true);
});

test.each([
  ['', 'required'],
  ['   ', 'required'],
  [undefined, 'required'],
  ['01.01.1990', 'invalid'],
  ['1990-1-1', 'invalid'],
  ['abc', 'invalid'],
  ['1990-13-01', 'invalid'],
  ['1990-02-30', 'invalid'],
  ['2001-02-29', 'invalid'],
  ['2026-06-16', 'inFuture'],
  ['2030-01-01', 'inFuture'],
  ['1899-12-31', 'before1900'],
  ['1850-05-05', 'before1900'],
] as const)('rejects %j with the %s message in both locales', (input, key) => {
  for (const locale of ['nb', 'sv', 'en'] as const) {
    expect(messagesOf(run(locale, input))).toEqual([schemaMessages[locale].birthDate[key]]);
  }
});

test.each([
  ['nb', 'Du må fylle ut en dato.', 'Du må fylle ut en gyldig dato.'],
  ['sv', 'Du måste fylla i ett datum.', 'Du måste ange ett giltigt datum.'],
  ['en', 'Please enter a date.', 'Please enter a valid date.'],
] as const)('%s has the exact required and invalid messages', (locale, required, invalid) => {
  expect(messagesOf(run(locale, ''))).toEqual([required]);
  expect(messagesOf(run(locale, 'x'))).toEqual([invalid]);
});

test.each([
  ['nb', 'Du kan ikke velge en dato fram i tid.', 'Du kan ikke velge en dato før 1900.'],
  ['sv', 'Du kan inte välja ett datum i framtiden.', 'Du kan inte välja ett datum före 1900.'],
  ['en', 'You cannot choose a date in the future.', 'You cannot choose a date before 1900.'],
] as const)('%s has the exact future and 1900 messages', (locale, future, early) => {
  expect(messagesOf(run(locale, '2027-01-01'))).toEqual([future]);
  expect(messagesOf(run(locale, '1800-01-01'))).toEqual([early]);
});

test.each([
  ['2008-06-15', true],
  ['2008-06-16', false],
  ['2000-01-01', true],
  ['2010-01-01', false],
] as const)('minimumAge 18 on %s -> valid %s', (input, valid) => {
  for (const locale of ['nb', 'sv', 'en'] as const) {
    expect(run(locale, input, 18).success).toBe(valid);
  }
});

test.each(['nb', 'sv', 'en'] as const)(
  '%s reports too young with the formatted message',
  (locale) => {
    expect(messagesOf(run(locale, '2010-01-01', 18))).toEqual([
      schemaMessages[locale].birthDate.tooYoung(18),
    ]);
  },
);

test.each([
  ['nb', 'Du må være minst 18 år.'],
  ['sv', 'Du måste vara minst 18 år.'],
  ['en', 'You must be at least 18 years old.'],
] as const)('%s has the exact minimum age message', (locale, message) => {
  expect(messagesOf(run(locale, '2020-01-01', 18))).toEqual([message]);
});

test('without minimumAge a recent birth date is fine', () => {
  expect(run('nb', '2026-01-01').success).toBe(true);
});
