import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react({ fastRefresh: false })],
  // prevent copying the public folder meant for Storybook into the dist folder
  publicDir: false,
  esbuild: {
    // adds 'use client'; to top of every file processed by esbuild.
    // This is so we're able to use the current version of Grunnmuren with
    // React server components without wrapping every component.
    //
    // Note that this isn't "proper" RSC support.
    // This just turns every Grunnmuren component into a client side component...
    // There are plenty of components in Grunnmuren that doesn't use client hooks
    // and could be server rendered, but that would require changing the
    // setup of the package with own entrypoints for each component. We'll leave
    // that for a new major version..
    //
    // This banner could also be added through rollup with the rollupOptions.banner
    // option, but it seems we must add the directive using esbuild,
    // otherwise it gets removed by esbuild's minifier
    banner: "'use client';",
  },
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: 'grunnmuren',
    },
    rollupOptions: {
      onwarn(warning, warn) {
        // Rollup warns that module level directives ( eg 'use client';) cause errors when bundled.
        // We bundle Grunnmuren down to a single file, so it is okay in our case.
        // See https://github.com/rollup/rollup/issues/4699#issuecomment-1299770973
        if (
          warning.code === 'MODULE_LEVEL_DIRECTIVE' ||
          warning.code === 'SOURCEMAP_ERROR'
        ) {
          return;
        }
        warn(warning);
      },

      // make sure to externalize deps that shouldn't be bundled
      external: [
        '@obosbbl/grunnmuren-icons',
        'react-merge-refs',
        '@react-hookz/web',
        'clsx',
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-collapsed',
      ],
    },
  },
});
