import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'component',
  title: 'Komponenter',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: "name",
      },
    }),
  ],
});
