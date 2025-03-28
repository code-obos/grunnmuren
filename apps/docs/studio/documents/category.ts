import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryItems',
      title: 'Category items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'info' }] }],
    }),
  ],
});
