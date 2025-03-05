import { defineField } from 'sanity';

export const name = defineField({
  name: 'name',
  title: 'Name',
  type: 'string',
  validation: (rule) => rule.required(),
});
