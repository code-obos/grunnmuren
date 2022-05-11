import { describe, expect, it } from 'vitest';
import { defu } from '../';

describe('defu()', () => {
  it('merges objects', () => {
    const destination = { a: 1, b: 2 };
    const defaults = { c: 3 };

    const mergedResult = defu(destination, defaults);

    expect(mergedResult).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('does not overwrite existing properties', () => {
    const destination = { a: 1, b: 2 };
    const defaults = { a: 99, c: 3 };

    const mergedResult = defu(destination, defaults);

    expect(mergedResult).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('does not mutate the arguments', () => {
    const destination = { a: 1, b: 2 };
    const defaults = { c: 3 };

    const mergedResult = defu(destination, defaults);

    expect(mergedResult).not.toBe(destination);
    expect(mergedResult).not.toBe(defaults);
  });

  it('defaults should overwrite explicit undefineds', () => {
    const destination = { a: undefined };

    const defaults = { a: 'not-undefined' };

    const mergedResult = defu(destination, defaults);

    expect(mergedResult).toEqual({ a: 'not-undefined' });
  });
});
