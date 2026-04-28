import { createClient, type ClientPerspective, type QueryParams } from '@sanity/client';

import { DATASET, PROJECT_ID } from '../../util/env';
import { getSanityPreviewAuth } from './sanity-preview-auth';

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2026-04-27',
  useCdn: true,
});

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  perspective,
}: {
  query: QueryString;
  params?: QueryParams;
  perspective?: ClientPerspective;
}) {
  const previewAuth = await getSanityPreviewAuth();
  const token = process.env.SANITY_READ_TOKEN;
  const resolvedPerspective = perspective ?? (previewAuth.enabled ? 'drafts' : 'published');

  if (resolvedPerspective === 'drafts' && !token) {
    throw new Error('Cannot fetch draft content without SANITY_READ_TOKEN');
  }

  const fetchClient =
    resolvedPerspective === 'drafts' && token
      ? client.withConfig({
          useCdn: false,
          perspective: resolvedPerspective,
          token,
          stega: {
            enabled: true,
            studioUrl: previewAuth.studioUrl,
          },
        })
      : client.withConfig({
          perspective: resolvedPerspective,
        });

  const { result } = await fetchClient.fetch(query, params, {
    filterResponse: false,
  });

  return { data: result };
}
