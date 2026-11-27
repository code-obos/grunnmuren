import { expect, test } from 'vitest';

import type { Locale } from '../locale';
import { email } from './email';
import { schemaMessages } from './messages';

const run = (locale: Locale, input: unknown) => email({ locale }).safeParse(input);
const messagesOf = (result: ReturnType<typeof run>) =>
  result.error?.issues.map((issue) => issue.message);

test.each(['nb', 'sv', 'en'] as const)('%s trims and lowercases the output', (locale) => {
  expect(run(locale, '  Ola.Nordmann@Example.COM \n')).toMatchObject({
    success: true,
    data: 'ola.nordmann@example.com',
  });
  expect(run(locale, 'Test@Example.COM')).toMatchObject({ data: 'test@example.com' });
});

test.each(['nb', 'sv', 'en'] as const)('%s accepts exactly 102 characters', (locale) => {
  const address = `${'a'.repeat(90)}@example.com`;
  expect(address.length).toBe(102);
  expect(run(locale, address).success).toBe(true);
});

test.each(['nb', 'sv', 'en'] as const)('%s rejects each case with its message', (locale) => {
  const messages = schemaMessages[locale].email;
  const cases = [
    ['', messages.required],
    ['   ', messages.required],
    [undefined, messages.required],
    ['not-an-email', messages.invalid],
    ['ola@', messages.invalid],
    ['o la@example.com', messages.specialCharacters],
    [`${'a'.repeat(91)}@example.com`, messages.tooLong],
    ['user+tag@example.com', messages.plusSign],
    ['bjørn@example.com', messages.specialCharacters],
    ['bær@example.com', messages.specialCharacters],
    ['ola@tromsø.no', messages.specialCharacters],
    ['kåre@example.com', messages.specialCharacters],
    ['användare@example.com', messages.specialCharacters],
    ['möller@example.com', messages.specialCharacters],
  ] as const;
  for (const [input, message] of cases) {
    expect({ input, messages: messagesOf(run(locale, input)) }).toEqual({
      input,
      messages: [message],
    });
  }
});

test.each([
  [
    'nb',
    [
      'Du må fylle ut e-post.',
      'Du må fylle ut en gyldig e-post.',
      'E-posten er for lang. Maks lengde er 102 tegn.',
      'E-postadressen kan ikke inneholde spesialtegn, Æ, Ø eller Å.',
      "E-postadressen kan ikke inneholde '+'.",
    ],
  ],
  [
    'sv',
    [
      'Du måste fylla i din e-post.',
      'Du måste ange en giltig e-postadress.',
      'E-postmeddelandet är för långt. Max längd är 102 tecken.',
      'E-postadressen får inte innehålla specialtecken, Å, Ä eller Ö.',
      'E-postadressen får inte innehålla "+".',
    ],
  ],
  [
    'en',
    [
      'Please enter an email address.',
      'Please enter a valid email address.',
      'The email address is too long. The maximum length is 102 characters.',
      'The email address cannot contain special characters, Æ, Ø or Å.',
      'The email address cannot contain "+".',
    ],
  ],
] as const)('%s has the exact messages', (locale, expected) => {
  const m = schemaMessages[locale].email;
  expect([m.required, m.invalid, m.tooLong, m.specialCharacters, m.plusSign]).toEqual(expected);
});
