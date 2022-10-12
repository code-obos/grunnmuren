import { type AriaAttributes } from 'react';

export { default as cx } from 'clsx';
export { default as composeRefs } from '@seznam/compose-react-refs';

export const noop = () => {};

/**
 * There are two attributes in HTML that determines if the field is required.
 * This checks if either is set.
 */
export function getRequiredness(
  required: boolean | undefined,
  ariaRequired: AriaAttributes['aria-required'],
): boolean {
  return required || ariaRequired === true || ariaRequired === 'true';
}
