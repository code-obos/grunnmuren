import { ChevronLeft, ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { useUpdateEffect } from '@react-aria/utils';
import { cx } from 'cva';
import {
  Children,
  cloneElement,
  createContext,
  type HTMLProps,
  isValidElement,
  type JSX,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DEFAULT_SLOT, Provider } from 'react-aria-components';
import { useDebouncedCallback } from 'use-debounce';
import { Button, ButtonContext } from '../button';
import { MediaContext } from '../content';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

type CarouselItem = Pick<CarouselItemProps, 'id'> & {
  /** The index of the item that is currently in view */
  index: number;
  /** The index of the previous item that was in view */
  prevIndex: number;
  /** The id of the previous item that was in view */
  prevId?: CarouselItemProps['id'];
};

type CarouselProps = Omit<HTMLProps<HTMLDivElement>, 'onChange'> & {
  /** The <CarouselItem/> components to be displayed within the carousel. */
  children: React.ReactNode;
  /**
   * Callback that is triggered when a user navigates to new item in the Carousel.
   * The argument to the callback is an object containing `index` of the new item scrolled into view and the `id` of that item (if set on the `<CarouselItem>`)
   * It also provides `prevIndex` which is the index of the previous item that was in view
   * And `prevId`, which is the id of the previous item that was in view (if set on the `<CarouselItem>`)
   * @param item { index: number; id?: string; prevIndex: number; prevId?: string }
   */
  onChange?: (item: CarouselItem) => void;
};

const Carousel = ({
  className,
  children,
  onChange,
  ...rest
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const carouselItemsRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const { previous, next } = translations;

  const [scrollTargetIndex, setScrollTargetIndex] = useState(0);
  const isScrollingProgrammatically = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollQueue = useRef<number[]>([]);

  const [hasReachedScrollStart, setHasReachedScrollStart] = useState(
    scrollTargetIndex === 0,
  );

  const [hasReachedScrollEnd, setHasReachedScrollEnd] = useState(
    !carouselItemsRef.current ||
      carouselItemsRef.current.children.length - 1 === scrollTargetIndex,
  );

  useEffect(() => {
    setHasReachedScrollStart(scrollTargetIndex === 0);
    setHasReachedScrollEnd(
      !carouselItemsRef.current ||
        carouselItemsRef.current.children.length - 1 === scrollTargetIndex,
    );
  }, [scrollTargetIndex]);

  // Keep track of the previous index to determine if the user is scrolling forward or backward
  // This is used to determine which callback to call (onPrev or onNext)
  const prevIndex = useRef(0);

  // Processes the next scroll action in the queue, if any
  // All clicks on the prev/next buttons are queued while a programmatic scroll is in progress
  // This is to ensure that rapid clicks on the buttons do not cause janky scrolling behavior
  // while still a snappy response to user clicks
  const processQueue = () => {
    if (
      scrollQueue.current.length > 0 &&
      !isScrollingProgrammatically.current
    ) {
      const nextIndex = scrollQueue.current?.shift();
      if (nextIndex !== undefined) {
        setScrollTargetIndex(nextIndex);
      }
    }
  };

  // Handle scrolling when user clicks the arrow icons
  useUpdateEffect(() => {
    if (!carouselItemsRef.current) {
      return;
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    isScrollingProgrammatically.current = true;

    const elementWithFocusVisible =
      carouselRef.current?.querySelector(':focus-visible');

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    carouselItemsRef.current.children[scrollTargetIndex]?.scrollIntoView({
      behavior: prefersReducedMotion ? 'instant' : 'smooth',
      inline: 'start',
      block: 'nearest',
    });

    if (prevIndex.current !== scrollTargetIndex && onChange) {
      onChange({
        index: scrollTargetIndex,
        id: carouselItemsRef.current.children[scrollTargetIndex]?.id,
        prevIndex: prevIndex.current,
        prevId: carouselItemsRef.current.children[prevIndex.current]?.id,
      });
    }

    prevIndex.current = scrollTargetIndex;

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingProgrammatically.current = false;
      scrollTimeoutRef.current = null;
      if (
        elementWithFocusVisible &&
        !carouselRef.current?.contains(document.activeElement)
      ) {
        // Restore focus to the appropriate element after scrolling
        // First check if the prev or next buttons just got hidden due to reaching the start/end of the carousel
        // If so, move focus to the other button. This is to avoid a scroll jank that occurs if instead focus is restored to the carousel container
        // This jank happens because of the delays used for scrolling with these buttons (debounce, queuing etc.).
        switch (elementWithFocusVisible.slot) {
          case 'prev': {
            // Focus was lost when the prev button turned invisible, set it to the next button
            const nextButton = carouselRef.current?.querySelector(
              '[slot="next"]',
            ) as HTMLElement | null;
            nextButton?.focus();
            break;
          }
          case 'next': {
            // Focus was lost when the next button turned invisible, set it to the prev button
            const prevButton = carouselRef.current?.querySelector(
              '[slot="prev"]',
            ) as HTMLElement | null;
            prevButton?.focus();
            break;
          }
          default: {
            // Focus was lost during while scrolling with left/right arrows, restore it to the carousel container
            carouselItemsRef.current?.focus();
            break;
          }
        }
      }
      processQueue(); // Process any queued scrolls
    }, 500);
  }, [scrollTargetIndex]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const onScroll = useDebouncedCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      // Ignore scroll events when we're programmatically scrolling
      if (isScrollingProgrammatically.current) {
        return;
      }

      const target = event.target as HTMLDivElement;
      const containerRect = target.getBoundingClientRect();

      // Calculate the index of the item that is currently in view
      const newScrollTargetIndex = Array.from(target.children).findIndex(
        (child) => {
          const rect = child.getBoundingClientRect();
          // Check if the item is more than 50% visible within the container
          const visibleWidth =
            Math.min(rect.right, containerRect.right) -
            Math.max(rect.left, containerRect.left);
          const itemWidth = rect.width;
          return visibleWidth / itemWidth > 0.5;
        },
      );

      if (
        newScrollTargetIndex !== -1 &&
        newScrollTargetIndex !== scrollTargetIndex
      ) {
        if (onChange) {
          onChange({
            index: newScrollTargetIndex,
            id: target.children[newScrollTargetIndex]?.id,
            prevIndex: prevIndex.current,
            prevId: target.children[prevIndex.current]?.id,
          });
        }

        // Update the index and prevIndex
        setScrollTargetIndex(newScrollTargetIndex);
        prevIndex.current = newScrollTargetIndex;
      }
    },
    150, // Debounce scroll events by 150ms
  );

  const handlePrevious = () => {
    setScrollTargetIndex((currentTargetIndex) => {
      const targetIndex = currentTargetIndex - 1;

      if (targetIndex < 0) {
        return currentTargetIndex;
      }

      if (isScrollingProgrammatically.current) {
        // If we're already scrolling, queue this action
        scrollQueue.current = [targetIndex];
        return currentTargetIndex;
      }

      return targetIndex;
    });
  };

  const handleNext = () => {
    setScrollTargetIndex((currentTargetIndex) => {
      const targetIndex = currentTargetIndex + 1;
      if (
        !carouselItemsRef.current ||
        targetIndex >= carouselItemsRef.current.children.length
      ) {
        return currentTargetIndex;
      }

      if (isScrollingProgrammatically.current) {
        // If we're already scrolling, queue this action
        scrollQueue.current = [targetIndex];
        return currentTargetIndex;
      }

      return targetIndex;
    });
  };

  return (
    <div data-slot="carousel" ref={carouselRef}>
      <Provider
        values={[
          [
            CarouselItemsContext,
            {
              carouselItemsRef,
              onScroll,
              activeIndex: scrollTargetIndex,
              handlePrevious,
              handleNext,
            },
          ],
          [
            ButtonContext,
            {
              slots: {
                [DEFAULT_SLOT]: {}, // this is required in RAC (for non-trigger buttons)
                prev: {
                  'aria-label': previous[locale],
                  onPress: handlePrevious,
                },
                next: {
                  isIconOnly: true,
                  'aria-label': next[locale],
                  onPress: handleNext,
                },
              },
            },
          ],
        ]}
      >
        <div
          {...rest}
          className={cx(
            className,
            'relative rounded-3xl',
            // If any <CarouselItems/> (the scroll-snap container) or <VideoLoop/> component is focused, apply custom focus styles around the carousel, this makes ensures that the focus outline is visible around the carousel in all cases
            '[&:has([data-slot="carousel-items"]:focus-visible,[data-slot="video-loop-button"]:focus-visible)]:outline-focus',
            '[&:has([data-slot="carousel-items"]:focus-visible,[data-slot="video-loop-button"]:focus-visible)]:outline-focus-offset',
            // Unset the default focus outline for potential video loop buttons, as it interferes with the custom focus styles for the carousel
            '**:data-[slot="video-loop-button"]:focus-visible:outline-none',
          )}
        >
          {children}
          <_CarouselControls>
            <Button
              isIconOnly
              slot="prev"
              variant="primary"
              color="white"
              className={cx(
                'group/carousel-previous',
                hasReachedScrollStart && 'invisible',
              )}
            >
              <ChevronLeft className="group-hover/carousel-previous:motion-safe:-translate-x-1 transition-transform" />
            </Button>
            <Button
              isIconOnly
              slot="next"
              variant="primary"
              color="white"
              className={cx(
                'group/carousel-next',
                hasReachedScrollEnd && 'invisible',
              )}
            >
              <ChevronRight className="transition-transform group-hover/carousel-next:motion-safe:translate-x-1" />
            </Button>
          </_CarouselControls>
        </div>
      </Provider>
    </div>
  );
};

