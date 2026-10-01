/**
 * The `data-theme` / `data-color` combinations every story gets snapshotted under.
 *
 * One Vitest project and one set of baselines per entry, so adding a brand or a dark
 * theme later is a single line here plus a `vitest run --update` in CI.
 *
 * Frøen Hage looks the same as the default until the components move onto the role
 * tokens. It's here so that move shows up as a diff against a baseline taken before it.
 */
export type SnapshotVariant = {
  /** Used in the Vitest project name and therefore in the baseline file names. */
  name: string;
  theme: string;
  color: string;
};

export const snapshotVariants: Array<SnapshotVariant> = [
  { name: 'default', theme: 'default', color: 'default' },
  { name: 'froen-hage', theme: 'froen-hage', color: 'default' },
];
