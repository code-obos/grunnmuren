import createImageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from './sanity';

export const imageUrlBuilder = createImageUrlBuilder(client);

export const urlForImage = (source: SanityImageSource) => {
  return imageUrlBuilder?.image(source).auto('format');
};
