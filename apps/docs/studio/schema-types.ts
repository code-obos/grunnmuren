import component from './documents/component';
import content from './objects/content';
import imageWithCaption from './objects/image-with-caption';
import liveCodeBlock from './objects/live-code-block';
import staticCodeBlock from './objects/static-code-block';

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types
export const schemaTypes = [
  component,
  content,
  staticCodeBlock,
  liveCodeBlock,
  imageWithCaption,
];
