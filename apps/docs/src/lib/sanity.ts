import { createClient, type QueryParams } from '@sanity/client';

import { API_VERSION, DATASET, PROJECT_ID } from '../../util/env';
import { loadSanityQueryOptions } from './sanity-query-options';

/**
 * Default published-content client. Uses the CDN and never has access to
 * draft content. Suitable for any non-preview, public read.
 */
export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  useCdn: true,
});

/**
 * Fetch a Sanity document, automatically swapping in the preview client
 * (drafts perspective + viewer token + stega) when the request has an
 * active preview session.
 *
 * Loaders simply call `sanityFetch({ query, params })` — no need to care
 * about whether we're in preview mode.
 */
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
}: {
  query: QueryString;
  params?: QueryParams;
}) {
  const { options } = await loadSanityQueryOptions();
  const fetchClient = client.withConfig(options);

  const { result } = await fetchClient.fetch(query, params, {
    filterResponse: false,
  });

  return { data: result };
}
