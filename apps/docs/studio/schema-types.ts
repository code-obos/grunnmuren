import { category } from './documents/category';
import component from './documents/component';
import info from './documents/info';
import { menu } from './documents/menu';
import content from './objects/content';
import imageWithCaption from './objects/image-with-caption';
import liveCodeBlock from './objects/live-code-block';
import staticCodeBlock from './objects/static-code-block';
import storybookEmbed from './objects/storybook-embed';

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types
export const schemaTypes = [
  component,
  info,
  menu,
  category,
  content,
  staticCodeBlock,
  liveCodeBlock,
  imageWithCaption,
  storybookEmbed,
];
