import type { QueryParams } from '@sanity/client';
import { createServerFn } from '@tanstack/start';
import { previewMiddleware } from './preview-middleware';
import { sanityFetch as _sanityFetch, client } from './sanity';

export const sanityFetch = createServerFn({ method: 'GET' })
  .middleware([previewMiddleware])
  .validator((data: { query: string; params: QueryParams }) => data)
  .handler(async ({ data, context }) => {
    const { query, params } = data;

    if (context.previewMode) {
      const previewClient = client.withConfig({
        perspective: 'previewDrafts',
        token: process.env.SANITY_VIEWER_TOKEN, // Needed for accessing previewDrafts perspective
        useCdn: false, // the previewDrafts perspective requires this to be `false
      });
      return _sanityFetch({ query, params, client: previewClient });
    }

    return _sanityFetch({ query, params });
  });
