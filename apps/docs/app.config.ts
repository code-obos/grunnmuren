import optimizeLocales from '@react-aria/optimize-locales-plugin';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from '@tanstack/react-start/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    preset: 'node-server',
    compatibilityDate: '2024-11-29',
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
      tailwindcss(),
    ],
    esbuild: {
      // We need to disable minification of identifiers to preserve React component names in auto generated code snippets (see `reactElementToJSXString` in file:///./app/ui/component-preview.tsx).
      minifyIdentifiers: false,
    },
  },
});
