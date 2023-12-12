/** @type {import('tailwindcss').Config} */
export default {
  presets: [require('@obosbbl/grunnmuren-tailwind')],
  content: [
    './app/**/*.{tsx,ts}',
    './node_modules/@obosbbl/grunnmuren-react/dist/**/*.mjs',
  ],
};
