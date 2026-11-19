import colors from '@obosbbl/grunnmuren-tailwind/colors.json';
import {
  buildTheme,
  CONTRAST_PAIRS,
  contrastRatio,
  generateRole,
  toThemeName,
} from '@obosbbl/grunnmuren-tailwind/theme';
import { useMemo, useState } from 'react';

export type Role = (typeof colors.roles)[number]['role'];
export type RoleColors = Record<string, string>;

export const ROLE_LABELS: Record<Role, string> = {
  primary: 'Primary',
  accent: 'Accent',
  neutral: 'Neutral',
  info: 'Information',
  success: 'Success',
  warning: 'Warning',
  danger: 'Error',
};

// The order the design has them in, brand roles first
export const ROLES = Object.keys(ROLE_LABELS) as Array<Role>;

/** The roles a brand sets with one colour each. The status roles stay Grunnmuren's */
export const BRAND_ROLES = ['primary', 'accent', 'neutral'] as const satisfies Array<Role>;
export type BrandRole = (typeof BRAND_ROLES)[number];

/** `{ group: 'surface', variants: ['surface-default', …] }`, the same for every role */
export const GROUPS = colors.roles[0].groups.map(({ group, tokens }) => ({
  group,
  variants: tokens.map(({ path }) => path.split('.')[1]),
}));

export const DEFAULTS = Object.fromEntries(
  colors.roles.map(({ role, groups }) => [
    role,
    Object.fromEntries(
      groups.flatMap(({ tokens }) => tokens.map(({ path, value }) => [path.split('.')[1], value])),
    ),
  ]),
) as Record<Role, RoleColors>;

const DEFAULT_BRAND = Object.fromEntries(
  BRAND_ROLES.map((role) => [role, DEFAULTS[role]['base-default']]),
) as Record<BrandRole, string>;

export type Mode = 'generate' | 'manual';

export type ContrastFailure = { background: string; ratio: number; minimum: number };

const HEX = /^#?[\da-f]{6}$/i;

/** `#2D3A26` from `2d3a26` or `#2d3a26`, or undefined for anything else */
export const toHex = (value: string) => {
  const trimmed = value.trim();
  if (!HEX.test(trimmed)) {
    return undefined;
  }
  return `#${trimmed.replace('#', '').toUpperCase()}`;
};

/** The theme name the preview uses, so a theme called something odd can't take over the page */
export const PREVIEW_THEME = 'temabygger-forhandsvisning';

export const useThemeBuilder = () => {
  const [name, setName] = useState('');
  const [mode, setMode] = useState<Mode>('generate');
  const [brand, setBrand] = useState(DEFAULT_BRAND);
  // Kept when going back to Generer, so a value from the design manual isn't lost
  const [overrides, setOverrides] = useState<Partial<Record<Role, RoleColors>>>({});

  const generated = useMemo(
    () =>
      Object.fromEntries(
        ROLES.map((role) => {
          const color = (brand as Partial<Record<Role, string>>)[role];
          // Grunnmuren's own values until the brand colour changes, since they aren't generated
          return [
            role,
            color && color !== DEFAULT_BRAND[role as BrandRole]
              ? generateRole(color)
              : DEFAULTS[role],
          ];
        }),
      ) as Record<Role, RoleColors>,
    [brand],
  );

  const final = useMemo(
    () =>
      Object.fromEntries(
        ROLES.map((role) => [
          role,
          mode === 'manual' ? { ...generated[role], ...overrides[role] } : generated[role],
        ]),
      ) as Record<Role, RoleColors>,
    [generated, mode, overrides],
  );

  // Only what differs from Grunnmuren, which is what a theme file should have
  const tokens = useMemo(
    () =>
      Object.fromEntries(
        ROLES.flatMap((role) => {
          const changed = Object.entries(final[role]).filter(
            ([variant, color]) => color !== DEFAULTS[role][variant],
          );
          return changed.length > 0 ? [[role, Object.fromEntries(changed)]] : [];
        }),
      ) as Partial<Record<Role, RoleColors>>,
    [final],
  );

  const themeName = toThemeName(name) || 'grunnmuren';
  const theme = useMemo(() => buildTheme(tokens, { name: themeName }), [tokens, themeName]);
  const previewCss = useMemo(() => buildTheme(tokens, { name: PREVIEW_THEME }).css, [tokens]);

  // Every pair, Grunnmuren's own values included, not just the ones the theme changes
  const contrastFailures = useMemo(() => {
    const failures = new Map<string, Array<ContrastFailure>>();
    for (const { foreground, background, minimum } of CONTRAST_PAIRS) {
      const [role, fgVariant] = foreground.split('.') as [Role, string];
      const bgVariant = background.split('.')[1];
      const ratio = contrastRatio(final[role][fgVariant], final[role][bgVariant]);
      if (ratio < minimum) {
        failures.set(foreground, [
          ...(failures.get(foreground) ?? []),
          { background: bgVariant, ratio, minimum },
        ]);
      }
    }
    return failures;
  }, [final]);

  const setOverride = (role: Role, variant: string, color: string | undefined) => {
    setOverrides((current) => {
      const { [variant]: _removed, ...rest } = current[role] ?? {};
      const next =
        color && color !== generated[role][variant] ? { ...rest, [variant]: color } : rest;
      const { [role]: _role, ...others } = current;
      return Object.keys(next).length > 0 ? { ...others, [role]: next } : others;
    });
  };

  return {
    name,
    setName,
    themeName,
    mode,
    setMode,
    brand,
    setBrand: (role: BrandRole, color: string) =>
      setBrand((current) => ({ ...current, [role]: color })),
    isDefaultBrand: (role: BrandRole) => brand[role] === DEFAULT_BRAND[role],
    overrides,
    setOverride,
    resetOverrides: () => setOverrides({}),
    generated,
    final,
    tokens,
    theme,
    previewCss,
    contrastFailures,
  };
};

export type ThemeBuilder = ReturnType<typeof useThemeBuilder>;
