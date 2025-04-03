import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{tsx,ts}',
    './node_modules/@obosbbl/grunnmuren-react/dist/**/*.{mjs,js}',
  ],
} satisfies Config;
