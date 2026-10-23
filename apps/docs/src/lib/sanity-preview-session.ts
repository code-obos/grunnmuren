import { deleteCookie, getCookie, setCookie } from '@tanstack/react-start/server';
import { sealData, unsealData } from 'iron-session';

export const PREVIEW_SESSION_COOKIE = 'sanity-preview-session';

/**
 * Encrypted cookie that marks a request as being in Sanity preview mode.
 *
 * The cookie just contains a `projectId` so we can:
 *   - verify the session belongs to the current Sanity project
 *   - know whether to fetch drafts in loaders / API routes
 *
 * iron-session seals the value with
 * `SANITY_PREVIEW_SESSION_SECRET`, so it cannot be forged client-side.
 */

const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

type PreviewSessionData = {
  projectId?: string;
};

function getPassword() {
  const password = process.env.SANITY_PREVIEW_SESSION_SECRET;

  if (!password) {
    throw new Error('Missing SANITY_PREVIEW_SESSION_SECRET environment variable');
  }

  return password;
}

const cookieOptions = {
  path: '/',
  // SameSite=None + Secure is required so the cookie works inside the
  // Sanity Studio iframe (cross-origin). HttpOnly is intentionally
  // disabled so client code can detect preview mode via document.cookie.
  sameSite: 'none',
  secure: true,
  httpOnly: false,
} as const;

/** Read and decrypt the preview session. Returns `{}` if no session. */
export async function getPreviewSession(): Promise<PreviewSessionData> {
  const seal = getCookie(PREVIEW_SESSION_COOKIE);
  if (!seal) {
    return {};
  }

  return unsealData<PreviewSessionData>(seal, { password: getPassword(), ttl: ONE_WEEK_SECONDS });
}

/** Activate preview mode by sealing the given data into the session cookie. */
export async function commitPreviewSession(data: PreviewSessionData): Promise<void> {
  const seal = await sealData(data, { password: getPassword(), ttl: ONE_WEEK_SECONDS });
  setCookie(PREVIEW_SESSION_COOKIE, seal, { ...cookieOptions, maxAge: ONE_WEEK_SECONDS });
}

/** Clear the preview session cookie. */
export async function destroyPreviewSession(): Promise<void> {
  deleteCookie(PREVIEW_SESSION_COOKIE, cookieOptions);
}
