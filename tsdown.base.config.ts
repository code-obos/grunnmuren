import type { UserConfig } from 'tsdown';

// Matches the output we previously got from bunchee: ESM only, .mjs/.d.mts files
export const baseConfig: UserConfig = {
  format: 'esm',
  platform: 'neutral',
  fixedExtension: true,
  // generate ts declaration files
  dts: true,
  // Lint package exports https://tsdown.dev/options/lint#publint
  publint: {
    level: 'error',
  },
  // Lint ts declaration files https://tsdown.dev/options/lint#attw-are-the-types-wrong
  attw: {
    profile: 'esm-only',
    level: 'error',
  },
};
