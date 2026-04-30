import { obosAuthStore } from '@code-obos/sanity-auth';
import { assist } from '@sanity/assist';
import { codeInput } from '@sanity/code-input';
import { table } from '@sanity/table';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';

import { presentationResolve } from './studio/lib/resolve';
import { schemaTypes } from './studio/schema-types';
import { API_VERSION, DATASET, PROJECT_ID } from './util/env';

export default defineConfig({
  projectId: PROJECT_ID,
  dataset: DATASET,
  basePath: '/studio',
  title: 'Grunnmuren',
  auth: obosAuthStore({ dataset: DATASET }),
  plugins: [
    structureTool({
      structure: async (S, context) => {
        const CATEGORIES = await context
          .getClient({ apiVersion: API_VERSION })
          .fetch(`(*[_type == "category"])`);

        return S.list()
          .title('Content')
          .items([
            S.listItem()
              .id('menuAndCategories')
              .title('Menu and categories')
              .child(
                S.list()
                  .title('Menu and categories')
                  .items([
                    // Our singleton type has a list item with a custom child
                    S.listItem().title('Menu').id('menu').child(
                      // Instead of rendering a list of documents, we render a single
                      // document, specifying the `documentId` manually to ensure
                      // that we're editing the single instance of the document
                      S.document().title('Menu').schemaType('menu').documentId('menu'),
                    ),
                    S.divider(),
                    ...CATEGORIES.map((category) => {
                      return S.listItem().title(category.title).id(category._id).child(
                        // Instead of rendering a list of documents, we render a single
                        // document, specifying the `documentId` manually to ensure
                        // that we're editing the single instance of the document
                        S.document()
                          .title(category.title)
                          .schemaType(category._type)
                          .documentId(category._id),
                      );
                    }),
                  ]),
              ),
            S.divider(),
            S.documentTypeListItem('component').title('Components'),
            S.documentTypeListItem('info').title('Info'),
          ]);
      },
    }),
    visionTool(),
    presentationTool({
      resolve: presentationResolve,
      previewUrl: {
        previewMode: {
          enable: `/api/preview`,
        },
      },
      allowOrigins: ['http://localhost:*', 'https://grunnmuren.obos.no'],
    }),
    codeInput(),
    table(),
    assist(),
  ],
  schema: {
    types: schemaTypes,
  },
  mediaLibrary: {
    enabled: true,
  },
  // Remove Sanity's asset library that's connected to the dataset.
  // we want the (organization wide) media library only
  // ref https://www.sanity.io/docs/media-library/configure-studio#k948a9e8d13e6
  form: {
    // Disable the default for image assets
    image: {
      assetSources: (sources) => sources.filter((source) => source.name !== 'sanity-default'),
    },
    // Disable the default for file assets
    file: {
      assetSources: (sources) => sources.filter((source) => source.name !== 'sanity-default'),
    },
  },
  document: {
    newDocumentOptions: (templateItems, { creationContext }) => {
      // Define the singleton document types
      const singletonTypes = new Set(['menu']);
      // Check if the context is that of the top level "Create" button in the header
      if (creationContext.type === 'global') {
        const nonSingletonTemplateItems = [] as typeof templateItems;
        for (const item of templateItems) {
          if (!singletonTypes.has(item.templateId)) {
            nonSingletonTemplateItems.push(item);
          }
        }
        return nonSingletonTemplateItems;
      }

      return templateItems;
    },
  },
});
