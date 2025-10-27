import optimizeLocales from '@react-aria/optimize-locales-plugin';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
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
    tanstackStart({
      srcDirectory: 'src',
    }),
    viteReact(),
  ],
  esbuild: {
    // We need to disable minification of identifiers to preserve React component names in auto generated code snippets (see `reactElementToJSXString` in file:///./app/ui/component-preview.tsx).
    minifyIdentifiers: false,
  },
});
