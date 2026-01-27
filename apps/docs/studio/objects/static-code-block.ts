import { defineField, defineType } from 'sanity';

const codeBlock = defineType({
  name: 'static-code-block',
  title: 'Code Block',
  description: 'Code snippets',
  type: 'object',
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'code',
      options: {
        language: 'tsx',
        languageAlternatives: [
          { title: 'TypeScript / React', value: 'tsx' },
          { title: 'Bash', value: 'bash' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      description: 'A description or summary of the code',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      caption: 'caption',
    },
    prepare({ caption }) {
      return {
        title: 'Code block',
        subtitle: caption,
      };
    },
  },
});

export { codeBlock as default };
