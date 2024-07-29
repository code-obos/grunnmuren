/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@obosbbl/grunnmuren-tailwind')],
  content: [
    './app/**/*.{tsx,ts}',
    './node_modules/@obosbbl/grunnmuren-react/dist/**/*.{mjs,js}',
  ],
};
