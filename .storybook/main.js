const path = require('path');
const { mergeConfig } = require('vite');

module.exports = {
  stories: ['../packages/react/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    {
      name: '@storybook/addon-styling',
    },
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
