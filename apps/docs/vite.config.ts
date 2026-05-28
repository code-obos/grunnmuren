import mdx from '@mdx-js/rollup';
import optimizeLocales from '@react-aria/optimize-locales-plugin';
import tailwindcss from '@tailwindcss/vite';
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';

import { remarkCodeBlocks } from './src/lib/mdx/remark-code-blocks';
import { remarkHeadings } from './src/lib/mdx/remark-headings';

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
    tailwindcss(),
    nitroV2Plugin({
      compatibilityDate: '2024-04-03',
    }),
    tanstackStart({
      srcDirectory: 'src',
    }),
    {
      // MDX must transform `.mdx` → JSX before the React plugin runs.
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
          remarkGfm,
          remarkCodeBlocks,
          remarkHeadings,
        ],
      }),
    },
    viteReact(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  esbuild: {
    // We need to disable minification of identifiers to preserve React component names in auto generated code snippets (see `reactElementToJSXString` in file:///./app/ui/component-preview.tsx).
    minifyIdentifiers: false,
  },
});
