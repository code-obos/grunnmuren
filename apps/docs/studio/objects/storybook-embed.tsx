import { defineField, defineType } from 'sanity';

const storybookEmbed = defineType({
  name: 'storybook-embed',
  title: 'Storybook Embed',
  description: 'For embedding Storybook stories as component previews.',
  type: 'object',
  fields: [
    defineField({
      name: 'storyId',
      title: 'Story ID',
      description: (
        <>
          The story to embed. See{' '}
          <a
            href="https://grunnmuren.obos.no/storybook/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Grunnmuren's storybook
          </a>
          .
        </>
      ),
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      description: 'A description or summary of the story embed.',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      storyId: 'storyId',
    },
    prepare: ({ storyId }) => ({
      title: 'Storybook embed',
      subtitle: storyId,
    }),
  },
});

export { storybookEmbed as default };
