import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';

const subscribe = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(query);
  mediaQuery.addEventListener('change', onChange);
  return () => mediaQuery.removeEventListener('change', onChange);
};

const getSnapshot = () => window.matchMedia(query).matches;

/**
 * Hook that detects the user's preference for reduced motion.
 *
 * Keep in mind that this hook relies on a browser API's and doesn't run on the server.
 * You can supply an initial value that will be used for server side rendering.
 *
 * The default initial value is `false` as this aligns with most users. This is to prevent unecessary rerenders on mount for the common user.
 */
export function usePrefersReducedMotion(initialValue: boolean | null = false): boolean | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => initialValue);
}
