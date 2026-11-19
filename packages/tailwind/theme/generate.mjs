// @ts-check
import { parseColor } from './contrast.mjs';

/**
 * Where each variant sits in OKLCH: `lightness` is absolute, `chroma` is the share of the
 * input colour's chroma. Calibrated against Grunnmuren's own roles, so a colour comes out
 * as dark or as light as OBOS' whatever its lightness going in, and keeps the contrast.
 * @type {Record<string, { lightness: number; chroma: number }>}
 */
const TARGETS = {
  'background-default': { lightness: 1, chroma: 0 },
  'background-tinted': { lightness: 0.9638, chroma: 0.0621 },
  'surface-default': { lightness: 1, chroma: 0 },
  'surface-tinted': { lightness: 0.9638, chroma: 0.0621 },
  'surface-hover': { lightness: 0.9413, chroma: 0.1034 },
  'surface-active': { lightness: 0.9062, chroma: 0.164 },
  'border-subtle': { lightness: 0.8838, chroma: 0.2042 },
  'border-default': { lightness: 0.4421, chroma: 1 },
  'border-strong': { lightness: 0.3976, chroma: 0.8877 },
  'text-subtle': { lightness: 0.3976, chroma: 0.8877 },
  'text-default': { lightness: 0.2842, chroma: 0.6846 },
  'base-default': { lightness: 0.4421, chroma: 1 },
  'base-hover': { lightness: 0.3976, chroma: 0.8877 },
  'base-active': { lightness: 0.36, chroma: 0.7869 },
  'base-contrast-subtle': { lightness: 0.9413, chroma: 0.1034 },
  'base-contrast-default': { lightness: 1, chroma: 0 },
};

// sRGB to linear light and back
/** @param {number} channel */
const toLinear = (channel) => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};
/** @param {number} value */
const fromLinear = (value) =>
  255 * (value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055);

// The matrices are Björn Ottosson's, https://bottosson.github.io/posts/oklab/
/** @param {{ red: number; green: number; blue: number }} color */
const toChromaAndHue = ({ red, green, blue }) => {
  const [r, g, b] = [red, green, blue].map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { chroma: Math.hypot(a, bb), hue: Math.atan2(bb, a) };
};

/** sRGB channels from 0 to 255, outside that range when the colour is out of gamut @param {number} lightness @param {number} chroma @param {number} hue */
const fromOklch = (lightness, chroma, hue) => {
  const a = Math.cos(hue) * chroma;
  const b = Math.sin(hue) * chroma;
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map(fromLinear);
};

/** @param {Array<number>} channels */
const toHex = (channels) =>
  `#${channels
    .map((channel) =>
      Math.round(Math.min(255, Math.max(0, channel)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')
    .toUpperCase()}`;

// Half a step either side, since the channels get rounded anyway
const inGamut = (/** @type {Array<number>} */ channels) =>
  channels.every((channel) => channel >= -0.5 && channel <= 255.5);

/**
 * The colour at `lightness` and `hue` with as much of `chroma` as sRGB can show, so the
 * lightness, and with it the contrast, holds when a saturated colour doesn't fit.
 * @param {number} lightness @param {number} chroma @param {number} hue
 */
const toGamut = (lightness, chroma, hue) => {
  let low = 0;
  let high = chroma;
  for (let step = 0; step < 24; step++) {
    const middle = (low + high) / 2;
    if (inGamut(fromOklch(lightness, middle, hue))) {
      low = middle;
    } else {
      high = middle;
    }
  }
  return toHex(fromOklch(lightness, low, hue));
};

/**
 * Every variant of a role from one colour. Documented in index.d.mts.
 * @param {string} color
 * @returns {Record<string, string>}
 */
export const generateRole = (color) => {
  const parsed = parseColor(color);
  if (!parsed) {
    throw new Error(`Expected a hex or rgb() colour, got \`${color}\``);
  }
  const { chroma, hue } = toChromaAndHue(parsed);
  return Object.fromEntries(
    Object.entries(TARGETS).map(([variant, target]) => [
      variant,
      toGamut(target.lightness, chroma * target.chroma, hue),
    ]),
  );
};
