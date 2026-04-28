import { createClient, type QueryParams } from '@sanity/client';

export const client = createClient({
  projectId: 'tq6w17ny',
  dataset: 'grunnmuren',
  apiVersion: '2024-09-18',
  useCdn: true,
  perspective: 'published',
});

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  client: _client = client,
}: {
  query: QueryString;
  params?: QueryParams;
  client?: typeof client;
}) {
  // Not sure what's happening here, but I need to set filterReponse to false to get the data as an array?
  const { result } = await _client.fetch(query, params, {
    filterResponse: false,
  });

  return { data: result };
}
