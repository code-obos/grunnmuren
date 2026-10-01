/**
 * Serves everything a story loads from another host out of committed files, so the
 * screenshots don't depend on the network. The stories use images from cdn.sanity.io
 * and friends, and a slow response gets captured half-loaded. The stories themselves
 * keep the real URLs, so Storybook is unchanged.
 *
 * A fixture is the exact response Chromium got, recorded with its own request headers:
 * `auto=format` hands out AVIF or WebP depending on `Accept`, and anything else would
 * render differently from the baselines. Record new ones with
 * `pnpm test:screenshots:media` after adding a remote URL to a story. Unlike the
 * baselines that's fine to do locally, it only saves what the server sends back.
 */

// For the Playwright `context` on the command context
/// <reference types="@vitest/browser-playwright" />

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join } from 'node:path';

import type { BrowserContext, Route } from 'playwright';
import type { BrowserCommand } from 'vitest/node';

declare module 'vitest/browser' {
  interface BrowserCommands {
    serveRemoteMedia: () => Promise<void>;
    takeUnservedMedia: () => Promise<Array<string>>;
  }
}

type Fixture = { file: string; status: number; contentType: string };

const FIXTURES_DIR = join(import.meta.dirname, 'media-fixtures');
const MANIFEST_PATH = join(FIXTURES_DIR, 'manifest.json');

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);

// `tailwind-base.css` still asks for these, even though the faces in test-styles.css win.
// They're the same files as the ones in the repo, so no need for a copy.
const FONTS_URL = 'https://www.obos.no/fonts/';
const FONTS_DIR = join(import.meta.dirname, '../packages/tailwind/fonts');

const CORS_HEADERS = { 'access-control-allow-origin': '*' };

const EXTENSIONS: Record<string, string> = {
  'image/avif': 'avif',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/svg+xml': 'svg',
  'image/webp': 'webp',
  'video/mp4': 'mp4',
};

const recording = process.env.RECORD_REMOTE_MEDIA === '1';

const manifest: Record<string, Fixture> = existsSync(MANIFEST_PATH)
  ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
  : {};

// Keyed by context since that's what the route is registered on, and Vitest gives each
// session its own. Also how a second test file in the same session skips registering.
const unserved = new WeakMap<BrowserContext, Set<string>>();

const isRemote = (url: URL) => url.protocol.startsWith('http') && !LOCAL_HOSTS.has(url.hostname);

/** Readable enough to find in a diff, with a hash since only the query may differ. */
const fixtureFile = (url: URL, contentType: string) => {
  const name = basename(decodeURIComponent(url.pathname), extname(url.pathname));
  const hash = createHash('sha1').update(url.href).digest('hex').slice(0, 8);
  const extension = EXTENSIONS[contentType.split(';')[0]] ?? 'bin';

  return `${url.hostname}/${name}-${hash}.${extension}`;
};

const record = async (route: Route) => {
  const url = route.request().url();

  // A video asks for a byte range, and the fixture has to be the whole file
  const { range: _range, ...headers } = route.request().headers();
  const response = await route.fetch({ headers });
  const body = await response.body();
  const contentType = response.headers()['content-type'] ?? 'application/octet-stream';
  const file = fixtureFile(new URL(url), contentType);

  mkdirSync(dirname(join(FIXTURES_DIR, file)), { recursive: true });
  writeFileSync(join(FIXTURES_DIR, file), body);

  manifest[url] = { file, status: response.status(), contentType };
  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  );
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(sorted, null, 2)}\n`);

  await route.fulfill({ response, body });
};

const serve = async (route: Route, misses: Set<string>) => {
  const url = route.request().url();
  const fixture = manifest[url];

  // Blocked rather than let through, so a story that loads something new fails every
  // time instead of only when the network is slow
  if (!fixture) {
    misses.add(url);
    await route.abort('blockedbyclient');
    return;
  }

  await route.fulfill({
    status: fixture.status,
    contentType: fixture.contentType,
    headers: CORS_HEADERS,
    path: join(FIXTURES_DIR, fixture.file),
  });
};

const handle = (route: Route, misses: Set<string>) => {
  const url = new URL(route.request().url());

  if (url.href.startsWith(FONTS_URL)) {
    return route.fulfill({
      contentType: 'font/woff2',
      headers: CORS_HEADERS,
      path: join(FONTS_DIR, basename(url.pathname)),
    });
  }

  return recording ? record(route) : serve(route, misses);
};

export const serveRemoteMedia: BrowserCommand<[]> = async ({ context }) => {
  if (unserved.has(context)) return;

  const misses = new Set<string>();
  unserved.set(context, misses);

  await context.route(isRemote, (route) => handle(route, misses));
};

/** The remote URLs this session asked for that have no fixture. Cleared on read. */
export const takeUnservedMedia: BrowserCommand<[]> = ({ context }) => {
  const misses = unserved.get(context);
  if (!misses) return [];

  const urls = [...misses];
  misses.clear();

  return urls;
};
