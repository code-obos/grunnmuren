import { expect, test } from 'vitest';

import type { Locale } from '../locale';
import { ACCEPTED_FILE_TYPES, MAXIMUM_FILE_SIZE, file } from './file';

type Options = Omit<Parameters<typeof file>[0], 'locale'>;

const run = (locale: Locale, input: unknown, options: Options = {}) =>
  file({ locale, ...options }).safeParse(input);
const messagesOf = (result: ReturnType<typeof run>) =>
  result.error?.issues.map((issue) => issue.message);

const makeFile = (name: string, type: string, size = 1000) =>
  new File([new Uint8Array(size)], name, { type });
const pdf = (name = 'a.pdf') => makeFile(name, 'application/pdf', 100);

test('exports the medlem defaults', () => {
  expect(ACCEPTED_FILE_TYPES).toEqual(['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']);
  expect(MAXIMUM_FILE_SIZE).toBe(5_000_000);
});

test.each(['nb', 'sv', 'en'] as const)('%s accepts valid files and an empty list', (locale) => {
  expect(run(locale, []).success).toBe(true);
  expect(
    run(locale, [
      makeFile('photo.jpg', 'image/jpeg'),
      makeFile('logo.png', 'image/png'),
      makeFile('doc.pdf', 'application/pdf'),
    ]).success,
  ).toBe(true);
  expect(run(locale, [makeFile('big.pdf', 'application/pdf', MAXIMUM_FILE_SIZE - 1)]).success).toBe(
    true,
  );
});

test.each([
  ['nb', 'Kun .jpg, .png og .pdf er tillatt'],
  ['sv', 'Endast .jpg, .png och .pdf är tillåtna'],
  ['en', 'Only .jpg, .png and .pdf are allowed'],
] as const)('%s rejects unsupported types with the exact message', (locale, message) => {
  expect(messagesOf(run(locale, [makeFile('data.csv', 'text/csv')]))).toEqual([message]);
});

test.each([
  ['nb', 'Maksimal filstørrelse per fil er 5MB'],
  ['sv', 'Maximal filstorlek är 5MB'],
  ['en', 'The maximum file size per file is 5MB'],
] as const)('%s rejects files of 5 MB or more with the exact message', (locale, message) => {
  expect(
    messagesOf(run(locale, [makeFile('big.pdf', 'application/pdf', MAXIMUM_FILE_SIZE)])),
  ).toEqual([message]);
});

test.each([
  ['nb', 'Du kan ikke laste opp mer enn 3 filer'],
  ['sv', 'Du kan inte ladda upp fler än 3 filer'],
  ['en', 'You cannot upload more than 3 files'],
] as const)('%s rejects more than 3 files with the exact message', (locale, message) => {
  expect(run(locale, [pdf(), pdf(), pdf()]).success).toBe(true);
  expect(messagesOf(run(locale, [pdf(), pdf(), pdf(), pdf()]))).toEqual([message]);
});

test('options override the defaults and show up in the messages', () => {
  expect(messagesOf(run('en', [pdf(), pdf()], { maxFiles: 1 }))).toEqual([
    'You cannot upload more than 1 files',
  ]);
  expect(
    messagesOf(
      run('nb', [makeFile('a.pdf', 'application/pdf', 2_000_000)], { maxSize: 1_500_000 }),
    ),
  ).toEqual(['Maksimal filstørrelse per fil er 1.5MB']);
  expect(messagesOf(run('sv', [pdf()], { acceptedTypes: ['image/png'] }))).toEqual([
    'Endast .png är tillåtna',
  ]);
});

test('rejects input that is not an array of files', () => {
  expect(run('nb', undefined).success).toBe(false);
  expect(run('nb', [{ name: 'x' }]).success).toBe(false);
});
