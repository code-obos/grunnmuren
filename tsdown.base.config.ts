import type { UserConfig } from 'tsdown';

export const baseConfig: UserConfig = {
  // generate ts declaration files
  dts: true,
  // Lint package exports https://tsdown.dev/options/lint#publint
  publint: {
    enabled: 'ci-only',
    level: 'error',
  },
  // Lint ts declaration files https://tsdown.dev/options/lint#attw-are-the-types-wrong
  attw: {
    enabled: 'ci-only',
    profile: 'esm-only',
    level: 'error',
  },
};
