import { obosAuthStore } from '@code-obos/sanity-auth';
import { codeInput } from '@sanity/code-input';
import { table } from '@sanity/table';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { defineDocuments, presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './studio/schema-types';

const dataset = 'grunnmuren';

export default defineConfig({
  projectId: 'tq6w17ny',
  dataset,
  basePath: '/studio',
  title: 'Grunnmuren - Sanity Studio',
  auth: obosAuthStore({ dataset }),
  plugins: [
    structureTool({
      structure: async (S, context) => {
        const CATEGORIES = await context
          .getClient({ apiVersion: '2025-03-21' })
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
                    S.listItem()
                      .title('Menu')
                      .id('menu')
                      .child(
                        // Instead of rendering a list of documents, we render a single
                        // document, specifying the `documentId` manually to ensure
                        // that we're editing the single instance of the document
                        S.document()
                          .title('Menu')
                          .schemaType('menu')
                          .documentId('menu'),
                      ),
                    S.divider(),
                    ...CATEGORIES.map((category) => {
                      return S.listItem()
                        .title(category.title)
                        .id(category._id)
                        .child(
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
    codeInput(),
    table(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/preview-mode/enable',
          disable: '/api/preview-mode/disable',
        },
      },
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/komponenter/:slug',
            filter: `_type == "component" && slug.current == $slug`,
          },
        ]),
      },
    }),
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
      assetSources: (sources) =>
        sources.filter((source) => source.name !== 'sanity-default'),
    },
    // Disable the default for file assets
    file: {
      assetSources: (sources) =>
        sources.filter((source) => source.name !== 'sanity-default'),
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
