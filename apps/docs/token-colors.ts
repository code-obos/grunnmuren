import json from '../../packages/tailwind/tokens/colors.json';

export type RoleToken = {
  /** What a theme file calls it, `primary.base-default` */
  path: string;
  /** The custom property without `--`, `gm-color-primary-base-default` */
  name: string;
  /** `base` */
  group: string;
  /** `default` */
  variant: string;
  /** The primitive it points at, by path: `blue.900` */
  ref: string;
  /** The same primitive's custom property without `--`, `gm-blue-900` */
  refName: string;
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
  roles: Array<{ role: string; tokens: Array<RoleToken> }>;
  /** The `group-variant` names `data-color` switches, `base-default` */
  shortTokens: Array<string>;
  primitives: Array<{ family: string; tokens: Array<PrimitiveToken> }>;
};

// Written by `pnpm tokens:build` in the tailwind package. The annotation is what checks the
// file still has the shape this app reads.
export const tokenColors: TokenColors = json;
