import { useMediaQuery } from '@react-hookz/web';

const QUERY = '(prefers-reduced-motion: reduce)';

export const usePrefersReducedMotion = (defaultState = false) =>
  useMediaQuery(QUERY, { initializeWithValue: defaultState });
