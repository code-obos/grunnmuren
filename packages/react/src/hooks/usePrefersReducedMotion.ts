import { useMedia } from './index';

const QUERY = '(prefers-reduced-motion: no-preference)';

export const usePrefersReducedMotion = () => !useMedia(QUERY);
