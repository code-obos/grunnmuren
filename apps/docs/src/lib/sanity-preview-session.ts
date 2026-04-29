import {
  clearSession,
  updateSession,
  useSession,
} from '@tanstack/react-start/server';

export const PREVIEW_SESSION_COOKIE = 'sanity-preview-session';

/**
 * Encrypted cookie that marks a request as being in Sanity preview mode.
 *
 * The cookie just contains a `projectId` so we can:
 *   - verify the session belongs to the current Sanity project
 *   - know whether to fetch drafts in loaders / API routes
 *
 * TanStack Start's session utilities seal the value with
 * `SANITY_PREVIEW_SESSION_SECRET`, so it cannot be forged client-side.
 */

const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

type PreviewSessionData = {
  projectId?: string;
};

function getSessionConfig() {
  const password = process.env.SANITY_PREVIEW_SESSION_SECRET;

  if (!password) {
    throw new Error('Missing SANITY_PREVIEW_SESSION_SECRET environment variable');
  }

  return {
    password,
    name: PREVIEW_SESSION_COOKIE,
    maxAge: ONE_WEEK_SECONDS,
    cookie: {
      path: '/',
      // SameSite=None + Secure is required so the cookie works inside the
      // Sanity Studio iframe (cross-origin). HttpOnly is intentionally
      // disabled so client code can detect preview mode via document.cookie.
      sameSite: 'none' as const,
      secure: true,
      httpOnly: false,
    },
  };
}

/** Read and decrypt the preview session. Returns `{}` if no session. */
export async function getPreviewSession(): Promise<PreviewSessionData> {
  const session = await useSession<PreviewSessionData>(getSessionConfig());
  return session.data;
}

/** Activate preview mode by sealing the given data into the session cookie. */
export async function commitPreviewSession(data: PreviewSessionData): Promise<void> {
  await updateSession(getSessionConfig(), data);
}

/** Clear the preview session cookie. */
export async function destroyPreviewSession(): Promise<void> {
  await clearSession(getSessionConfig());
}
