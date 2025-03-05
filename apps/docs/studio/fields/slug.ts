import { defineField } from 'sanity';

export const slug = defineField({
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: {
    source: 'name',
  },
  validation: (rule) => rule.required(),
});
