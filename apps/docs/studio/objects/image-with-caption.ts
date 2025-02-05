import { defineField, defineType } from 'sanity';

const imageWithCaption = defineType({
  name: 'image-with-caption',
  title: 'Image with caption',
  type: 'image',

  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
    }),
  ],
});

export { imageWithCaption as default };
