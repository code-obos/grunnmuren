import { obosAuthStore } from '@code-obos/sanity-auth';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schema-types';

const dataset = 'grunnmuren';

export default defineConfig({
  projectId: 'tq6w17ny',
  dataset,
  basePath: '/studio',
  title: 'Grunnmuren - Sanity Studio',
  auth: obosAuthStore({ dataset }),
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
