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
                      console.log(category);
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
  ],
  schema: {
    types: schemaTypes,
  },
});
