import { ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { mergeRefs } from '@react-aria/utils';
import { cva, cx } from 'cva';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel, {
  type EmblaViewportRefType,
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import {
  createContext,
  type HTMLProps,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DEFAULT_SLOT, Provider } from 'react-aria-components';
import { Button, ButtonContext, type ButtonProps } from '../button';
import { MediaContext } from '../content';
import { UNSAFE_HeroContext as HeroContext } from '../hero';
import { translations } from '../translations';
import { useLocale } from '../use-locale';
import { usePrefersReducedMotion } from '../use-prefers-reduced-motion';

type CarouselProps = Omit<
  HTMLProps<HTMLDivElement>,
  'onChange' | 'onSelect'
> & {
  children?: React.ReactNode;
  /**
   * Alignment of the items relative to the carousel viewport.
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';
  /** Delay in milliseconds between each automatic transition of the carousel. Any interaction with the carousel will immediately stop the autoplay. */
  autoPlayDelay?: number;
  /**
   * The initial snapped index of the carousel.
   * @default 0
   */
  initialIndex?: number;
  /**
   * Whether the carousel infinitely loops.
   * @default false
   */
  loop?: boolean;
  /**
   * Orientation of the carousel.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Callback invoked when the snapped index changes.
   */
  onSelect?: (index: number) => void;
  /**
   * Callback invoked after the carousel scrolling "settles". Think of this as the debounced version of `onSelect`.
   */
  onSettled?: (index: number) => void;
  /**
   * Whether the carousel should scroll with regular mouse/trackpad scroll gestures, in addition to swipe gestures.
   * @default false
   */
  scrollGestures?: boolean;
};

type EmblaEventHandler = Parameters<
  NonNullable<UseEmblaCarouselType[1]>['on']
>[1];

/**
 * A helper to get the prev/next button from the carousel DOM
 * @param ref The carousel ref
 * @param slot The slot of the button to get ('prev' or 'next')
 * @returns The button element, or undefined if not found
 */
const getCarouselButton = (
  ref: React.RefObject<HTMLDivElement | null>,
  slot: 'prev' | 'next',
) => ref.current?.querySelector<HTMLButtonElement>(`button[slot="${slot}"]`);

/**
 * Focus the first focusable element in the currently snapped slide
 * @param emblaApi The embla carousel API instance
 */
const focusElementInSnappedSlide = (
  emblaApi: UseEmblaCarouselType[1] | undefined,
) => {
  if (!emblaApi) {
    return;
  }

  const index = emblaApi.selectedScrollSnap();
  const targetSlide = emblaApi.slideNodes()[index];
  if (!targetSlide) {
    return;
  }

  // Find first focusable element in the slide
  const focusableElement = targetSlide.querySelector<HTMLElement>(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  // Use preventScroll to avoid the browser's default scroll-into-view behavior
  // which would conflict with embla's scroll animation
  focusableElement?.focus({ preventScroll: true });
};

const Carousel = ({
  autoPlayDelay,
  align = 'center',
  children,
  initialIndex = 0,
  orientation = 'horizontal',
  onSelect,
  onSettled,
  loop = false,
  scrollGestures = false,
  ref,
  ...rest
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion() ?? false;

  const emblaPlugins = useMemo(() => {
    const plugins = [];

    if (scrollGestures) {
      plugins.push(WheelGesturesPlugin());
    }

    if (autoPlayDelay) {
      plugins.push(
        Autoplay({
          delay: autoPlayDelay,
          stopOnLastSnap: !loop,
          jump: prefersReducedMotion,
        }),
      );
    }
    return plugins;
  }, [autoPlayDelay, scrollGestures, loop, prefersReducedMotion]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align,
      loop,
      startIndex: initialIndex,
      axis: orientation === 'horizontal' ? 'x' : 'y',
      inViewThreshold: 0.2,
    },
    emblaPlugins,
  );

  const [slidesInView, setSlidesInView] = useState<number[]>([initialIndex]);
  // We need some default values here. The proper initial values will be set by the embla init handler later
  // for the default values, assume that we can scroll next, but for prev only if looping is enabled
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(loop);
  const previousSettledScrollIndex = useRef(initialIndex);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const emblaHandler: EmblaEventHandler = (_, type) => {
      const scrollSnapIndex = emblaApi.selectedScrollSnap();

      switch (type) {
        case 'select':
          onSelect?.(scrollSnapIndex);
          setCanScrollNext(emblaApi.canScrollNext());
          setCanScrollPrev(emblaApi.canScrollPrev());
          break;
        case 'settle': {
          // We only invoke the callback if the scroll index actually changed from the previous settled index
          // Otherwise this gets triggered if the user does the tiniest bit of scrolling in the carousel, but doesn't transition to the next slide
          if (scrollSnapIndex !== previousSettledScrollIndex.current) {
            previousSettledScrollIndex.current = scrollSnapIndex;
            onSettled?.(scrollSnapIndex);
          }
          break;
        }
        case 'slidesInView': {
          setSlidesInView(emblaApi.slidesInView());
          break;
        }
        case 'init': {
          setCanScrollNext(emblaApi.canScrollNext());
          setCanScrollPrev(emblaApi.canScrollPrev());
          break;
        }
      }
    };

    emblaApi.on('select', emblaHandler);
    emblaApi.on('slidesInView', emblaHandler);
    emblaApi.on('settle', emblaHandler);
    emblaApi.on('init', emblaHandler);

    return () => {
      emblaApi.off('select', emblaHandler);
      emblaApi.off('settle', emblaHandler);
      emblaApi.off('slidesInView', emblaHandler);
      emblaApi.off('init', emblaHandler);
    };
  }, [emblaApi, onSelect, onSettled]);

  const handleNextPress = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.plugins().autoplay?.stop();

    emblaApi.scrollNext(prefersReducedMotion);

    // we need to move focus if  we are about to disable this button due to start/end of carousel
    if (
      !loop &&
      !emblaApi.canScrollNext() &&
      getCarouselButton(carouselRef, 'next')?.matches(':focus-visible')
    ) {
      getCarouselButton(carouselRef, 'prev')?.focus();
    }
  }, [emblaApi, prefersReducedMotion, loop]);

  const handlePrevPress = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.plugins().autoplay?.stop();

    emblaApi.scrollPrev(prefersReducedMotion);

    // we need to move focus if  we are about to disable this button due to start/end of carousel
    if (
      !loop &&
      !emblaApi.canScrollPrev() &&
      getCarouselButton(carouselRef, 'prev')?.matches(':focus-visible')
    ) {
      getCarouselButton(carouselRef, 'next')?.focus();
    }
  }, [emblaApi, prefersReducedMotion, loop]);

  const locale = useLocale();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      // Check if either prev or next button has focus - if so, don't override their focus management
      const carouselButtonHasFocus =
        getCarouselButton(carouselRef, 'prev')?.matches(':focus-visible') ||
        getCarouselButton(carouselRef, 'next')?.matches(':focus-visible');

      if (e.key === 'ArrowRight' && !e.repeat) {
        handleNextPress();
        // Focus first focusable element in the next slide, unless a carousel button has focus
        if (!carouselButtonHasFocus) {
          focusElementInSnappedSlide(emblaApi);
        }
      } else if (e.key === 'ArrowLeft' && !e.repeat) {
        handlePrevPress();
        // Focus first focusable element in the previous slide, unless a carousel button has focus
        if (!carouselButtonHasFocus) {
          focusElementInSnappedSlide(emblaApi);
        }
      }
    },
    [handleNextPress, handlePrevPress, emblaApi],
  );

  const hasHeroContext = !!useContext(HeroContext);
  const nextPrevStyles = hasHeroContext
    ? { color: 'white' as const, variant: 'primary' as const }
    : { variant: 'tertiary' as const };

  return (
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions This is just to enhance keyboard navigation, this is not a replacement for proper focusable elements inside the carousel
    <div
      {...rest}
      data-orientation={orientation}
      data-slot="carousel"
      ref={mergeRefs(ref, carouselRef)}
      onKeyDown={handleKeyDown}
    >
      <Provider
        values={[
          [
            CarouselContext,
            {
              slidesInView,
              '~emblaRef': emblaRef,
              orientation,
            },
          ],
          [
            ButtonContext,
            {
              slots: {
                [DEFAULT_SLOT]: {},
                prev: {
                  'aria-label': translations.previous[locale],
                  isDisabled: !canScrollPrev,
                  onPress: handlePrevPress,
                  ...nextPrevStyles,
                },
                next: {
                  'aria-label': translations.next[locale],
                  isDisabled: !canScrollNext,
                  onPress: handleNextPress,
                  ...nextPrevStyles,
                },
              },
            },
          ],
        ]}
      >
        {children}
      </Provider>
    </div>
  );
};

