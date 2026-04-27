import { createClient, type QueryParams } from '@sanity/client';

import { getSanityPreviewAuth } from './sanity-preview-auth';

export const client = createClient({
  projectId: 'tq6w17ny',
  dataset: 'grunnmuren',
  apiVersion: '2024-09-18',
  useCdn: true,
});

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
}: {
  query: QueryString;
  params?: QueryParams;
}) {
  const previewAuth = await getSanityPreviewAuth();
  const token = process.env.SANITY_READ_TOKEN;

  const fetchClient =
    previewAuth.enabled && token
      ? client.withConfig({
          useCdn: false,
          perspective: 'drafts',
          token,
          stega: {
            enabled: true,
            studioUrl: previewAuth.studioUrl,
          },
        })
      : client;

  const { result } = await fetchClient.fetch(query, params, {
    filterResponse: false,
  });

  return { data: result };
}
