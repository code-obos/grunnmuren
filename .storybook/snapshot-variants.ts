/**
 * The `data-theme` / `data-color` combinations every story gets snapshotted under.
 *
 * One Vitest project and one set of baselines per entry, so adding a brand or a dark
 * theme later is a single line here plus a `vitest run --update` in CI. There is only
 * one combination today because the token set from AB#140595 hasn't landed yet.
 */
export type SnapshotVariant = {
  /** Used in the Vitest project name and therefore in the baseline file names. */
  name: string;
  theme: string;
  color: string;
};

export const snapshotVariants: Array<SnapshotVariant> = [
  { name: 'default', theme: 'default', color: 'default' },
];
