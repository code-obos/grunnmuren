module.exports = {
  presets: [require('@obosbbl/grunnmuren-tailwind')],
  content: [
    // If using this together with Grunnmuren's React components
    './node_modules/@obosbbl/grunnmuren-react/dist/**/*.js',
    // Add your own content sources as needed, eg:
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};
