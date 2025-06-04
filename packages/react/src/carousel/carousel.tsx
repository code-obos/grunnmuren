import { ArrowLeft, ArrowRight } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { Button } from '../button';

type CarouselProps = {
  /** The <CarouselItem/> components to be displayed within the carousel. */
  children: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
};

const Carousel = ({ className, children }: CarouselProps) => (
  <div className="relative">
    <div
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
      <Button isIconOnly aria-label="forrige" variant="primary" color="white">
        <ArrowLeft />
      </Button>
      <Button isIconOnly aria-label="neste" variant="primary" color="white">
        <ArrowRight />
      </Button>
    </div>
  </div>
);

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
