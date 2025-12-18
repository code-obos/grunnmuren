import { ChevronLeft, ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import {
  Children,
  cloneElement,
  createContext,
  HTMLProps,
  isValidElement,
  type JSX,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DEFAULT_SLOT, Provider } from 'react-aria-components';
import { Button, ButtonContext } from '../button';
import { MediaContext } from '../content';
import { translations } from '../translations';
import { useLocale } from '../use-locale';
import { usePrefersReducedMotion } from '../use-prefers-reduced-motion';

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
  // /**
  //  * Callback that is triggered when a user navigates to new item in the Carousel.
  //  * The argument to the callback is an object containing `index` of the new item scrolled into view and the `id` of that item (if set on the `<CarouselItem>`)
  //  * It also provides `prevIndex` which is the index of the previous item that was in view
  //  * And `prevId`, which is the id of the previous item that was in view (if set on the `<CarouselItem>`)
  //  * You can use this callback to track which item is currently in view, for example for analytics or updating other parts of your UI.
  //  * When you want to avoid using controlled state for the carousel, you can use this callback to with the carousel's current item.
  //  * @param item { index: number; id?: string; prevIndex: number; prevId?: string }
  //  */
  // onChange?: (item: CarouselItem) => void;
  //
  /** Delay in milliseconds between each auto scroll of the gallery. Any interaction with the carousel from the user will immediately suspend the autoscroll. */
  autoPlayDelay?: number;
  /** Whether the carousel loops */
  loop?: boolean;
  /**
   * For controlled selection, callback that is called when the selected index changes.
   */
  onSelectedIndexChange?: (index: number) => void;
};

const Carousel = ({
  autoPlayDelay,
  className,
  children,
  onChange,
  loop,
  ...rest
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const firstIntersectionCallImminent = useRef(true);

  // Used to suspend autoplay if the user interacts with the carousel
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  const carouselItemsRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const { previous, next } = translations;


  const [scrollIndex, _setScrollIndex] = useState(0);
  console.log({scrollIndex})


  const setScrollIndex = useCallback((index: number) => {
    _setScrollIndex(index)
    onChange?.(index);
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      const items = carouselItemsRef.current?.querySelectorAll<HTMLElement>(
        '[data-slot="carousel-item"]',
      );

      const target = items?.[index];

      if (target) {
        carouselItemsRef.current?.scrollTo({
          behavior: prefersReducedMotion ? 'instant' : 'smooth',
          left: target.offsetLeft,
        });
      }
    },
    [prefersReducedMotion],
  );

  /** Auto scroll the carousel. This will suspend immediately if the user interacts with the carousel in any way */
  useEffect(() => {
    if (!userHasInteracted && autoPlayDelay) {

      const timerId = setInterval(() => {

        scrollTo(scrollIndex + 1);
      }, autoPlayDelay);

      return () => {
        clearInterval(timerId)
      }
    }
  }, [autoPlayDelay, scrollIndex, scrollTo, loop, userHasInteracted])

  useEffect(() => {

    function getItemIndex(element: Element) {
      const items = carouselItemsRef.current?.querySelectorAll(
        '[data-slot="carousel-item"]',
      );

      return Array.from(items ?? []).indexOf(element);

    }

    if ('onscrollsnapchanging' in window) {
      const scrollSnapChange = (event) => {

        const newIndex = getItemIndex(event.snapTargetInline)

        setScrollIndex(newIndex);
        // setUserHasInteracted(true)
      };

      carouselItemsRef.current?.addEventListener(
        'scrollsnapchanging',
        scrollSnapChange,
      );

      return () =>
        carouselItemsRef.current?.removeEventListener(
          'scrollsnapchanging',
          scrollSnapChange,
        );
    } else {

      const instersectionCallback = (entries: IntersectionObserverEntry[]) => {
        if (firstIntersectionCallImminent.current) {
          firstIntersectionCallImminent.current = false;
          return;
        }
        entries.forEach((entry) => {
          if (entry.isIntersecting) {

            const newIndex = getItemIndex(entry.target);

            setScrollIndex(newIndex);
            // setUserHasInteracted(true)
          }
        });
      };

      const observer = new IntersectionObserver(instersectionCallback, {
        root: carouselRef.current,
        rootMargin: '0px',
        threshold: 0.8,
      });

      const items = carouselItemsRef.current?.querySelectorAll(
        '[data-slot="carousel-item"]',
      );

      items?.forEach((slide) => {
        observer.observe(slide);
      });

      return () => {
        observer.disconnect();
        firstIntersectionCallImminent.current = true;
      };
    }
  }, []);

  const handlePrevious = () => {
    scrollTo(scrollIndex - 1);
    setUserHasInteracted(true)
  };

  const handleNext = () => {
    scrollTo(scrollIndex + 1);
    setUserHasInteracted(true)
  };

  return (
    <div data-slot="carousel" ref={carouselRef} onClick={() => setUserHasInteracted(true)}>
      <Provider
        values={[
          [
            CarouselItemsContext,
            {
              carouselItemsRef,
              activeIndex: scrollIndex,
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
                // hasReachedScrollStart && 'invisible',
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
                // hasReachedScrollEnd && 'invisible',
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
    activeIndex,
    handlePrevious,
    handleNext,
  } = useContext(CarouselItemsContext);

  const prefersReducedMotion = usePrefersReducedMotion();

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
    if (prefersReducedMotion) {
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
