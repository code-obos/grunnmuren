import { defineBuildConfig } from 'unbuild';

export default function makeDefineBuildConfig() {
  return defineBuildConfig({
    entries: ['./src/index.ts'],

    // Generates .d.ts declaration file
    declaration: 'compatible',

    externals: ['react', 'react-dom', 'react/jsx-runtime'],
  });
}
