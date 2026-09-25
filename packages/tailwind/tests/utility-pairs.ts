/**
 * The record of which utilities map to which once the components move to the token
 * set from AB#140595, and which of those pairs are supposed to change value.
 *
 * Migrate a component, add its pairs here. A pair without `change` must compute to
 * the exact same CSS, a pair with `change` must not. Both directions fail loudly, so
 * the list can't drift away from what the stylesheet actually does, and it doubles as
 * release notes for the migration.
 */
export type UtilityPair = {
  /** The utility the components use today. */
  from: string;
  /** The utility it maps to. Left out until the token it needs exists in `tailwind-base.css`. */
  to?: string;
  /** Why the two differ. Leave out when the pair is meant to be a pure rename. */
  change?: string;
};

export const utilityPairs: Array<UtilityPair> = [
  // Aliases that already exist in today's theme. The new set collapses each of these
  // pairs into a single token, so they have to stay identical until it does.
  { from: 'bg-blue-light', to: 'bg-sky' },
  { from: 'bg-blue-lightest', to: 'bg-sky-light' },
  { from: 'bg-green-light', to: 'bg-mint' },
  { from: 'bg-green-lightest', to: 'bg-mint-light' },
  { from: 'text-blue-light', to: 'text-sky' },
  { from: 'border-blue-light', to: 'border-sky' },

  // Waiting on the new tokens. `to` goes in as each one lands.
  { from: 'bg-blue-dark', change: 'primary button switches to a different blue' },
  { from: 'hover:bg-blue', change: 'hover goes darker instead of lighter' },
  { from: 'heading-xl', change: 'fluid typography replaces the breakpoint step' },
  { from: 'heading-l', change: 'fluid typography replaces the breakpoint step' },
  { from: 'heading-m', change: 'fluid typography replaces the breakpoint step' },
  { from: 'heading-s', change: 'fluid typography replaces the breakpoint step' },
  { from: 'heading-xs', change: 'fluid typography replaces the breakpoint step' },
];
