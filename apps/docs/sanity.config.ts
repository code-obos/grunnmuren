import { obosAuthStore } from '@code-obos/sanity-auth';
import { codeInput } from '@sanity/code-input';
import { table } from '@sanity/table';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './studio/schema-types';

const dataset = 'grunnmuren';

export default defineConfig({
  projectId: 'tq6w17ny',
  dataset: 'grunnmuren',
  basePath: '/studio',
  title: 'Grunnmuren - Sanity Studio',
  auth: obosAuthStore({ dataset }),
  plugins: [structureTool(), visionTool(), codeInput(), table()],
  schema: {
    types: schemaTypes,
  },
});
