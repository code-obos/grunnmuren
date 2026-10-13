// @ts-check
// Not exported from the package. The theme builder and the token tests share it.
import colors from '../tokens/colors.json' with { type: 'json' };

/**
 * @import { ContrastPair, Rgba } from './contrast.d.mts'
 */

const CONTRAST_RULES = [
  // WCAG 2.2 AA 1.4.3
  {
    name: 'text on surface',
    minimum: 4.5,
    foregrounds: ['text-default', 'text-subtle'],
    // Hover and active too, since a row or a card stays readable while you point at it
    backgrounds: [
      'background-default',
      'background-tinted',
      'surface-default',
      'surface-tinted',
      'surface-hover',
      'surface-active',
    ],
  },
  {
    name: 'text in button',
    minimum: 4.5,
    // Subtle too, which Designsystemet also holds to 4.5:1 on the base colours
    foregrounds: ['base-contrast-default', 'base-contrast-subtle'],
    backgrounds: ['base-default', 'base-hover', 'base-active'],
  },
  // WCAG 2.2 AA 1.4.11
  // Every state, since a hovered or pressed button has to stand out from the page too
  {
    name: 'button on page',
    minimum: 3,
    foregrounds: ['base-default', 'base-hover', 'base-active'],
    backgrounds: ['background-default'],
  },
  {
    name: 'graphics on page',
    minimum: 3,
    foregrounds: ['border-default', 'border-strong'],
    backgrounds: ['background-default'],
  },
];

/** @type {ReadonlyArray<ContrastPair>} */
export const CONTRAST_PAIRS = colors.roles.flatMap(({ role }) =>
  CONTRAST_RULES.flatMap(({ name, minimum, foregrounds, backgrounds }) =>
    foregrounds.flatMap((foreground) =>
      backgrounds.map((background) => ({
        rule: name,
        minimum,
        foreground: `${role}.${foreground}`,
        background: `${role}.${background}`,
      })),
    ),
  ),
);

const HEX = /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i;
const RGB = /^rgba?\((.+)\)$/i;
const NUMBER = /^(\d*\.?\d+)(%?)$/;

/** @param {string} part @param {number} max */
const parseChannel = (part, max) => {
  const match = NUMBER.exec(part);
  if (!match) return undefined;
  const value = match[2] ? (Number(match[1]) / 100) * max : Number(match[1]);
  return value <= max ? value : undefined;
};

/**
 * The parts of an `rgb()`, in the legacy comma form `rgb(r, g, b[, a])` or the modern
 * `rgb(r g b[ / a])`. Undefined when it's neither, so the two can't be mixed.
 * @param {string} inside
 */
const rgbParts = (inside) => {
  if (inside.includes(',')) return inside.split(',').map((part) => part.trim());

  const [channels, alpha, ...rest] = inside.split('/').map((part) => part.trim());
  if (rest.length > 0 || alpha === '') return undefined;
  const parts = channels.split(/\s+/);
  if (parts.length !== 3) return undefined;
  return alpha == null ? parts : [...parts, alpha];
};

/**
 * A hex or `rgb()` colour as channels from 0 to 255 and alpha from 0 to 1, or undefined
 * when it's neither.
 * @param {string} value
 * @returns {Rgba | undefined}
 */
export const parseColor = (value) => {
  const color = value.trim();

  if (HEX.test(color)) {
    const hex = color.length <= 5 ? color.slice(1).replaceAll(/./g, '$&$&') : color.slice(1);
    const [red, green, blue, alpha = 255] = (hex.match(/../g) ?? []).map((pair) =>
      Number.parseInt(pair, 16),
    );
    return { red, green, blue, alpha: alpha / 255 };
  }

  const inside = RGB.exec(color)?.[1].trim();
  const parts = inside == null ? undefined : rgbParts(inside);
  if (parts?.length !== 3 && parts?.length !== 4) return undefined;

  const [red, green, blue] = parts.slice(0, 3).map((part) => parseChannel(part, 255));
  const alpha = parts[3] == null ? 1 : parseChannel(parts[3], 1);
  if (red == null || green == null || blue == null || alpha == null) return undefined;
  return { red, green, blue, alpha };
};

const WHITE = { red: 255, green: 255, blue: 255, alpha: 1 };

/** `top` laid over the opaque `bottom` @param {Rgba} top @param {Rgba} bottom */
const over = (top, bottom) => ({
  red: top.red * top.alpha + bottom.red * (1 - top.alpha),
  green: top.green * top.alpha + bottom.green * (1 - top.alpha),
  blue: top.blue * top.alpha + bottom.blue * (1 - top.alpha),
  alpha: 1,
});

// sRGB to linear light, as defined for relative luminance in WCAG 2.x
/** @param {number} channel */
const toLinear = (channel) => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

/** @param {Rgba} color */
const relativeLuminance = ({ red, green, blue }) =>
  0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue);

/** @param {string} value */
const parseOrThrow = (value) => {
  const color = parseColor(value);
  if (!color) throw new Error(`Expected a hex or rgb() colour, got \`${value}\``);
  return color;
};

/**
 * WCAG 2.x contrast ratio, from 1 to 21. A translucent background is laid over white and
 * the foreground over that. Deliberately not rounded: WCAG counts 4.499:1 as failing 4.5:1.
 * @param {string} foreground
 * @param {string} background
 */
export const contrastRatio = (foreground, background) => {
  const below = over(parseOrThrow(background), WHITE);
  const a = relativeLuminance(over(parseOrThrow(foreground), below));
  const b = relativeLuminance(below);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};
