import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'component',
  title: 'Components',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'content',
    }),
    defineField({
      name: 'propsComponents',
      title: 'Components to display props for',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
    }),
  ],
});
