import { ChevronLeft, ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { useLayoutEffect } from '@react-aria/utils';
import { cx } from 'cva';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Children,
  cloneElement,
  createContext,
  type HTMLProps,
  isValidElement,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DEFAULT_SLOT, type PressEvent, Provider } from 'react-aria-components';
import { Button, ButtonContext } from '../button';
import { MediaContext } from '../content';
import { translations } from '../translations';
import { useLocale } from '../use-locale';
import { usePrefersReducedMotion } from '../use-prefers-reduced-motion';

type CarouselProps = Omit<HTMLProps<HTMLDivElement>, 'onChange'> & {
  children?: React.ReactNode;
  /** Delay in milliseconds between each auto scroll of the gallery. Any interaction with the carousel from the user will immediately suspend the autoscroll. */
  autoPlayDelay?: number;
  /**
   * The initial slide to display when the carousel is mounted.
   * @default 0
   */
  defaultInitialSlide?: number;
  /**
   * Whether the carousel loops. Caveat: Currently it only works with autoPlay and next/prev buttons
   * @default false
   */
  loop?: boolean;
  /**
   * Callback invoked when the slide changes.
   */
  onSlideChange?: (index: number) => void;
};

function getCarouselItems(ref: RefObject<HTMLDivElement | null>) {
  const items = ref.current?.querySelectorAll<HTMLElement>(
    '[data-slot="carousel-item"]',
  );

  return items;
}

const Carousel = ({
  autoPlayDelay,
  className,
  children,
  defaultInitialSlide = 0,
  onSlideChange = () => {},
  loop = false,
  ...rest
}: CarouselProps) => {
  const plugins = useMemo(() => {
    if (autoPlayDelay) {
      return [Autoplay({ delay: autoPlayDelay, stopOnLastSnap: !loop })];
    }
    return undefined;
  }, [autoPlayDelay, loop]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop }, plugins);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // const prefersReducedMotion = usePrefersReducedMotion();
  // const firstIntersectionCallImminent = useRef(true);
  // const isScrollingProgrammaticallyToSlide = useRef<number>(null);

  // const carouselItemsRef = useRef<HTMLDivElement>(null);
  // const locale = useLocale();

  // const [activeSlide, setActiveSlide] = useState(defaultInitialSlide);
  // const [slideCount, setSlideCount] = useState(0);

  // // Get the number of carousel items and set the slide count.
  // useLayoutEffect(() => {
  //   const items = getCarouselItems(carouselItemsRef)?.length;
  //   setSlideCount(items ?? 0);

  //   // If initial slide is something other than the first, scroll to it (without smooth scroll).
  //   if (activeSlide > 0) {
  //     scrollTo(activeSlide, true);
  //   }
  // }, []);

  // const scrollTo = useCallback(
  //   (slideIndex: number, jumpWithoutCallbacks = false) => {
  //     const items = getCarouselItems(carouselItemsRef);
  //     const target = items?.[slideIndex];

  //     if (target) {
  //       isScrollingProgrammaticallyToSlide.current = slideIndex;
  //       if (!jumpWithoutCallbacks) {
  //         setActiveSlide(slideIndex);
  //         setSlideCount(items.length);
  //         onSlideChange(slideIndex);
  //       }

  //       carouselItemsRef.current?.scrollTo({
  //         behavior:
  //           jumpWithoutCallbacks || prefersReducedMotion ? 'instant' : 'smooth',
  //         left: target.offsetLeft,
  //       });
  //     }
  //   },
  //   [onSlideChange, prefersReducedMotion],
  // );

  // useEffect(() => {
  //   function getSlideIndex(
  //     element: Element,
  //   ): [index: number, slideCount: number] {
  //     const items = getCarouselItems(carouselItemsRef) ?? [];

  //     return [Array.from(items).indexOf(element as HTMLElement), items.length];
  //   }

  //   if ('onscrollsnapchanging' in window) {
  //     const scrollSnapChange = (event: Event) => {
  //       if (isScrollingProgrammaticallyToSlide.current != null) {
  //         isScrollingProgrammaticallyToSlide.current = null;
  //         return;
  //       }

  //       const [newIndex, slideCount] = getSlideIndex(
  //         (event as Event & { snapTargetInline: Element }).snapTargetInline,
  //       );
  //       setActiveSlide(newIndex);
  //       setSlideCount(slideCount);
  //       onSlideChange(newIndex);
  //     };

  //     carouselItemsRef.current?.addEventListener(
  //       'scrollsnapchanging',
  //       scrollSnapChange,
  //     );

  //     return () =>
  //       carouselItemsRef.current?.removeEventListener(
  //         'scrollsnapchanging',
  //         scrollSnapChange,
  //       );
  //   } else {
  //     // For browers (non chromium) that don't support scroll snap events we fall back to using intersection observer
  //     const instersectionCallback = (entries: IntersectionObserverEntry[]) => {
  //       if (firstIntersectionCallImminent.current) {
  //         firstIntersectionCallImminent.current = false;
  //         isScrollingProgrammaticallyToSlide.current = null;
  //         return;
  //       }

  //       // use a for iteration here so we can break out of the loop early. Of the observered elements we only care about the first one that is intersecting.
  //       for (const entry of entries) {
  //         if (entry.isIntersecting) {
  //           const [newIndex, slideCount] = getSlideIndex(entry.target);

  //           if (isScrollingProgrammaticallyToSlide.current == null) {
  //             setActiveSlide(newIndex);
  //             setSlideCount(slideCount);
  //             onSlideChange(newIndex);
  //           } else if (
  //             newIndex === isScrollingProgrammaticallyToSlide.current
  //           ) {
  //             isScrollingProgrammaticallyToSlide.current = null;
  //           }
  //           break;
  //         }
  //       }
  //     };

  //     const observer = new IntersectionObserver(instersectionCallback, {
  //       root: carouselRef.current,
  //       rootMargin: '0px',
  //       threshold: 0.8,
  //     });

  //     const items = getCarouselItems(carouselItemsRef);

  //     items?.forEach((slide) => {
  //       observer.observe(slide);
  //     });

  //     return () => {
  //       observer.disconnect();
  //       firstIntersectionCallImminent.current = true;
  //     };
  //   }
  // }, [onSlideChange]);

  // const handlePrevious = (evt?: PressEvent) => {
  //   const nextSlide = activeSlide - 1;

  //   scrollTo(nextSlide);

  //   // This method is used both when clicking the button and scrolling the carousel with keys
  //   // if this is a button press, we need to move focus if  we are about to disable this button due to start/end of carousel
  //   if (evt && nextSlide <= 0) {
  //     carouselRef.current
  //       ?.querySelector<HTMLButtonElement>('button[slot="next"]')
  //       ?.focus();
  //   }
  // };

  // const handleNext = (evt?: PressEvent) => {
  //   const nextSlide = activeSlide + 1;
  //   scrollTo(nextSlide);

  //   // This method is used both when clicking the button and scrolling the carousel with keys
  //   // if this is a button press, we need to move focus if  we are about to disable this button due to start/end of carousel
  //   if (evt && nextSlide >= slideCount - 1) {
  //     carouselRef.current
  //       ?.querySelector<HTMLButtonElement>('button[slot="prev"]')
  //       ?.focus();
  //   }
  // };
  //
  return (
    <div className="embla overflow-hidden" data-slot="carousel" ref={emblaRef}>
      {children}
    </div>
  );

  return (
    <div className="embla overflow-hidden" data-slot="carousel" ref={emblaRef}>
      {/*<Provider
        values={[
          [
            CarouselItemsContext,
            {
              carouselItemsRef,
              activeSlide: activeSlide,
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
                  'aria-label': translations.previous[locale],
                  onPress: handlePrevious,
                  isDisabled: activeSlide === 0,
                },
                next: {
                  isIconOnly: true,
                  'aria-label': translations.next[locale],
                  onPress: handleNext,
                  isDisabled: slideCount - 1 <= activeSlide,
                },
              },
            },
          ],
        ]}
      >*/}
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
            className="group/carousel-previous data-disabled:invisible"
          >
            <ChevronLeft className="group-hover/carousel-previous:motion-safe:-translate-x-1 transition-transform" />
          </Button>
          <Button
            isIconOnly
            slot="next"
            variant="primary"
            color="white"
            className="group/carousel-next data-disabled:invisible"
          >
            <ChevronRight className="transition-transform group-hover/carousel-next:motion-safe:translate-x-1" />
          </Button>
        </_CarouselControls>
      </div>
      {/*</Provider>*/}
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
  activeSlide: number;
  handlePrevious?: (evt?: PressEvent) => void;
  handleNext?: (evt?: PressEvent) => void;
};

