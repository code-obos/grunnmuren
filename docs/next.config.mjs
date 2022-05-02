// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  // we want to be future compliant
  reactStrictMode: true,
  // not really necessary to send this header
  poweredByHeader: false,
  // use swc instead of terser for minification
  swcMinify: true,
  // We handle eslint ourselves, thank you very much
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Set lang attribute without custom _document
  i18n: {
    locales: ['nb'],
    defaultLocale: 'nb',
  },
};

export default config;
