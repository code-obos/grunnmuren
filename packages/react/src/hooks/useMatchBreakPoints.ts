import { useMatchMedia } from './useMatchMedia';

/**
 * This hook listens to a set of media queries and returns an object with keys for each breakpoint and a corresponding value indicating if the breakpoint matches.
 * @returns An object with keys for each breakpoint and values indicating if the breakpoint matches
 */
export const useMatchBreakPoints = () => {
  const matches = {
    // Tailwind breakpoints
    sm: useMatchMedia('(min-width: 640px)'),
    md: useMatchMedia('(min-width: 768px)'),
    lg: useMatchMedia('(min-width: 1024px)'),
    xl: useMatchMedia('(min-width: 1280px)'),
    '2xl': useMatchMedia('(min-width: 1536px)'),
  };

  return matches;
};
