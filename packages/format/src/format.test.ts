import { describe, expect, test } from 'vitest';
import { formatOrganizationNumber, formatPhoneNumber
} from './no';

describe('formatPhoneNumber()', () => {

  test('formats mobile numbers', () => {
    const input = '40612345';
    const expected = '40 61 23 45';

    expect(formatPhoneNumber(input)).toBe(expected);
  });

  test('formats landline numbers', () => {
    const input = '22865500';
    const expected = '22 86 55 00';

    expect(formatPhoneNumber(input)).toBe(expected);
  });

  test('formats 8-series numbers', () => {
    const input = '80000000';
    const expected = '80 00 00 00';

    expect(formatPhoneNumber('80000000')).toBe('800 00 000');
  });
});

describe('formatOrganizationNumber()', () => {
  expect(formatOrganizationNumber('937052766')).toBe('937 052 766');

});
