import { resolve } from 'node:path';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig, type TestProjectConfiguration } from 'vitest/config';

import { type SnapshotVariant, snapshotVariants } from './.storybook/snapshot-variants.ts';

// Vitest's default screenshot and diff paths have no project in them, so every variant would
// compare against the same file and write its diffs over the other's. The default keeps
// the plain name, so its baselines stay put.
const variantSuffix = (variant: SnapshotVariant) =>
  variant.name === 'default' ? '' : `-${variant.name}`;

const defineSnapshotProject = (variant: SnapshotVariant): TestProjectConfiguration => ({
  extends: true,
  plugins: [
    storybookTest({
      configDir: '.storybook',
      storybookScript: 'pnpm dev',
      initialGlobals: { theme: variant.theme, color: variant.color },
    }),
  ],
  test: {
    name: `storybook:${variant.name}`,
    setupFiles: ['./.storybook/vitest.setup.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: 'chromium', viewport: { width: 1280, height: 720 } }],
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          // Anti-aliasing differs slightly between runs on the same platform. Enough
          // slack to absorb that, not enough to hide something that moved.
          comparatorOptions: { threshold: 0.2, allowedMismatchedPixelRatio: 0.01 },
          resolveScreenshotPath: ({
            arg,
            ext,
            root,
            screenshotDirectory,
            testFileDirectory,
            testFileName,
            browserName,
            platform,
          }) =>
            resolve(
              root,
              testFileDirectory,
              screenshotDirectory,
              testFileName,
              `${arg}${variantSuffix(variant)}-${browserName}-${platform}${ext}`,
            ),
          // Covers the actual screenshot too, as `<arg>-actual`
          resolveDiffPath: ({
            arg,
            ext,
            root,
            attachmentsDir,
            testFileDirectory,
            testFileName,
            browserName,
            platform,
          }) =>
            resolve(
              root,
              attachmentsDir,
              testFileDirectory,
              testFileName,
              `${arg}${variantSuffix(variant)}-${browserName}-${platform}${ext}`,
            ),
        },
      },
    },
  },
});

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'tokens',
          include: ['packages/tailwind/tests/**/*.test.ts'],
          environment: 'node',
        },
      },

      ...snapshotVariants.map(defineSnapshotProject),
    ],
  },
});
