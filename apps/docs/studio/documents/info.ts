import { defineType } from 'sanity';
import { name, slug, resourceLinks, content } from 'studio/fields';

export default defineType({
  name: 'info',
  title: 'Info',
  type: 'document',
  fields: [name, slug, content, resourceLinks],
});
