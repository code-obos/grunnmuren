import { defineType } from 'sanity';
import { content, name, resourceLinks, slug } from '../fields';

export default defineType({
  name: 'info',
  title: 'Info',
  type: 'document',
  fields: [name, slug, content, resourceLinks],
});
