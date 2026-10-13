/** Something in a theme file that keeps it from building. */
export type ThemeIssue = {
  code:
    | 'invalid-name'
    | 'not-an-object'
    | 'unknown-token'
    | 'invalid-value'
    | 'invalid-color'
    | 'unresolved-reference'
    | 'circular-reference'
    | 'duplicate-token';
  /** The token's path in the file, `primary.base-default`. Empty for the file as a whole. */
  path: string;
  /** What's wrong, in English. */
  message: string;
  /** The token it most likely should have been, for `unknown-token` and `unresolved-reference`. */
  suggestion?: string;
};

/** A contrast pair where the theme changes a colour, with the ratio it ends up with. */
export type ContrastResult = {
  /** `text on surface`, `text in button`, `button on page` or `graphics on page` */
  rule: string;
  /** 4.5 for text, 3 for anything that isn't */
  minimum: number;
  /** The token's path, `primary.text-default` */
  foreground: string;
  /** The token's path, `primary.background-default` */
  background: string;
  /** From 1 to 21, not rounded */
  ratio: number;
  passes: boolean;
};

export type ThemeResult = {
  /** `[data-theme='name'] { … }`, or empty when there are errors */
  css: string;
  errors: Array<ThemeIssue>;
  /** Empty when there are errors */
  contrast: Array<ContrastResult>;
};

/**
 * Builds a Grunnmuren theme from colour tokens named like Grunnmuren's, and checks it.
 *
 * ```json
 * {
 *   "blue": { "900": "#1f2a44" },
 *   "primary": {
 *     "base-default": "#2d3a26",
 *     "base-hover": { "$value": "{primary.base-active}" }
 *   }
 * }
 * ```
 *
 * Roles are `primary`, `accent`, `neutral`, `success`, `danger`, `warning` and `info`,
 * primitives their colour family (`blue`, `white`). A value is a hex or `rgb()` colour or a
 * `{reference}`. Designsystemet's paths, `color.primary.base-default`, read too. Only what the file sets ends up in the CSS. References resolve against the
 * file first and Grunnmuren's defaults after. `default` isn't a valid name, it's what resets
 * to Grunnmuren's own values.
 */
export declare const buildTheme: (input: unknown, options: { name: string }) => ThemeResult;

/** Every role token, pointing at the primitive it uses by default. Builds to a no-op theme. */
export declare const EXAMPLE_TOKENS: Record<string, Record<string, string>>;

/**
 * A theme name that works unquoted in `data-theme` and as a file name: lowercase, æ, ø and
 * å spelled out, and anything but letters, digits, `-` and `_` turned into `-`.
 */
export declare const toThemeName: (input: string) => string;
