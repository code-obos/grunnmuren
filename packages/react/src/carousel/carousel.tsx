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
  ref,
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

  const [slidesInView, setSlidesInView] = useState<number[]>([
    defaultInitialSlide,
  ]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', () => {
      const scrollSnap = emblaApi.selectedScrollSnap();
      setSlidesInView([scrollSnap]);
      onSlideChange(scrollSnap);
    });
  }, [emblaApi, onSlideChange]);

  const handleNextPress = useCallback(() => {
    if (!emblaApi) return;
    console.log(ref);

    emblaApi.scrollNext(prefersReducedMotion ?? false);

    if (loop && !emblaApi.canScrollNext()) {
      carouselRef.current
        ?.querySelector<HTMLButtonElement>('button[slot="prev"]')
        ?.focus();
    }
  }, [emblaApi, prefersReducedMotion, loop]);

  const handlePrevPress = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollPrev(prefersReducedMotion ?? false);

    if (loop && !emblaApi.canScrollNext()) {
      carouselRef.current
        ?.querySelector<HTMLButtonElement>('button[slot="prev"]')
        ?.focus();
    }
  }, [emblaApi, prefersReducedMotion, loop]);

  const locale = useLocale();

  return (
    <div
      className={cx('embla relative', className)}
      data-slot="carousel"
      ref={ref}
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
                  onPress: handlePrevPress,
                },
                next: {
                  'aria-label': translations.next[locale],
                  isDisabled: !emblaApi?.canScrollNext(),
                  onPress: handleNextPress,
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
  const { slidesInView, emblaRef } = useContext(CarouselItemsContext);

  return (
    <div
      className={cx(className, 'embla__viewport overflow-hidden rounded-3xl')}
      ref={emblaRef}
      data-slot="carousel-viewport"
    >
      <div className="embla__container flex" data-slot="carousel-items">
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
  base: 'transition-transform',
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
