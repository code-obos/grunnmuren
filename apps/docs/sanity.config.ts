import { obosAuthStore } from '@code-obos/sanity-auth';
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
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
