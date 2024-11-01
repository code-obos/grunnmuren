import { useState, useEffect } from 'react';

/**
 * This hook listens to media queries and returns a boolean value indicating if the query matches.
 * @param query The media query to listen to
 * @returns A boolean value indicating if the query matches
 */
export const useMatchMedia = (query: string) => {
  const [matchesMedia, setMatchesMedia] = useState(false);

  useEffect(() => {
    const mediaWatcher = window.matchMedia(query);
    setMatchesMedia(mediaWatcher.matches);
    const mediaChangeHandler = (e: MediaQueryListEvent) =>
      setMatchesMedia(e.matches);

    mediaWatcher.addEventListener('change', mediaChangeHandler);

    return () => mediaWatcher.removeEventListener('change', mediaChangeHandler);
  }, [query]);

  return matchesMedia;
};
