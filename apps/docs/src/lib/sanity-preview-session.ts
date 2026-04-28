import { sealData, unsealData } from 'iron-session';

/**
 * Encrypted cookie that marks a request as being in Sanity preview mode.
 *
 * The cookie just contains a `projectId` so we can:
 *   - verify the session belongs to the current Sanity project
 *   - know whether to fetch drafts in loaders / API routes
 *
 * `iron-session` seals the value with `SANITY_PREVIEW_SESSION_SECRET`,
 * so it cannot be forged client-side.
 */

export const PREVIEW_SESSION_COOKIE = 'sanity-preview-session';

const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

type PreviewSessionData = {
  projectId?: string;
};

function getSessionOptions() {
  const password = process.env.SANITY_PREVIEW_SESSION_SECRET;

  if (!password) {
    throw new Error('Missing SANITY_PREVIEW_SESSION_SECRET environment variable');
  }

  return { password, ttl: ONE_WEEK_SECONDS };
}

/** Read and decrypt the preview session from a Request. Returns `{}` if no session. */
export async function getPreviewSession(request: Request): Promise<PreviewSessionData> {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return {};

  const match = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${PREVIEW_SESSION_COOKIE}=`));

  if (!match) return {};

  const value = decodeURIComponent(match.slice(PREVIEW_SESSION_COOKIE.length + 1));
  if (!value) return {};

  try {
    return await unsealData<PreviewSessionData>(value, getSessionOptions());
  } catch (error) {
    console.warn('[preview-session] Failed to unseal cookie:', error);
    return {};
  }
}

/** Build a Set-Cookie header value that activates preview mode. */
export async function commitPreviewSession(data: PreviewSessionData): Promise<string> {
  const sealed = await sealData(data, getSessionOptions());
  // SameSite=None + Secure is required so the cookie works inside the
  // Sanity Studio iframe (cross-origin). HttpOnly is intentionally omitted
  // so client code can detect preview mode by checking document.cookie.
  return `${PREVIEW_SESSION_COOKIE}=${encodeURIComponent(sealed)}; Path=/; Max-Age=${ONE_WEEK_SECONDS}; SameSite=None; Secure`;
}

/** Build a Set-Cookie header value that clears the preview cookie. */
export function destroyPreviewSession(): string {
  return `${PREVIEW_SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=None; Secure`;
}
