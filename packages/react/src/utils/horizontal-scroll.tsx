import { ChevronLeft, ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

/**
 * Simple scroll button component that captures common patterns
 * without being overly complex
 */
interface ScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  isVisible: boolean;
  hasScrollingOccurred: boolean;
  /** Additional classes for positioning and styling */
  className?: string;
  /** Custom icon classes */
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

  // Default gradient backgrounds
  const gradientBg =
    direction === 'left'
      ? 'bg-[linear-gradient(90deg,white,white_calc(100%-10px),transparent)]'
      : 'bg-[linear-gradient(90deg,transparent,white_calc(10px),white)]';

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: This button is only for mouse interaction to help users scroll. Keyboard and screen reader users can navigate the content directly without needing these scroll helpers.
    <div
      onClick={onClick}
      className={cx(
        // Base scroll button styling
        'flex cursor-pointer items-center justify-center',
        'text-black hover:bg-white',
        gradientBg,

        // Animation
        hasScrollingOccurred &&
          'duration-100 ease-in motion-safe:transition-transform',

        // Hide/show animation
        direction === 'left'
          ? !isVisible && '-translate-x-full pointer-events-none'
          : !isVisible && 'pointer-events-none translate-x-full',

        // Custom positioning and styling
        className,
      )}
    >
      <Icon className={iconClassName} />
    </div>
  );
}

/**
 * Simple hook for detecting horizontal scroll capabilities
 * Returns scroll state and a ref to attach to your scrollable container
 */
export function useHorizontalScroll() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const hasScrollingOccurredRef = useRef(false);

  const checkScrollOverflow = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  const scrollHandler = useDebouncedCallback(() => {
    checkScrollOverflow();
    hasScrollingOccurredRef.current = true;
  }, 100);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollOverflow();
    container.addEventListener('scroll', scrollHandler);

    const resizeObserver = new ResizeObserver(checkScrollOverflow);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', scrollHandler);
      resizeObserver.disconnect();
    };
  }, [checkScrollOverflow, scrollHandler]);

  return {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    hasScrollingOccurred: hasScrollingOccurredRef.current,
  };
}
