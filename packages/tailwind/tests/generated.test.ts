import { describe, expect, test } from 'vitest';

import { buildTokenCss } from '../build-tokens.ts';

const files = await buildTokenCss();

// The CSS under tokens/ is committed, so a token change shows up as a reviewable CSS
// diff. This is what keeps it honest: if the source and the files drift apart the run
// fails, and `pnpm tokens:build` writes them fresh.
describe('generated token css', () => {
  test.for([...files.keys()])('tokens/%s matches the source', async (file) => {
    await expect(files.get(file)).toMatchFileSnapshot(`../tokens/${file}`);
  });
});
