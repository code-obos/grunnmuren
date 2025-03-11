'use client';
import { useEffect, useState } from 'react';

export interface MediaQueryResult {
  matches: boolean;
}

export function useMediaQuery(mediaQuery: string): MediaQueryResult {
  const [matches, setMatches] = useState<boolean>(false);
  useEffect(() => {
    const listener = window.matchMedia(mediaQuery);
    setMatches(listener.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    listener.addEventListener('change', handler);
    return () => listener.removeEventListener('change', handler);
  }, [mediaQuery]);

  return { matches };
}
