import { defineField, defineType } from 'sanity';

const codeBlock = defineType({
  name: 'code-block',
  title: 'Code Block',
  description:
    "Great for simple code snippets that doesn't vary based on the language selected",
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
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      description: 'A description or summary of the code',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
    },
  },
});

export { codeBlock as default };
