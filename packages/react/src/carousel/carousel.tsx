import { ArrowLeft, ArrowRight } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../button';
import { useLocale } from '../use-locale';
import { translations } from '../translations';
import { useUpdateEffect } from '@react-aria/utils';

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

  const hasReachedScrollStart = scrollTargetIndex === 0;

  //   const hasReachedScrollEnd = !ref.current || ref.current.children.length - 1 === scrollTargetIndex;
  const [hasReachedScrollEnd, setHasReachedScrollEnd] = useState(
    !ref.current || ref.current.children.length - 1 === scrollTargetIndex,
  );

  useEffect(() => {
    // Check if the current scroll target index is the last item
    setHasReachedScrollEnd(
      !ref.current || ref.current.children.length - 1 === scrollTargetIndex,
    );
  });

  // Handle scrolling when user clicks the arrow icons
  useUpdateEffect(() => {
    if (!ref.current) return;

    ref.current.children[scrollTargetIndex]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  }, [scrollTargetIndex]);

  return (
    <div className="relative">
      <div
        ref={ref}
        className={cx(className, [
          'scrollbar-hidden',
          'flex',
          'snap-x',
          'snap-mandatory',
          'overflow-x-auto',
          'outline-none',
          'focus-visible:ring-focus',
          'focus-visible:ring-focus-offset',
          'h-full',
          'rounded-[inherit]',
        ])}
        data-slot="carousel"
      >
        {children}
      </div>
      <div className="absolute right-6 bottom-6 flex gap-x-2">
        <Button
          isIconOnly
          aria-label={previous[locale]}
          variant="primary"
          color="white"
          onPress={() => {
            if (scrollTargetIndex > 0) {
              setScrollTargetIndex((prev) => prev - 1);
            }
          }}
          className={cx(hasReachedScrollStart && 'invisible')}
          isDisabled={hasReachedScrollStart}
        >
          <ArrowLeft />
        </Button>
        <Button
          isIconOnly
          aria-label={next[locale]}
          variant="primary"
          color="white"
          onPress={() => {
            if (!ref.current) return;
            if (scrollTargetIndex < ref.current.children.length - 1) {
              setScrollTargetIndex((prev) => prev + 1);
            }
          }}
          className={cx(hasReachedScrollEnd && 'invisible')}
          isDisabled={hasReachedScrollEnd}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

type CarouselItemProps = {
  className?: string;
  children: React.ReactNode;
};

const CarouselItem = ({ className, children }: CarouselItemProps) => (
  <div
    className={cx(
      className,
      'shrink-0 basis-full snap-start *:h-full *:w-full *:object-cover',
    )}
    data-slot="carousel-item"
  >
    {children}
  </div>
);

export {
  Carousel as UNSAFE_Carousel,
  CarouselItem as UNSAFE_CarouselItem,
  type CarouselItemProps as UNSAFE_CarouselItemProps,
  type CarouselProps as UNSAFE_CarouselProps,
};
