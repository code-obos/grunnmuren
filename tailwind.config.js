module.exports = {
  presets: [
    require('@obosbbl/grunnmuren-tailwind')({ includeFontFallback: false }),
  ],
  content: ['./packages/**/*.{ts,tsx}'],
};
