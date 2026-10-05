import { resolve } from 'node:path';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig, type TestProjectConfiguration } from 'vitest/config';

import { type SnapshotVariant, snapshotVariants } from './.storybook/snapshot-variants.ts';

// Storybook's Vitest plugin lays every story out in 1200x900, whatever the instance below
// says. Room for that and for the tallest stories, and anything taller still gets
// captured whole, just scaled down to fit.
const STORY_VIEWPORT = { width: 1200, height: 900 };
const CONTEXT_VIEWPORT = { width: STORY_VIEWPORT.width, height: 4096 };

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
      // The stories render in an iframe inside this page, scaled down to fit when the page
      // is smaller. Room enough keeps the scale at 1, so a screenshot is the story pixel
      // for pixel, and a tall story that gets a taller iframe isn't shrunk to fit.
      provider: playwright({ contextOptions: { viewport: CONTEXT_VIEWPORT } }),
      headless: true,
      instances: [{ browser: 'chromium', viewport: STORY_VIEWPORT }],
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          // Strict on purpose. At 0.2 a pixel had to change more than blue-500 to blue-900
          // to count at all, and 1% of the image could differ on top of that, so most of a
          // colour migration went through unseen. 0.02 catches the smallest step in the
          // token set (sky-300 to sky-250 needs under 0.033). Anti-aliasing is left out by
          // pixelmatch itself, and same-platform runs come out identical, so no slack.
          comparatorOptions: { threshold: 0.02, allowedMismatchedPixels: 0 },
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
