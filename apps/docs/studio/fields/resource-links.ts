import { defineField } from 'sanity';

export const resourceLinks = defineField({
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
              { title: 'Other', value: 'other' },
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
        {
          name: 'text',
          type: 'string',
          title: 'Text',
          hidden: ({ parent }) => parent.linkType !== 'other',
        },
      ],
    },
  ],
});
