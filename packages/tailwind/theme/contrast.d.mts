export type Rgba = { red: number; green: number; blue: number; alpha: number };

/** Two tokens WCAG 2.2 AA says need `minimum` contrast, by their paths. */
export type ContrastPair = {
  /** `text on surface`, `text in button`, `button on page` or `graphics on page` */
  rule: string;
  /** 4.5 for text, 3 for anything that isn't */
  minimum: number;
  /** `primary.text-default` */
  foreground: string;
  /** `primary.background-default` */
  background: string;
};

/** Every pair Grunnmuren holds its own roles, and a theme's, to. */
export declare const CONTRAST_PAIRS: ReadonlyArray<ContrastPair>;

/** A hex or `rgb()` colour as channels, or undefined when it's neither. */
export declare const parseColor: (value: string) => Rgba | undefined;

/**
 * WCAG 2.x contrast ratio between two hex or `rgb()` colours, from 1 to 21. Not rounded.
 * Throws on anything else.
 */
export declare const contrastRatio: (foreground: string, background: string) => number;
