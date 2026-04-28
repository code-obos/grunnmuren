import { createClient, type ClientPerspective, type QueryParams } from '@sanity/client';

import { DATASET, PROJECT_ID } from '../../util/env';
import { getSanityPreviewAuth } from './sanity-preview-auth';

let browserDraftTokenPromise: Promise<string | null> | null = null;

async function getBrowserDraftToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!browserDraftTokenPromise) {
    browserDraftTokenPromise = fetch('/api/draft-token')
      .then(async (response) => {
        if (!response.ok) {
          return null;
        }

        const body = (await response.json()) as { token?: string };
        return body.token ?? null;
      })
      .catch(() => null);
  }

  return browserDraftTokenPromise;
}

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
  const resolvedPerspective = perspective ?? (previewAuth.enabled ? 'drafts' : 'published');
  let token: string | null | undefined = process.env.SANITY_VIEWER_TOKEN;

  if (resolvedPerspective === 'drafts' && !token) {
    token = await getBrowserDraftToken();
  }

  const canUseDrafts = resolvedPerspective === 'drafts' && Boolean(token);
  const effectivePerspective = canUseDrafts ? 'drafts' : 'published';

  const fetchClient = canUseDrafts
    ? client.withConfig({
        useCdn: false,
        perspective: effectivePerspective,
        token: token ?? undefined,
        stega: {
          enabled: true,
          studioUrl: previewAuth.studioUrl,
        },
      })
    : client.withConfig({
        perspective: effectivePerspective,
      });

  const { result } = await fetchClient.fetch(query, params, {
    filterResponse: false,
  });

  return { data: result };
}
