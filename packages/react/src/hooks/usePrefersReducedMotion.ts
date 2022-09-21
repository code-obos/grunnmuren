import { useMedia } from '@/hooks';

const QUERY = '(prefers-reduced-motion: reduce)';

export const usePrefersReducedMotion = (defaultState = false) =>
  useMedia(QUERY, defaultState);
