import { defineConfig } from 'tsdown';

import { baseConfig } from '../../tsdown.base.config.ts';

export default defineConfig({
  ...baseConfig,
  // The schemas entry is imported by server code, so it must not share a 'use client' chunk
  entry: ['src/index.ts', 'src/schemas/index.ts'],
  checks: {
    // The 'use client' directive in src/index.ts ends up at the top of the bundle
    moduleLevelDirective: false,
  },
});
