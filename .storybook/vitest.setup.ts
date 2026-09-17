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

// A `loading="lazy"` image that never enters the viewport never resolves, and the
// stories that pull images off cdn.sanity.io are at the mercy of the network. Cap the
// wait rather than letting the hook time out.
const MEDIA_TIMEOUT_MS = 10_000;

const waitForImages = () =>
  Promise.all(
    [...document.images]
      .filter((image) => !image.complete)
      // A broken src rejects, and a story that renders one is still worth capturing
      .map((image) => image.decode().catch(() => undefined)),
  );

/** Holds every video on the first frame, so the screenshot doesn't depend on playback. */
const freezeVideos = () =>
  Promise.all(
    [...document.querySelectorAll('video')]
      .map((video) => {
        video.pause();
        return video;
      })
      .filter((video) => video.currentTime !== 0)
      .map(
        (video) =>
          new Promise((resolve) => {
            video.addEventListener('seeked', resolve, { once: true });
            video.currentTime = 0;
          }),
      ),
  );

/** Lets style and layout settle before anything is captured. */
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));

const waitForMedia = () =>
  Promise.race([
    Promise.all([waitForImages(), freezeVideos()]),
    new Promise((resolve) => setTimeout(resolve, MEDIA_TIMEOUT_MS)),
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
