import { defineField, defineType } from 'sanity';

import storybookData from '../../public/storybook/index.json' with {
  type: 'json',
};

const options: Array<{ title: string; value: string }> = [];

for (const entry of Object.values(storybookData.entries)) {
  // We only want the stories themselves, not the docs
  if (entry.type === 'story') {
    options.push({
      title: `${entry.title}: ${entry.name}`,
      value: entry.id,
    });
  }
}

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
      type: 'storybookId',
      validation: (rule) => rule.required(),
      // options: {
      //   list: options,
      // },
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
