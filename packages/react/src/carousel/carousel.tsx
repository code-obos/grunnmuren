import { cva, cx, type VariantProps } from 'cva';
import { createContext, useEffect, useRef, useState } from 'react';
import { ButtonContext } from '../button';
import { useLocale } from '../use-locale';
import { translations } from '../translations';
import { useUpdateEffect } from '@react-aria/utils';
import { GroupContext, Provider } from 'react-aria-components';
import { ArrowLeft, ArrowRight } from '@obosbbl/grunnmuren-icons-react';
import { useDebouncedCallback } from 'use-debounce';

type CarouselProps = {
  /** The <CarouselItem/> components to be displayed within the carousel. */
  children: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
};

const Carousel = ({ className, children }: CarouselProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const { previous, next } = translations;

  const [scrollTargetIndex, setScrollTargetIndex] = useState(0);

  const [hasReachedScrollStart, setHasReachedScrollStart] = useState(
    scrollTargetIndex === 0,
  );

  const [hasReachedScrollEnd, setHasReachedScrollEnd] = useState(
    !ref.current || ref.current.children.length - 1 === scrollTargetIndex,
  );

  useEffect(() => {
    setHasReachedScrollStart(scrollTargetIndex === 0);
    setHasReachedScrollEnd(
      !ref.current || ref.current.children.length - 1 === scrollTargetIndex,
    );
  }, [scrollTargetIndex]);

  // Handle scrolling when user clicks the arrow icons
  useUpdateEffect(() => {
    if (!ref.current) return;

    ref.current.children[scrollTargetIndex]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  }, [scrollTargetIndex]);

  const onScroll = useDebouncedCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;

      // Calculate the index of the item that is currently in view
      const newScrollTargetIndex = Array.from(target.children).findIndex(
        (child) => {
          const rect = child.getBoundingClientRect();
          return (
            rect.left >= 0 && rect.right <= window.innerWidth && rect.top >= 0
          );
        },
      );

      if (newScrollTargetIndex !== -1) {
        setScrollTargetIndex(newScrollTargetIndex);
      }
    },
    100,
  );

  return (
    <div
      data-slot="carousel"
      className={cx(
        className,
        'relative rounded-3xl',
        '[&:has([data-slot="carousel-items"]:focus-visible,[data-slot="video-loop-button"]:focus-visible)]:outline-focus [&:has([data-slot="carousel-items"]:focus-visible,[data-slot="video-loop-button"]:focus-visible)]:outline-focus-offset',
        // Unset the default focus outline for potential video loop buttons, as it interferes with the custom focus styles for the carousel
        '**:data-[slot="video-loop-button"]:focus-visible:outline-none',
        // biome-ignore lint/nursery/useSortedClasses: biome is unable to sort the custom classes for 3xl and 4xl breakpoints
        'h-70 sm:h-[25rem] lg:h-[35rem] xl:h-[40rem] 2xl:h-[42rem] 3xl:h-[48rem] 4xl:h-[53rem]',
      )}
    >
      <Provider
        values={[
          [
            CarouselItemsContext,
            {
              ref,
              onScroll,
            },
          ],
          [
            GroupContext,
            {
              className: 'absolute right-6 bottom-6 flex gap-x-2',
              // Prevents the group from being announced as a group by screen readers
              // The Group component is used to group the prev/next buttons together visually, and has no semantic meaning
              role: 'presentation',
            },
          ],
          [
            ButtonContext,
            {
              slots: {
                prev: {
                  isIconOnly: true,
                  'aria-label': previous[locale],
                  variant: 'primary',
                  color: 'white',
                  onPress: () => {
                    if (scrollTargetIndex > 0) {
                      setScrollTargetIndex((prev) => prev - 1);
                    }
                  },
                  className: cx(
                    'group/carousel-previous',
                    'transition-opacity',
                    hasReachedScrollStart && 'pointer-events-none opacity-0',
                  ),
                  isDisabled: hasReachedScrollStart,
                  children: (
                    <ArrowLeft className="group-hover/carousel-previous:motion-safe:-translate-x-1 transition-transform" />
                  ),
                },
                next: {
                  isIconOnly: true,
                  'aria-label': next[locale],
                  variant: 'primary',
                  color: 'white',
                  onPress: () => {
                    if (!ref.current) return;
                    if (scrollTargetIndex < ref.current.children.length - 1) {
                      setScrollTargetIndex((prev) => prev + 1);
                    }
                  },
                  className: cx(
                    'group/carousel-next',
                    'transition-opacity',
                    hasReachedScrollEnd && 'pointer-events-none opacity-0',
                  ),
                  isDisabled: hasReachedScrollEnd,
                  children: (
                    <ArrowRight className="transition-transform group-hover/carousel-next:motion-safe:translate-x-1" />
                  ),
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

type CarouselItemsProps = {
  /** Additional CSS className for the element. */
  children: React.ReactNode;
  /** The <CarouselItem/> components to be displayed within the carousel. */
  className?: string;
};

type CarouselItemsContextValue = {
  ref: React.Ref<HTMLDivElement>;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
};

const CarouselItemsContext = createContext({
  ref: null,
} as CarouselItemsContextValue);

const CarouselItems = ({ className, children }: CarouselItemsProps) => (
  <CarouselItemsContext.Consumer>
    {({ ref, onScroll }) => (
      <div
        data-slot="carousel-items"
        className={cx(className, [
          'scrollbar-hidden',
          'flex',
          'snap-x',
          'snap-mandatory',
          'overflow-x-auto',
          'outline-none',
          'h-full',
          'rounded-[inherit]',
        ])}
        ref={ref}
        // When the SnapEvent is supported: https://developer.mozilla.org/en-US/docs/Web/API/SnapEvent
        // We can use the scrollsnapchange event to detect when the user has scrolled to a new item.
        // We can then use Array.from(event.target.children).indexOf(event.snapTargetInline) to calculate the index of the item that is currently in view.
        // Another option is to use the scrollEnd event, when Safiri supports it: https://developer.apple.com/documentation/webkitjs/snap_event/scrollend_event
        onScroll={onScroll}
      >
        {children}
      </div>
    )}
  </CarouselItemsContext.Consumer>
);

type CarouselItemProps = VariantProps<typeof carouselItemVariant> & {
  className?: string;
  children: React.ReactNode;
};

const carouselItemVariant = cva({
  base: 'shrink-0 basis-full snap-start *:h-full *:w-full',
  variants: {
    /**
     * Control how the content should be placed with the object-fit property
     * You might for example want to use `fit="contain"` portrait images that should not be cropped
     * @default cover
     * */
    fit: {
      cover: '*:object-cover',
      contain: 'bg-blue-dark *:object-contain',
    },
    default: {
      fit: 'cover',
    },
  },
});

const CarouselItem = ({ fit, className, children }: CarouselItemProps) => {
  const _className = carouselItemVariant({ fit });

  return (
    <div className={cx(className, _className)} data-slot="carousel-item">
      {children}
    </div>
  );
};

export {
  Carousel as UNSAFE_Carousel,
  CarouselItem as UNSAFE_CarouselItem,
  CarouselItems as UNSAFE_CarouselItems,
  type CarouselItemsProps as UNSAFE_CarouselItemsProps,
  type CarouselItemProps as UNSAFE_CarouselItemProps,
  type CarouselProps as UNSAFE_CarouselProps,
};
