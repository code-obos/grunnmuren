import { useEffect, useState } from 'react';

/**
 * Hook that detects the user's preference for reduced motion.
 *
 * Keep in mind that this hook relies on a browser API's and doesn't run on the server.
 * You can supply an initial value that will be used for server side rendering.
 *
 * The default initial value is `false` as this aligns with most users. This is to prevent unecessary rerenders on mount for the common user.
 */
export function usePrefersReducedMotion(
  initialValue: boolean | null = false,
): boolean | null {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(initialValue);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const changeListener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', changeListener);

    return () => {
      mediaQuery.removeEventListener('change', changeListener);
    };
  }, []);

  return prefersReducedMotion;
}
