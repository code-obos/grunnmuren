import { defineConfig } from 'tsdown';

import { baseConfig } from '../../tsdown.base.config.ts';

export default defineConfig({
  ...baseConfig,
  checks: {
    // The 'use client' directive in src/index.ts ends up at the top of the bundle, so the warning about nested directives is just noise
    moduleLevelDirective: false,
  },
});
