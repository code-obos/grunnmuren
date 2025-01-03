import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'component',
  title: 'Komponenter',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
});
