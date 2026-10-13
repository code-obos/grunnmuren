import json from '@obosbbl/grunnmuren-tailwind/colors.json';

import themeJson from '../../packages/tailwind/tokens/themes/colors.json';

export type RoleToken = {
  /** What a theme file calls it, `primary.base-default` */
  path: string;
  /** The custom property without `--`, `gm-color-primary-base-default` */
  name: string;
  /** `default` */
  variant: string;
  /** The primitive it points at, by path: `blue.900`. Missing when it doesn't point at one */
  ref?: string;
  /** The same primitive's custom property without `--`, `gm-blue-900` */
  refName?: string;
  /** The default value, `#002169` */
  value: string;
};

export type PrimitiveToken = {
  /** `blue.900`, or `white` for a primitive without steps */
  path: string;
  /** `gm-blue-900` */
  name: string;
  value: string;
};

export type TokenColors = {
  roles: Array<{ role: string; groups: Array<{ group: string; tokens: Array<RoleToken> }> }>;
  /** The `group-variant` names `data-color` switches, `base-default` */
  shortTokens: Array<string>;
  primitives: Array<{ family: string; tokens: Array<PrimitiveToken> }>;
};

// Written by `pnpm tokens:build` in the tailwind package. The annotation is what checks the
// file still has the shape this app reads.
export const tokenColors: TokenColors = json;

/**
 * What each example theme sets, roles and primitives, by CSS name without `--`. A file of
 * its own, since the example themes aren't in the package.
 */
export const themeColors: Record<string, Record<string, string>> = themeJson;
