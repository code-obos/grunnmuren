import optimizeLocales from '@react-aria/optimize-locales-plugin';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../packages/react/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      plugins: [
        {
          ...optimizeLocales.vite({
            // Keep only the supported locales
            locales: ['nb', 'sv', 'en'],
          }),
          enforce: 'pre',
        },
        // temp fix for Storybook using CJS
        // see https://github.com/tailwindlabs/tailwindcss/discussions/16687#discussioncomment-12374574
        (await import('@tailwindcss/vite')).default(),
      ],
    });
  },
  docs: {
    autodocs: true,
  },
};

export default config;
