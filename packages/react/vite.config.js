import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
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
        'react',
        'react-dom',
        'clsx',
        'react/jsx-runtime',
        'react-collapsed',
      ],
    },
  },
});
