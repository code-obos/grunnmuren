/// <reference types="vite/client" />

/*
 * The images and video the stories use, committed instead of loaded from cdn.sanity.io and
 * friends. A slow response got captured half-loaded in the screenshot run.
 *
 * The AVIFs are what Sanity served for `?auto=format`, which is what the baselines were
 * taken with. Imported rather than linked so Vite gets the URL right under the docs
 * site's /storybook/ base as well as in the test runner.
 */
export { default as movingDay } from './media/moving-day.avif';
export { default as newApartmentBlocks } from './media/new-apartment-blocks.avif';
export { default as nordrLogo } from './media/nordr-logo.png';
export { default as obosLogo } from './media/obos-logo.svg';
export { default as obosLogoBlue } from './media/obos-logo-blue.avif';
export { default as office } from './media/office.avif';
export { default as podcastStudio } from './media/podcast-studio.avif';
export { default as portrait } from './media/portrait.avif';
export { default as residentialArea } from './media/residential-area.avif';
export { default as videoLoop } from './media/video-loop.mp4';
