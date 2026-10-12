/** Two tokens WCAG 2.2 AA says need `minimum` contrast, by their CSS names. */
export type ContrastPair = {
  /** `text on surface`, `text in button`, `button on page` or `graphics on page` */
  rule: string;
  /** 4.5 for text, 3 for anything that isn't */
  minimum: number;
  /** `--gm-color-primary-text-default` */
  foreground: string;
  /** `--gm-color-primary-background-default` */
  background: string;
};

/** Every pair Grunnmuren holds its own roles, and a theme's, to. */
export declare const CONTRAST_PAIRS: ReadonlyArray<ContrastPair>;

/**
 * WCAG 2.x contrast ratio between two hex or `rgb()` colours, from 1 to 21. Not rounded.
 * Throws on anything else.
 */
export declare const contrastRatio: (foreground: string, background: string) => number;
