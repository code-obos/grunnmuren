import json from '../../packages/tailwind/tokens/docs/colors.json';

export type RoleToken = {
  /** `gm-color-primary-base-default` */
  name: string;
  /** `base` */
  group: string;
  /** `default` */
  variant: string;
  /** The primitive it points at, `gm-blue-900` */
  ref: string;
  /** The default value, `#002169` */
  value: string;
};

export type PrimitiveToken = { name: string; value: string };

export type TokenColors = {
  roles: Array<{ role: string; tokens: Array<RoleToken> }>;
  /** The `group-variant` names `data-color` switches, `base-default` */
  shortTokens: Array<string>;
  primitives: Array<{ family: string; tokens: Array<PrimitiveToken> }>;
};

// Written by `pnpm tokens:build` in the tailwind package. The annotation is what checks the
// file still has the shape this app reads.
export const tokenColors: TokenColors = json;
