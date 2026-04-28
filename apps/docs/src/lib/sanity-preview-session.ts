import { jwtVerify, SignJWT } from 'jose';

type PreviewSession = {
  mode: 'preview';
  projectId: string;
  dataset: string;
};

const COOKIE_NAME = 'sanity-preview-session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function getJwtSecret() {
  const secret = process.env.SANITY_PREVIEW_JWT_SECRET;

  if (!secret) {
    throw new Error('Missing SANITY_PREVIEW_JWT_SECRET environment variable');
  }

  return new TextEncoder().encode(secret);
}

function parseCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) {
    return {} as Record<string, string>;
  }

  return cookieHeader.split(';').reduce<Record<string, string>>((acc, part) => {
    const [rawName, ...rawValueParts] = part.trim().split('=');

    if (!rawName) {
      return acc;
    }

    const rawValue = rawValueParts.join('=');
    acc[rawName] = decodeURIComponent(rawValue);
    return acc;
  }, {});
}

export function getPreviewSessionCookieName() {
  return COOKIE_NAME;
}

export async function createPreviewSessionToken(payload: PreviewSession) {
  const secret = getJwtSecret();

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(secret);
}

export async function verifyPreviewSessionToken(token: string) {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);

    if (
      payload.mode !== 'preview' ||
      typeof payload.projectId !== 'string' ||
      typeof payload.dataset !== 'string'
    ) {
      return null;
    }

    return {
      mode: payload.mode,
      projectId: payload.projectId,
      dataset: payload.dataset,
    } satisfies PreviewSession;
  } catch {
    return null;
  }
}

export async function getPreviewSessionFromRequest(request: Request) {
  const cookies = parseCookieHeader(request.headers.get('cookie'));
  const token = cookies[COOKIE_NAME];

  if (!token) {
    return null;
  }

  return await verifyPreviewSessionToken(token);
}

export function serializePreviewSessionCookie(token: string) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS}; HttpOnly; SameSite=Lax${secure}`;
}

export function serializeClearedPreviewSessionCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${secure}`;
}
