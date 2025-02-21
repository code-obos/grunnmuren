import optimizeLocales from '@react-aria/optimize-locales-plugin';
import { mergeConfig } from 'vite';

export default {
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
      // because we're serving the storybook as part of the docs app, it needs a basepath
      base: '/storybook',
      plugins: [
        {
          ...optimizeLocales.vite({
            // Keep only the supported locales
            locales: ['nb', 'sv', 'en'],
          }),
          enforce: 'pre',
        },
      ],
    });
  },
  docs: {
    autodocs: true,
  },
};
