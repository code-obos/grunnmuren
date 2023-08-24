import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // prevent copying the public folder meant for Storybook into the dist folder
  publicDir: false,
  build: {
    lib: {
      entry: './icons.tsx',
      formats: ['es'],
      fileName: 'icons',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});