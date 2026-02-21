import { defineArrayMember, defineField, defineType } from 'sanity';
import { content, name, resourceLinks, slug } from '../fields';

export default defineType({
  name: 'component',
  title: 'Components',
  type: 'document',
  fields: [
    name,
    slug,
    defineField({
      name: 'componentState',
      title: 'Component state',
      type: 'string',
      description: 'The current state of the component',
      options: {
        list: ['beta', 'new', 'stable', 'deprecated'],
        layout: 'radio',
      },
      initialValue: 'stable',
      validation: (rule) => rule.required(),
    }),
    content,
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
    resourceLinks,
  ],
});
