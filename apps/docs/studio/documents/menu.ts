import { defineField, defineType } from 'sanity';

export const menu = defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'categories',
      title: 'Categories',
      description:
        'The items in the left menu. The order in sanity will be reflected in the app',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
  ],
});