type CarouselContextValue = {
  slidesInView: number[];
  orientation: 'horizontal' | 'vertical';
  /**
   * @private
   */
  '~emblaRef': EmblaViewportRefType | null;
};

const CarouselContext = createContext<CarouselContextValue>({
  '~emblaRef': null,
  orientation: 'horizontal',
  slidesInView: [],
});

type CarouselItemsContainer = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

const CarouselItemsContainer = ({
  children,
  className,
  ...rest
}: CarouselItemsContainer) => {
  const { '~emblaRef': emblaRef } = useContext(CarouselContext);

  return (
    <div
      className={cx(className, 'overflow-hidden')}
      ref={emblaRef}
      data-slot="carousel-items-container"
      {...rest}
    >
      {children}
    </div>
  );
};

type CarouselItemsProps = HTMLProps<HTMLDivElement> & {
  /** The <CarouselItem/> components to be displayed within the carousel. */
  children: React.ReactNode;
};

const CarouselItems = ({ className, children }: CarouselItemsProps) => {
  const { orientation } = useContext(CarouselContext);

  return (
    <div
      className={cx(
        className,
        'flex',
        orientation === 'vertical' && 'flex-col',
      )}
      data-slot="carousel-items"
    >
      {children}
    </div>
  );
};

type CarouselControlsProps = HTMLProps<HTMLDivElement> & {
  /** The <CarouselItem/> components to be displayed within the carousel. */
  children: React.ReactNode;
};

