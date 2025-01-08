import { defineType } from 'sanity';

const content = defineType({
  name: 'content',
  title: 'Content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Text', value: 'normal' },
        { title: 'Large heading', value: 'h2' },
        { title: 'Medium heading', value: 'h3' },
        { title: 'Small heading', value: 'h4' },
        { title: 'Tiny heading', value: 'h5' },
        { title: 'Quote', value: 'blockquote' },
      ],
    },
    { type: 'live-code-block' },
    { type: 'static-code-block' },
  ],
});

export { content as default };
