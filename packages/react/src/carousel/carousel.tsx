import { ChevronLeft, ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { useLayoutEffect } from '@react-aria/utils';
import { cx } from 'cva';
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
  useRef,
  useState,
} from 'react';
import { DEFAULT_SLOT, Provider } from 'react-aria-components';
import { Button, ButtonContext } from '../button';
import { MediaContext } from '../content';
import { translations } from '../translations';
import { useLocale } from '../use-locale';
import { usePrefersReducedMotion } from '../use-prefers-reduced-motion';

type CarouselProps = Omit<HTMLProps<HTMLDivElement>, 'onChange'> & {
  children?: React.ReactNode;
  /**
   * The initial slide to display when the carousel is mounted.
   * @default 0
   */
  defaultInitialSlide?: number;
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
  className,
  children,
  defaultInitialSlide = 0,
  onSlideChange = () => {},
  ...rest
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const firstIntersectionCallImminent = useRef(true);
  const isScrollingProgrammaticallyToSlide = useRef<number>(null);

  const carouselItemsRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const { previous, next } = translations;

  const [activeSlide, setActiveSlide] = useState(defaultInitialSlide);

  // If initial slide is something other than the first, scroll to it.
  // We do this in layoutEffect on mount, without smooth scroll
  useLayoutEffect(() => {
    if (activeSlide > 0) {
      scrollTo(activeSlide, true);
    }
  }, []);

  const scrollTo = useCallback(
    (slideIndex: number, jumpWithoutCallbacks = false) => {
      const items = getCarouselItems(carouselItemsRef);
      const target = items?.[slideIndex];

      if (target) {
        isScrollingProgrammaticallyToSlide.current = slideIndex;
        if (!jumpWithoutCallbacks) {
          setActiveSlide(slideIndex);
          onSlideChange(slideIndex);
        }

        carouselItemsRef.current?.scrollTo({
          behavior:
            jumpWithoutCallbacks || prefersReducedMotion ? 'instant' : 'smooth',
          left: target.offsetLeft,
        });
      }
    },
    [onSlideChange, prefersReducedMotion],
  );

  useEffect(() => {
    function getSlideIndex(element: Element) {
      const items = getCarouselItems(carouselItemsRef);
      return Array.from(items ?? []).indexOf(element as HTMLElement);
    }

    if ('onscrollsnapchanging' in window) {
      const scrollSnapChange = (event: Event) => {
        if (isScrollingProgrammaticallyToSlide.current != null) {
          isScrollingProgrammaticallyToSlide.current = null;
          return;
        }

        const newIndex = getSlideIndex(
          (event as Event & { snapTargetInline: Element }).snapTargetInline,
        );
        setActiveSlide(newIndex);
        onSlideChange(newIndex);
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
      // For browers (non chromium) that don't support scroll snap events we fall back to using intersection observer
      const instersectionCallback = (entries: IntersectionObserverEntry[]) => {
        if (firstIntersectionCallImminent.current) {
          firstIntersectionCallImminent.current = false;
          return;
        }

        // use a for iteration here so we can break out of the loop early. Of the observered elements we only care about the first one that is intersecting.
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const newIndex = getSlideIndex(entry.target);

            if (isScrollingProgrammaticallyToSlide.current == null) {
              setActiveSlide(newIndex);
              onSlideChange(newIndex);
            } else if (
              newIndex === isScrollingProgrammaticallyToSlide.current
            ) {
              isScrollingProgrammaticallyToSlide.current = null;
            }
            break;
          }
        }
      };

      const observer = new IntersectionObserver(instersectionCallback, {
        root: carouselRef.current,
        rootMargin: '0px',
        threshold: 0.8,
      });

      const items = getCarouselItems(carouselItemsRef);

      items?.forEach((slide) => {
        observer.observe(slide);
      });

      return () => {
        observer.disconnect();
        firstIntersectionCallImminent.current = true;
      };
    }
  }, [onSlideChange]);

  const handlePrevious = () => {
    scrollTo(activeSlide - 1);
  };

  const handleNext = () => {
    scrollTo(activeSlide + 1);
  };

  return (
    <div data-slot="carousel" ref={carouselRef}>
      <Provider
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
              className="group/carousel-previous"
            >
              <ChevronLeft className="group-hover/carousel-previous:motion-safe:-translate-x-1 transition-transform" />
            </Button>
            <Button
              isIconOnly
              slot="next"
              variant="primary"
              color="white"
              className="group/carousel-next"
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
  activeSlide: number;
  handlePrevious?: () => void;
  handleNext?: () => void;
};

const CarouselItemsContext = createContext<CarouselItemsContextValue>({
  carouselItemsRef: null,
  activeSlide: 0,
});

const CarouselItems = ({ className, children }: CarouselItemsProps) => {
  const { carouselItemsRef, activeSlide } = useContext(CarouselItemsContext);

  return (
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
