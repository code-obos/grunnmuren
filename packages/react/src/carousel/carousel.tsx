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
  Children,
  cloneElement,
  createContext,
  type HTMLProps,
  isValidElement,
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
import { translations } from '../translations';
import { useLocale } from '../use-locale';
import { usePrefersReducedMotion } from '../use-prefers-reduced-motion';

type CarouselProps = Omit<HTMLProps<HTMLDivElement>, 'onChange'> & {
  children?: React.ReactNode;
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
   * Callback invoked when the slide changes.
   */
  onSlideChange?: (index: number) => void;
  /**
   * Callback invoked after the carousel scrolling "settles".
   */
  onSettled?: (index: number) => void;
};

type EmblaEventHandler = Parameters<
  NonNullable<UseEmblaCarouselType[1]>['on']
>[1];

const Carousel = ({
  autoPlayDelay,
  className,
  children,
  initialIndex = 0,
  onSlideChange,
  onSettled,
  loop = false,
  ref,
  ...rest
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion() ?? false;

  const emblaPlugins = useMemo(() => {
    const plugins = [WheelGesturesPlugin()];

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
  }, [autoPlayDelay, loop, prefersReducedMotion]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      startIndex: initialIndex,
      // we set inert for the inactive items, so they are not focusable
      watchFocus: false,
    },
    emblaPlugins,
  );

  const [slidesInView, setSlidesInView] = useState<number[]>([initialIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    const emblaHandler: EmblaEventHandler = (_, type) => {
      const scrollSnapIndex = emblaApi.selectedScrollSnap();

      switch (type) {
        case 'select':
          setSlidesInView([scrollSnapIndex]);
          onSlideChange?.(scrollSnapIndex);
          break;
        case 'settle': {
          onSettled?.(scrollSnapIndex);
          break;
        }
      }
    };

    emblaApi.on('select', emblaHandler);
    emblaApi.on('settle', emblaHandler);

    return () => {
      emblaApi.off('select', emblaHandler);
      emblaApi.off('settle', emblaHandler);
    };
  }, [emblaApi, onSlideChange, onSettled]);

  const handleNextPress = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollNext(prefersReducedMotion);

    // we need to move focus if  we are about to disable this button due to start/end of carousel
    if (
      !loop &&
      !emblaApi.canScrollNext() &&
      carouselRef.current
        ?.querySelector<HTMLButtonElement>('button[slot="next"]')
        ?.matches(':focus-visible')
    ) {
      carouselRef.current
        ?.querySelector<HTMLButtonElement>('button[slot="prev"]')
        ?.focus();
    }
  }, [emblaApi, prefersReducedMotion, loop]);

  const handlePrevPress = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollPrev(prefersReducedMotion);

    // we need to move focus if  we are about to disable this button due to start/end of carousel
    if (
      !loop &&
      !emblaApi.canScrollPrev() &&
      carouselRef.current
        ?.querySelector<HTMLButtonElement>('button[slot="prev"]')
        ?.matches(':focus-visible')
    ) {
      carouselRef.current
        ?.querySelector<HTMLButtonElement>('button[slot="next"]')
        ?.focus();
    }
  }, [emblaApi, prefersReducedMotion, loop]);

  const locale = useLocale();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowRight' && !e.repeat) {
        handleNextPress();
      } else if (e.key === 'ArrowLeft' && !e.repeat) {
        handlePrevPress();
      }
    },
    [handleNextPress, handlePrevPress],
  );

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: we want to support keyboard navigations for the carousel
    <div
      className={cx('embla relative', className)}
      data-slot="carousel"
      ref={mergeRefs(ref, carouselRef)}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <Provider
        values={[
          [
            CarouselContext,
            {
              slidesInView,
              '~emblaRef': emblaRef,
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

type CarouselContextValue = {
  slidesInView: number[];
  /**
   * @private
   */
  '~emblaRef': EmblaViewportRefType | null;
};

const CarouselContext = createContext<CarouselContextValue>({
  '~emblaRef': null,
  slidesInView: [],
});

const CarouselItems = ({ className, children }: CarouselItemsProps) => {
  const { slidesInView, '~emblaRef': emblaRef } = useContext(CarouselContext);

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

type CarouselButtonProps = ButtonProps & {
  slot: 'next' | 'prev';
};

const CarouselButton = ({
  className,
  isIconOnly = true,
  color = 'white',
  variant = 'primary',
  slot,
  ...rest
}: CarouselButtonProps) => {
  return (
    <Button
      className={carouselButtonVariants({ className })}
      isIconOnly={isIconOnly}
      slot={slot}
      variant={variant}
      color={color}
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
  type CarouselControlsProps as UNSAFE_CarouselControlsProps,
  type CarouselButtonProps as UNSAFE_CarouselButtonProps,
  type CarouselItemProps as UNSAFE_CarouselItemProps,
  type CarouselItemsProps as UNSAFE_CarouselItemsProps,
  type CarouselProps as UNSAFE_CarouselProps,
};
