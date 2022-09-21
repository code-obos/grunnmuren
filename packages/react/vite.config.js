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
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: 'grunnmuren',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      external: [
        '@seznam/compose-react-refs',
        'clsx',
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-collapsed',
        'react-use',
      ],
    },
  },
});
