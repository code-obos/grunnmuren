import { ChevronLeft, ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { useUpdateEffect } from '@react-aria/utils';
import { cx } from 'cva';
import {
  createContext,
  type HTMLProps,
  type JSX,
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

type CarouselProps = HTMLProps<HTMLDivElement> & {
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

  // Keep track of the previous index to determine if the user is scrolling forward or backward
  // This is used to determine which callback to call (onPrev or onNext)
  const prevIndex = useRef(0);

  // Handle scrolling when user clicks the arrow icons
  useUpdateEffect(() => {
    if (!ref.current) return;

    ref.current.children[scrollTargetIndex]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });

    if (prevIndex.current !== scrollTargetIndex && onChange) {
      onChange({
        index: scrollTargetIndex,
        id: ref.current.children[scrollTargetIndex]?.id,
        prevIndex: prevIndex.current,
        prevId: ref.current.children[prevIndex.current]?.id,
      });
    }

    prevIndex.current = scrollTargetIndex;
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
    <div data-slot="carousel">
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
            ButtonContext,
            {
              slots: {
                [DEFAULT_SLOT]: {}, // this is required in RAC (for non-trigger buttons)
                prev: {
                  'aria-label': previous[locale],
                  onPress: () => {
                    if (scrollTargetIndex > 0) {
                      setScrollTargetIndex((prev) => prev - 1);
                    }
                  },
                  isDisabled: hasReachedScrollStart,
                },
                next: {
                  isIconOnly: true,
                  'aria-label': next[locale],
                  onPress: () => {
                    if (!ref.current) return;
                    if (scrollTargetIndex < ref.current.children.length - 1) {
                      setScrollTargetIndex((prev) => prev + 1);
                    }
                  },
                  isDisabled: hasReachedScrollEnd,
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

type CarouselItemProps = HTMLProps<HTMLDivElement> & {
  /** The component/components to display as the <CarouselItem/>. */
  children: JSX.Element | JSX.Element[];
};

const CarouselItem = ({ className, children, id }: CarouselItemProps) => {
  return (
    <div
      className={cx(className, 'shrink-0 basis-full snap-start')}
      data-slot="carousel-item"
      id={id}
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
