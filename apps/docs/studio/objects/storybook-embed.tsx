import { defineField, defineType } from 'sanity';

const storybookEmbed = defineType({
  name: 'storybook-embed',
  title: 'Storybook Embed',
  description:
    "For editable code snippets that also can control rendering. Use 'Static Code Block' for static, non editable code snippets.",
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
            rel="noopener"
          >
            Grunnmuren's storybook
          </a>
          .
        </>
      ),
      type: 'string',
      validation: (rule) => rule.required(),
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
