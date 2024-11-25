import { type Config } from 'tailwindcss';

export default {
  presets: [require('@obosbbl/grunnmuren-tailwind')],
  content: ['./app/**/*.tsx'],
} satisfies Config;
