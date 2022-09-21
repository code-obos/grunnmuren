const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          // Allows us to use PostCSS 8+
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  features: {
    storyStoreV7: true,
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src/'),
    };
    return config;
  },
};
