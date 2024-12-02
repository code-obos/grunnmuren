import optimizeLocales from '@react-aria/optimize-locales-plugin';
import { defineConfig } from '@tanstack/start/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    preset: 'bun',
    compatibilityDate: '2024-11-25',
  },
  vite: {
    plugins: [
      {
        // Optimize bundle size by only keeping the necessary locales in React Aria.
        // See https://react-spectrum.adobe.com/react-aria/internationalization.html
        ...optimizeLocales.vite({
          locales: ['nb', 'sv'],
        }),
        enforce: 'pre',
      },
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
});
