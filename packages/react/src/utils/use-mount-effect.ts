import { type EffectCallback, useEffect, useRef } from 'react';

/**
 * This hook is called only once when the component is mounted.
 * @param effectCallback The effect callback to call on mount
 * @param deps Deps of the effect
 */
export function useMountEffect(
  effectCallback: EffectCallback,
  deps?: readonly unknown[],
) {
  const hasMountedRef = useRef(false);
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      effectCallback();
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: The dependency array is unknown here
  }, deps);
}
