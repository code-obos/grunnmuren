module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  // Workaround symlinked plugins (pnpm) not being autodetected https://github.com/prettier/prettier/issues/8056
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};
