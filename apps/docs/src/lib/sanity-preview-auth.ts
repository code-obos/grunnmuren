import { createServerFn } from '@tanstack/react-start';

import { DATASET, PROJECT_ID } from '../../util/env';
import { getPreviewSessionCookieName, verifyPreviewSessionToken } from './sanity-preview-session';

const projectId = PROJECT_ID;
const dataset = DATASET;

export const getSanityPreviewAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { getCookie } = await import('@tanstack/react-start/server');
  const previewCookie = getCookie(getPreviewSessionCookieName());
  const previewSession = previewCookie ? await verifyPreviewSessionToken(previewCookie) : null;

  if (!previewSession) {
    return { enabled: false } as const;
  }

  if (previewSession.projectId !== projectId || previewSession.dataset !== dataset) {
    return { enabled: false } as const;
  }

  return {
    enabled: true,
    studioUrl: process.env.SANITY_STUDIO_URL ?? '/studio',
  } as const;
});

export async function getSanityPerspective() {
  const previewAuth = await getSanityPreviewAuth();

  return previewAuth.enabled ? 'drafts' : 'published';
}