/**
 * This is internal for now, but we will expose it in the future when we support more flexible positioning of prev/next and other actions.
 * It is used to render the prev/next buttons in the carousel for now.
 */
const CarouselControls = ({
  children,
  className,
  ...rest
}: CarouselControlsProps) => (
  <div
    className={cx(className, 'flex justify-end gap-x-2')}
    data-slot="carousel-controls"
    {...rest}
    // All items of the carousel are accessible to the screen reader at all times, so these controls will only confuse screen reader users
    aria-hidden="true"
  >
    {children}
  </div>
);

const carouselButtonVariants = cva({
  base: 'group data-disabled:invisible',
});

const carouselButtonIconSlotVariants = cva({
  base: 'transition-transform',
  variants: {
    slot: {
      next: null,
      prev: null,
    },
    orientation: {
      horizontal: null,
      vertical: null,
    },
  },
  compoundVariants: [
    // horizontal controls
    {
      slot: 'next',
      orientation: 'horizontal',
      className: 'group-hover:motion-safe:translate-x-1',
    },
    {
      slot: 'prev',
      orientation: 'horizontal',
      className: 'group-hover:motion-safe:-translate-x-1 rotate-180',
    },
    // vertical controls
    {
      slot: 'next',
      orientation: 'vertical',
      className: 'rotate-90 group-hover:motion-safe:translate-y-1',
    },
    {
      slot: 'prev',
      orientation: 'vertical',
      className: 'group-hover:motion-safe:-translate-y-1 -rotate-90',
    },
  ],
});

type CarouselButtonProps = ButtonProps & {
  slot: 'next' | 'prev';
};

const CarouselButton = ({
  className,
  isIconOnly = true,
  slot,
  ...rest
}: CarouselButtonProps) => {
  const { orientation } = useContext(CarouselContext);
  return (
    <Button
      className={carouselButtonVariants({ className })}
      isIconOnly={isIconOnly}
      slot={slot}
      {...rest}
    >
      <ChevronRight
        className={carouselButtonIconSlotVariants({ orientation, slot })}
      />
    </Button>
  );
};

type CarouselItemProps = HTMLProps<HTMLDivElement> & {
  /** The component/components to display as the <CarouselItem/>. */
  children: React.ReactNode;
};

const CarouselItem = ({ className, children, ...rest }: CarouselItemProps) => {
  return (
    <div
      {...rest}
      className={cx(
        className,
        'min-w-0 shrink-0 grow-0',
        '*:data-[slot=media]:aspect-square',
        '*:data-[slot=media]:max-sm:data-[fit="contain"]:*:object-cover',
        '*:data-[slot=media]:sm:aspect-4/3',
        '*:data-[slot=media]:md:aspect-3/2',
        '*:data-[slot=media]:lg:aspect-2/1',
        '*:data-[slot=media]:*:h-full',
        '*:data-[slot=media]:*:w-full',
        '*:data-[slot=media]:data-[fit="contain"]:bg-blue-dark',
      )}
      data-slot="carousel-item"
    >
      <Provider
        values={[
          [
            MediaContext,
            {
              fit: 'cover',
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
  CarouselButton as UNSAFE_CarouselButton,
  CarouselContext as UNSAFE_CarouselContext,
  CarouselControls as UNSAFE_CarouselControls,
  CarouselItem as UNSAFE_CarouselItem,
  CarouselItems as UNSAFE_CarouselItems,
  CarouselItemsContainer as UNSAFE_CarouselItemsContainer,
  type CarouselButtonProps as UNSAFE_CarouselButtonProps,
  type CarouselContextValue as UNSAFE_CarouselContextValue,
  type CarouselControlsProps as UNSAFE_CarouselControlsProps,
  type CarouselItemProps as UNSAFE_CarouselItemProps,
  type CarouselItemsContainer as UNSAFE_CarouselItemsContainerProps,
  type CarouselItemsProps as UNSAFE_CarouselItemsProps,
  type CarouselProps as UNSAFE_CarouselProps,
};
