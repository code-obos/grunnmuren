import { mergeConfig } from 'vite';
import path from 'path';
import optimizeLocales from '@react-aria/optimize-locales-plugin';

module.exports = {
  stories: ['../packages/react/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
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
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src/'),
        },
      },
    });
  },
  docs: {
    autodocs: true,
  },
};
