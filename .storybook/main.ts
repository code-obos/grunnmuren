import optimizeLocales from '@react-aria/optimize-locales-plugin';
import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../packages/react/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-vitest'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // The docs site serves the built Storybook from /storybook/. The Vitest browser
      // runner serves from the root and can't reach the page behind a base it doesn't
      // know about, so drop it there.
      base: process.env.VITEST ? '/' : '/storybook/',

      plugins: [
        {
          ...optimizeLocales.vite({
            // Keep only the supported locales
            locales: ['nb', 'sv', 'en'],
          }),
          enforce: 'pre',
        },
        tailwindcss(),
      ],
    });
  },
};

export default config;
