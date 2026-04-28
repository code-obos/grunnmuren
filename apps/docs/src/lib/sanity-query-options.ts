import type { ClientPerspective } from '@sanity/client';
import { createServerFn } from '@tanstack/react-start';

import { API_VERSION, DATASET, PROJECT_ID } from '../../util/env';
import { getPreviewSession } from './sanity-preview-session';

/**
 * Single source of truth for "should this request use Sanity preview mode?"
 * and "what client config should be used for that?".
 *
 * Loaders and API routes call this server function to get a consistent,
 * type-safe set of options. Stega and the viewer token are only included
 * when preview mode is active.
 *
 * Throws if preview mode is active but the viewer token is missing,
 * to surface configuration mistakes early.
 */
export const loadSanityQueryOptions = createServerFn({ method: 'GET' }).handler(async () => {
  const { getRequest } = await import('@tanstack/react-start/server');
  const request = getRequest();
  const session = await getPreviewSession(request);

  const isPreview = session.projectId === PROJECT_ID;

  if (isPreview && !process.env.SANITY_VIEWER_TOKEN) {
    throw new Error(
      `Cannot activate preview mode without a "SANITY_VIEWER_TOKEN" environment variable.\n` +
        `Create one with "Viewer" permissions at\n` +
        `https://sanity.io/manage/project/${PROJECT_ID}/api#tokens`,
    );
  }

  const studioUrl = '/studio';

  return {
    isPreview,
    studioUrl,
    options: {
      projectId: PROJECT_ID,
      dataset: DATASET,
      apiVersion: API_VERSION,
      perspective: (isPreview ? 'drafts' : 'published') as ClientPerspective,
      useCdn: !isPreview,
      token: isPreview ? process.env.SANITY_VIEWER_TOKEN : undefined,
      stega: isPreview ? { enabled: true, studioUrl } : undefined,
    },
  } as const;
});
