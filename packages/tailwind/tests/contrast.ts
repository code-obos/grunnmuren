const HEX_RGB = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/;

// sRGB to linear light, as defined for relative luminance in WCAG 2.x
const toLinear = (channel: string) => {
  const value = Number.parseInt(channel, 16) / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

const relativeLuminance = (color: string) => {
  const match = color.match(HEX_RGB);
  if (!match) throw new Error(`Expected an opaque 6-digit hex colour, got \`${color}\``);

  const [, red, green, blue] = match;
  return 0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue);
};

/**
 * WCAG 2.x contrast ratio between two opaque colours, from 1 to 21. Takes the lowercase
 * 6-digit hex that `resolveToken` normalises to. Deliberately not rounded: WCAG counts
 * 4.499:1 as failing 4.5:1.
 */
export const contrastRatio = (first: string, second: string) => {
  const a = relativeLuminance(first);
  const b = relativeLuminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};
