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
      name: 'documentationIsReady',
      title: 'Documentation is ready',
      type: 'boolean',
      description: 'Check this when the documentation is ready',
    }),
    defineField({
      name: 'highlightAsNew',
      type: 'boolean',
      title: 'Highlight as a new component',
      description: 'Check this if the component is new',
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
    defineField({
      name: 'resourceLinks',
      title: 'Resource links',
      description:
        'Add links to GitHub or Figma here (only GitHub and Figma is supported)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'resourceLink',
          title: 'Resource link',
          fields: [
            {
              name: 'linkType',
              type: 'string',
              title: 'Link type',
              options: {
                list: [
                  { title: 'Figma', value: 'figma' },
                  { title: 'GitHub', value: 'github' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
});
