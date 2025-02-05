import optimizeLocales from '@react-aria/optimize-locales-plugin';
import { defineConfig } from '@tanstack/start/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    preset: 'node-server',
    compatibilityDate: '2024-11-29',
  },
  vite: {
    plugins: [
      // @ts-expect-error errors due to transitive type only deps
      {
        // Optimize bundle size by only keeping the necessary locales in React Aria.
        // See https://react-spectrum.adobe.com/react-aria/internationalization.html
        ...optimizeLocales.vite({
          locales: ['nb', 'sv'],
        }),
        enforce: 'pre',
      },
      // @ts-expect-error errors due to transitive type only deps
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
    esbuild: {
      // We need to disable minification of identifiers to preserve React component names in auto generated code snippets (see `reactElementToJSXString` in file:///./app/ui/component-preview.tsx).
      minifyIdentifiers: false,
    },
  },
});