type _CarouselControlsProps = HTMLProps<HTMLDivElement> & {
  /** The <CarouselItem/> components to be displayed within the carousel. */
  children: React.ReactNode;
};

/**
 * This is internal for now, but we will expose it in the future when we support more flexible positioning of prev/next and other actions.
 * It is used to render the prev/next buttons in the carousel for now.
 */
const _CarouselControls = ({ children, className }: _CarouselControlsProps) => (
  <div
    className={cx(
      className,
      'absolute right-6 bottom-6 flex gap-x-2',
      // Make it easier to position in full-bleed hero variants (these style have no other side effects)
      'items-end *:h-fit',
    )}
    data-slot="carousel-controls"
  >
    {children}
  </div>
);

type CarouselItemsProps = HTMLProps<HTMLDivElement> & {
  /** The <CarouselItem/> components to be displayed within the carousel. */
  children: React.ReactNode;
};

type CarouselItemsContextValue = {
  carouselItemsRef: React.Ref<HTMLDivElement>;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  activeIndex: number;
  handlePrevious?: () => void;
  handleNext?: () => void;
};

const CarouselItemsContext = createContext({
  carouselItemsRef: null,
  activeIndex: 0,
} as CarouselItemsContextValue);

const CarouselItems = ({ className, children }: CarouselItemsProps) => {
  const {
    carouselItemsRef,
    onScroll,
    activeIndex,
    handlePrevious,
    handleNext,
  } = useContext(CarouselItemsContext);

  const prefersReducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  // Update the ref when the media query changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Prevent default behavior when holding down arrow keys (when repeat is true)
    // The default behavior in scroll snapping causes a staggering scroll effect that feels janky
    if (
      event.repeat &&
      (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
    ) {
      event.preventDefault();
      return;
    }

    // For users with prefers-reduced-motion, trigger button click behavior instead of native scroll
    if (prefersReducedMotion.current) {
      if (event.key === 'ArrowLeft' && handlePrevious) {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === 'ArrowRight' && handleNext) {
        event.preventDefault();
        handleNext();
      }
    }
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: The keydown handler is only to prevent undesired scrolling behavior when using the arrow keys
    <div
      data-slot="carousel-items"
      className={cx(className, [
        'scrollbar-hidden',
        'flex',
        'snap-x',
        'snap-mandatory',
        'overflow-x-auto',
        'outline-none',
        'rounded-[inherit]',
      ])}
      ref={carouselItemsRef}
      onScroll={onScroll}
      onKeyDown={handleKeyDown}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child as JSX.Element, {
            inert: activeIndex === index ? undefined : true,
          });
        }
      })}
    </div>
  );
};

type CarouselItemProps = HTMLProps<HTMLDivElement> & {
  /** The component/components to display as the <CarouselItem/>. */
  children: JSX.Element | JSX.Element[];
};

const CarouselItem = ({ className, children, ...rest }: CarouselItemProps) => {
  return (
    <div
      className={cx(className, 'shrink-0 basis-full snap-start')}
      data-slot="carousel-item"
      {...rest}
    >
      <Provider
        values={[
          [
            MediaContext,
            {
              fit: 'cover',
              className: cx(
                'data-[fit="contain"]:bg-blue-dark',
                '*:h-full *:w-full',
                'aspect-square max-sm:data-[fit="contain"]:*:object-cover sm:aspect-4/3 md:aspect-3/2 lg:aspect-2/1',
              ),
            },
          ],
        ]}
      >
        {children}
      </Provider>
    </div>
  );
};

export {
  Carousel as UNSAFE_Carousel,
  CarouselItem as UNSAFE_CarouselItem,
  CarouselItems as UNSAFE_CarouselItems,
  type CarouselItemProps as UNSAFE_CarouselItemProps,
  type CarouselItemsProps as UNSAFE_CarouselItemsProps,
  type CarouselProps as UNSAFE_CarouselProps,
};
