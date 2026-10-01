import { describe, expect, test } from 'vitest';

import {
  findBrokenTokenReferences,
  formatDeclarations,
  getGrunnmurenTokens,
  resolveToken,
  resolveUtility,
} from './design-system.ts';
import { legacyPalette } from './legacy-palette.ts';
import { utilityPairs, type UtilityPair } from './utility-pairs.ts';

type MappedPair = UtilityPair & { to: string };

const isMapped = (pair: UtilityPair): pair is MappedPair => pair.to != null;

const mappedPairs = utilityPairs.filter(isMapped);
const renamedPairs = mappedPairs.filter((pair) => pair.change == null);
const changedPairs = mappedPairs.filter((pair) => pair.change != null);
const pendingPairs = utilityPairs.filter((pair) => !isMapped(pair));

const declarationsFor = async (candidate: string) =>
  formatDeclarations(await resolveUtility(candidate));

describe('utility parity', () => {
  test.for(renamedPairs)('$from computes the same as $to', async ({ from, to }) => {
    expect(await declarationsFor(from)).toEqual(await declarationsFor(to));
  });

  test.for(changedPairs)('$from differs from $to: $change', async ({ from, to }) => {
    expect(await declarationsFor(from)).not.toEqual(await declarationsFor(to));
  });

  // The pairs are the point of the file, so the ones still waiting on a token show up
  // in the run instead of only living in a comment.
  // oxlint-disable-next-line vitest/warn-todo
  for (const { from, change } of pendingPairs) test.todo(`${from} -> ? (${change})`);

  // A candidate that doesn't compile resolves to nothing, which would make the
  // assertions above pass against an empty list. `resolveUtility` throws instead.
  test('a utility that does not exist throws', async () => {
    await expect(resolveUtility('bg-not-a-real-color')).rejects.toThrow(
      'does not compile to anything',
    );
  });

  // Variants that only touch the selector would otherwise collapse into the same
  // declarations, so a pair with the wrong variant on `to` would pass as a rename
  test('variants that only change the selector are kept apart', async () => {
    expect(await declarationsFor('hover:bg-blue')).not.toEqual(
      await declarationsFor('focus-visible:bg-blue'),
    );
  });
});

describe('computed values', () => {
  // Snapshotting what the utilities compile to today is what turns a token change
  // into a reviewable diff instead of a silently different button.
  test.for(utilityPairs)('$from', async ({ from }) => {
    expect(await declarationsFor(from)).toMatchSnapshot();
  });

  test('the token set matches the snapshot', async () => {
    expect(await getGrunnmurenTokens()).toMatchSnapshot();
  });

  test('no token points at a token that does not exist', async () => {
    expect(await findBrokenTokenReferences()).toEqual([]);
  });
});

const ROLE_TOKEN = /^--color-(primary|accent|neutral|success|danger|warning|info)-/;

describe('ported primitives', () => {
  test.for(Object.entries(legacyPalette))('%s survives as %s', async ([legacy, primitive]) => {
    expect(await resolveToken(primitive)).toBe(await resolveToken(legacy));
  });

  // Otherwise a colour added to the palette later would never get checked above
  test('every colour in the palette is accounted for', async () => {
    const palette = Object.keys(await getGrunnmurenTokens()).filter(
      (token) => token.startsWith('--color-') && !ROLE_TOKEN.test(token),
    );
    expect(palette.toSorted()).toEqual(Object.keys(legacyPalette).toSorted());
  });
});
