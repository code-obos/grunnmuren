import { defineConfig } from '@tanstack/start/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    preset: 'bun',
    compatibilityDate: '2024-11-25',
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
});
