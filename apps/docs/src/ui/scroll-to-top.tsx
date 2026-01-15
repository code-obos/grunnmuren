import { ArrowUp } from '@obosbbl/grunnmuren-icons-react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

/**
 * Custom hook for scroll-to-top functionality
 * @param threshold - The scroll position (in pixels) after which the button should appear
 * @returns Object with showButton state and scrollToTop function
 */
export function useScrollToTop(threshold = 300) {
  const [showButton, setShowButton] = useState(false);

  // Debounce the scroll handler to avoid performance issues with frequent scroll events
  const debouncedScrollHandler = useDebouncedCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setShowButton(scrollTop > threshold);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', debouncedScrollHandler);
    return () => window.removeEventListener('scroll', debouncedScrollHandler);
  }, [debouncedScrollHandler]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return { showButton, scrollToTop };
}

interface ScrollToTopButtonProps {
  /** Whether the button should be visible */
  show: boolean;
  /** Function to call when button is clicked */
  onClick: () => void;
  /** Custom className for the container */
  className?: string;
}

/**
 * Scroll to top button component
 * Displays a floating button with "Til toppen" text that scrolls to the top of the page
 */
export function ScrollToTopButton({
  show,
  onClick,
  className,
}: ScrollToTopButtonProps) {
  if (!show) return null;

  return (
    <div
      className={`fixed right-4 bottom-4 z-50 flex flex-col items-center md:right-16 md:bottom-16 ${className || ''}`}
    >
      <button
        onClick={onClick}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-dark transition-all duration-300 hover:-translate-y-1 focus-visible:outline-focus"
        aria-label="Scroll to top"
        type="button"
      >
        <ArrowUp className="h-6 w-6 text-white" />
      </button>
      <span className="mt-2 font-medium">Til toppen</span>
    </div>
  );
}

/**
 * Combined scroll-to-top component that includes both the hook and button
 * Easy to use - just drop it into any page component
 */
export function ScrollToTop({
  threshold = 300,
  className,
}: {
  threshold?: number;
  className?: string;
}) {
  const { showButton, scrollToTop } = useScrollToTop(threshold);

  return (
    <ScrollToTopButton
      show={showButton}
      onClick={scrollToTop}
      className={className}
    />
  );
}
