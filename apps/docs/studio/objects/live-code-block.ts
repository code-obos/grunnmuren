import { defineField, defineType } from 'sanity';

const codeBlock = defineType({
  name: 'live-code-block',
  title: 'Live Code Block',
  description:
    "For editable code snippets that also can control rendering. Use 'Static Code Block' for static, non editable code snippets.",
  type: 'object',
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'code',
      options: {
        language: 'tsx',
        languageAlternatives: [{ title: 'TypeScript / React', value: 'tsx' }],
      },
      validation: (rule) => rule.required(),
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
