import { useId } from 'react';

/**
 * A wrapper around useId that returns the supplied id parameter or generates one if necessary
 */
export function useFallbackId(id?: string) {
  const generatedId = useId();
  return id ?? generatedId;
}
