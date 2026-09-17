import { afterEach, beforeAll, expect } from 'vitest';
import { page } from 'vitest/browser';

// Imported for its side effects, and last on purpose: the font and animation
// overrides have to win over the preview's stylesheet. See the file header.
import './test-styles.css';

// The faces the stories actually render in. `document.fonts.ready` alone isn't enough,
// a face is only fetched once something uses it, so the first stories would be captured
// in the Arial fallback.
const SNAPSHOT_FONTS = [
  '400 16px OBOSText',
  'italic 400 16px OBOSText',
  '500 16px OBOSText',
  'italic 500 16px OBOSText',
  '600 16px OBOSDisplay',
];

// Per item, not for the whole wait. A single element that never settles then costs
// this much instead of stalling everything behind it.
const MEDIA_TIMEOUT_MS = 2_000;

const settled = (promise: Promise<unknown>) =>
  Promise.race([
    promise.catch(() => undefined),
    new Promise((resolve) => setTimeout(resolve, MEDIA_TIMEOUT_MS)),
  ]);

const once = (target: HTMLMediaElement, event: string) =>
  new Promise((resolve) => target.addEventListener(event, resolve, { once: true }));

/**
 * Holds a video on its first frame, so the screenshot doesn't depend on playback.
 * Seeking before the video has data is the trap: `seeked` never fires, and the
 * screenshot ends up being of an empty video element.
 */
const freezeVideo = async (video: HTMLVideoElement) => {
  video.pause();

  if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    await settled(once(video, 'loadeddata'));
  }

  if (video.currentTime === 0) return;

  video.currentTime = 0;
  await settled(once(video, 'seeked'));
};

/**
 * A `loading="lazy"` image that hasn't started loading never resolves `decode()`,
 * so give every image its own deadline rather than waiting on the slowest one.
 */
const waitForImage = (image: HTMLImageElement) =>
  image.complete ? undefined : settled(image.decode());

/** Lets style and layout settle before anything is captured. */
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));

const waitForMedia = () =>
  Promise.all([
    ...[...document.images].map(waitForImage),
    ...[...document.querySelectorAll('video')].map(freezeVideo),
  ]);

beforeAll(async () => {
  const loaded = await Promise.all(SNAPSHOT_FONTS.map((font) => document.fonts.load(font)));
  await document.fonts.ready;

  // A missing face means every snapshot silently renders in Arial, which looks like a
  // spacing regression in 260-odd images instead of one clear error.
  const missing = SNAPSHOT_FONTS.filter((_, index) => loaded[index].length === 0);

  if (missing.length > 0) {
    throw new Error(`Snapshot fonts did not load: ${missing.join(', ')}`);
  }
});

// Every story is a screenshot. Portalled content (modals, drawers, popovers) renders
// outside `#storybook-root`, so capture the body rather than the story root.
afterEach(async () => {
  await waitForMedia();
  await nextFrame();

  // The assertion belongs in the hook on purpose: it's the same for all 260-odd
  // stories, and adding it to each story file by hand is how it goes stale.
  // oxlint-disable-next-line jest/no-standalone-expect
  await expect(page.elementLocator(document.body)).toMatchScreenshot();
});