const CarouselItemsContext = createContext<CarouselItemsContextValue>({
  carouselItemsRef: null,
  activeSlide: 0,
});

const CarouselItems = ({ className, children }: CarouselItemsProps) => {
  const { carouselItemsRef, activeSlide, handleNext, handlePrevious } =
    useContext(CarouselItemsContext);

  const locale = useLocale();

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

    // Trigger next/prev ourselves instead of native scroll snapping keyboard behavior.
    // This fixes the "halfway" scroll effect when hitting the keys multiple times in quick succession.
    if (event.key === 'ArrowLeft' && handlePrevious) {
      event.preventDefault();
      handlePrevious();
    } else if (event.key === 'ArrowRight' && handleNext) {
      event.preventDefault();
      handleNext();
    }
  };

  return <div className="embla__container flex">{children}</div>;

  return (
    // biome-ignore lint/a11y/useSemanticElements: we prefer div over fieldset
    <div
      aria-label={translations.carousel[locale]}
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
      // biome-ignore lint/a11y/noNoninteractiveTabindex: If this is not set, left/right keyboard events won't trigger correctly when first clicking on the carousel with the cursor
      tabIndex={0}
      role="group"
      onKeyDown={handleKeyDown}
      ref={carouselItemsRef}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child as React.ReactElement<CarouselItemProps>, {
            inert: activeSlide === index ? undefined : true,
          });
        }
      })}
    </div>
  );
};

type CarouselItemProps = HTMLProps<HTMLDivElement> & {
  /** The component/components to display as the <CarouselItem/>. */
  children: React.ReactNode;
};

const CarouselItem = ({ className, children, ...rest }: CarouselItemProps) => {
  return (
    <div
      // className={cx(className, 'shrink-0 basis-full snap-start')}
      className="embla__slide min-w-0 shrink-0 grow-0 basis-full"
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
