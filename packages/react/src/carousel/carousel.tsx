import { ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { cva, cx } from 'cva';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel, {
  type EmblaViewportRefType,
} from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import {
  Children,
  cloneElement,
  createContext,
  type HTMLProps,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

const Carousel = ({
  autoPlayDelay,
  className,
  children,
  defaultInitialSlide = 0,
  onSlideChange = () => {},
  loop = false,
  ...rest
}: CarouselProps) => {
  const emblaPlugins = useMemo(() => {
    const plugins = [WheelGesturesPlugin()];

    if (autoPlayDelay) {
      plugins.push(Autoplay({ delay: autoPlayDelay, stopOnLastSnap: !loop }));
    }
    return plugins;
  }, [autoPlayDelay, loop]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      startIndex: defaultInitialSlide,
      // we set inert for the inactive slides
      watchFocus: false,
    },
    emblaPlugins,
  );

  const prefersReducedMotion = usePrefersReducedMotion();

  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', () => {
      setSlidesInView([emblaApi.selectedScrollSnap()]);
    });

    // TODO: cleanup
    setSlidesInView([emblaApi.selectedScrollSnap()]);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev(prefersReducedMotion ?? false);
  }, [emblaApi, prefersReducedMotion]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext(prefersReducedMotion ?? false);
  }, [emblaApi, prefersReducedMotion]);

  const locale = useLocale();

  return (
    <div
      className={cx('embla relative', className)}
      data-slot="carousel"
      {...rest}
    >
      <Provider
        values={[
          [
            CarouselItemsContext,
            {
              slidesInView,
              emblaRef,
            },
          ],
          [
            ButtonContext,
            {
              slots: {
                [DEFAULT_SLOT]: {},
                prev: {
                  'aria-label': translations.previous[locale],
                  isDisabled: !emblaApi?.canScrollPrev(),
                  onPress: scrollPrev,
                },
                next: {
                  'aria-label': translations.next[locale],
                  isDisabled: !emblaApi?.canScrollNext(),
                  onPress: scrollNext,
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
  //     <div
  //       {...rest}
  //       className={cx(
  //         className,
  //         'relative rounded-3xl',
  //         // If any <CarouselItems/> (the scroll-snap container) or <VideoLoop/> component is focused, apply custom focus styles around the carousel, this makes ensures that the focus outline is visible around the carousel in all cases
  //         '[&:has([data-slot="carousel-items"]:focus-visible,[data-slot="video-loop-button"]:focus-visible)]:outline-focus',
  //         '[&:has([data-slot="carousel-items"]:focus-visible,[data-slot="video-loop-button"]:focus-visible)]:outline-focus-offset',
  //         // Unset the default focus outline for potential video loop buttons, as it interferes with the custom focus styles for the carousel
  //         '**:data-[slot="video-loop-button"]:focus-visible:outline-none',
  //       )}
  //     >
  //       {children}
  //     </div>
  //     {/*</Provider>*/}
  //   </div>
  // );
};

type CarouselItemsProps = HTMLProps<HTMLDivElement> & {
  /** The <CarouselItem/> components to be displayed within the carousel. */
  children: React.ReactNode;
};

type CarouselItemsContextValue = {
  slidesInView: number[];
  emblaRef: EmblaViewportRefType | null;
};

const CarouselItemsContext = createContext<CarouselItemsContextValue>({
  emblaRef: null,
  slidesInView: [],
});

const CarouselItems = ({ className, children }: CarouselItemsProps) => {
  // const { carouselItemsRef, activeSlide, handleNext, handlePrevious } =
  //   useContext(CarouselItemsContext);

  // const locale = useLocale();

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
  //   // Prevent default behavior when holding down arrow keys (when repeat is true)
  //   // The default behavior in scroll snapping causes a staggering scroll effect that feels janky
  //   if (
  //     event.repeat &&
  //     (event.key === 'ArrowLeft' || event.key === 'ArrowRight')
  //   ) {
  //     event.preventDefault();
  //     return;
  //   }

  //   // Trigger next/prev ourselves instead of native scroll snapping keyboard behavior.
  //   // This fixes the "halfway" scroll effect when hitting the keys multiple times in quick succession.
  //   if (event.key === 'ArrowLeft' && handlePrevious) {
  //     event.preventDefault();
  //     handlePrevious();
  //   } else if (event.key === 'ArrowRight' && handleNext) {
  //     event.preventDefault();
  //     handleNext();
  //   }
  // };
  //

  const { slidesInView, emblaRef } = useContext(CarouselItemsContext);

  return (
    <div
      className={cx(className, 'embla__viewport overflow-hidden rounded-3xl')}
      ref={emblaRef}
      onKeyDown={(e) => console.log(e)}
    >
      <div className="embla__container flex">
        {Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            return cloneElement(
              child as React.ReactElement<CarouselItemProps>,
              {
                inert: slidesInView.includes(index) ? undefined : true,
              },
            );
          }
        })}
      </div>
    </div>
  );

  // return (
  //   // biome-ignore lint/a11y/useSemanticElements: we prefer div over fieldset
  //   <div
  //     aria-label={translations.carousel[locale]}
  //     data-slot="carousel-items"
  //     className={cx(className, [
  //       'scrollbar-hidden',
  //       'flex',
  //       'snap-x',
  //       'snap-mandatory',
  //       'overflow-x-auto',
  //       'outline-none',
  //       'rounded-[inherit]',
  //     ])}
  //     // biome-ignore lint/a11y/noNoninteractiveTabindex: If this is not set, left/right keyboard events won't trigger correctly when first clicking on the carousel with the cursor
  //     tabIndex={0}
  //     role="group"
  //     onKeyDown={handleKeyDown}
  //     ref={carouselItemsRef}
  //   >
  //     {Children.map(children, (child, index) => {
  //       if (isValidElement(child)) {
  //         return cloneElement(child as React.ReactElement<CarouselItemProps>, {
  //           inert: activeSlide === index ? undefined : true,
  //         });
  //       }
  //     })}
  //   </div>
  // );
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
    className={cx(
      className,
      'absolute right-6 bottom-6 flex gap-x-2',
      // // Make it easier to position in full-bleed hero variants (these style have no other side effects)
      // 'items-end *:h-fit',
    )}
    data-slot="carousel-controls"
    {...rest}
  >
    {children}
  </div>
);

const carouselButtonVariants = cva({
  base: 'group data-disabled:invisible',
});

const carouselButtonIconSlotVariants = cva({
  base: 'group data-disabled:invisible',
  variants: {
    slot: {
      next: 'group-hover:motion-safe:translate-x-1',
      prev: 'group-hover:motion-safe:-translate-x-1 rotate-180',
    },
  },
});

const CarouselButton = ({
  className,
  slot,
  ...rest
}: {
  slot: 'next' | 'prev';
}) => {
  return (
    <Button
      isIconOnly
      slot={slot}
      variant="primary"
      color="white"
      className={carouselButtonVariants({ className })}
      {...rest}
    >
      <ChevronRight className={carouselButtonIconSlotVariants({ slot })} />
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
      className={cx(
        className,
        'embla__slide min-w-0 shrink-0 grow-0 basis-full',
      )}
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
  CarouselButton as UNSAFE_CarouselButton,
  CarouselControls as UNSAFE_CarouselControls,
  type CarouselItemProps as UNSAFE_CarouselItemProps,
  type CarouselItemsProps as UNSAFE_CarouselItemsProps,
  type CarouselProps as UNSAFE_CarouselProps,
};
