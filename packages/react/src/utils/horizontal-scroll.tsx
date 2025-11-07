import { ChevronLeft, ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export type ScrollDirection = 'left' | 'right';

/**
 * Simple scroll button component that captures common patterns
 * without being overly complex
 */
interface ScrollButtonProps {
  direction: ScrollDirection;
  onClick: () => void;
  isVisible: boolean;
  hasScrollingOccurred: boolean;
  /** Additional classes for positioning and styling */
  className?: string;
  iconClassName?: string;
}

export function ScrollButton({
  direction,
  onClick,
  isVisible,
  hasScrollingOccurred,
  className,
  iconClassName,
}: ScrollButtonProps) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: This button is only for mouse interaction to help users scroll. Keyboard and screen reader users can navigate the content directly without needing these scroll helpers.
    // biome-ignore lint/a11y/noStaticElementInteractions: This button is only for mouse interaction to help users scroll. Keyboard and screen reader users can navigate the content directly without needing these scroll helpers.
    <div
      onClick={onClick}
      className={cx(
        // Base scroll button styling
        'flex cursor-pointer items-center justify-center',
        'text-black hover:bg-white',
        direction === 'left'
          ? 'bg-[linear-gradient(90deg,white,white_calc(100%-10px),transparent)]'
          : 'bg-[linear-gradient(90deg,transparent,white_calc(10px),white)]',

        // Animation
        hasScrollingOccurred &&
          'duration-100 ease-in motion-safe:transition-transform',

        // Hide/show animation
        direction === 'left'
          ? !isVisible && '-translate-x-full pointer-events-none'
          : !isVisible && 'pointer-events-none translate-x-full',

        direction === 'left' ? '-left-3' : '-right-3',
        className,
      )}
    >
      <Icon className={iconClassName} />
    </div>
  );
}

interface ScrollState {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  hasScrollingOccurred: boolean;
}

/**
 * Simple hook for detecting horizontal scroll capabilities
 * Returns scroll state and a ref to attach to your scrollable container
 */
export function useHorizontalScroll(scrollStateDeps: unknown[] = []) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    canScrollLeft: false,
    canScrollRight: false,
    hasScrollingOccurred: false,
  });

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const isAtStart = scrollLeft <= 0;
    const isAtEnd = scrollLeft >= scrollWidth - clientWidth;

    setScrollState((prev) => ({
      canScrollLeft: !isAtStart,
      canScrollRight: !isAtEnd,
      hasScrollingOccurred: prev.hasScrollingOccurred || scrollLeft > 0,
    }));
  }, []);

  const debouncedUpdateScrollState = useDebouncedCallback(
    updateScrollState,
    100,
  );

  // Initial check and react to dependency changes
  useEffect(updateScrollState, [...scrollStateDeps]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    // Listen for scroll events
    container.addEventListener('scroll', debouncedUpdateScrollState);

    // Listen for resize events (content or container size changes)
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', debouncedUpdateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState, debouncedUpdateScrollState]);

  return {
    scrollContainerRef,
    ...scrollState,
  };
}
