import type { Config } from 'tailwindcss';

export default {
  // pattern is overly specifi to prevent tw warning about matching node_modules
  content: ['./packages/*/src/**/*.{ts,tsx}'],
} satisfies Config;
