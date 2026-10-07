import type { Meta, StoryObj } from '@storybook/react-vite';
import { cva } from 'cva';
import { useEffect, useRef, useState } from 'react';
import { fn } from 'storybook/test';

import {
  movingDay,
  newApartmentBlocks,
  obosLogoBlue,
  office,
  podcastStudio,
  portrait,
  residentialArea,
} from '../__stories__/media';
import { Badge } from '../badge';
import {
  UNSAFE_Carousel as Carousel,
  UNSAFE_CarouselButton as CarouselButton,
  UNSAFE_CarouselControls as CarouselControls,
  UNSAFE_CarouselItem as CarouselItem,
  UNSAFE_CarouselItems as CarouselItems,
  UNSAFE_CarouselItemsContainer as CarouselItemsContainer,
  type UNSAFE_CarouselRef as CarouselElement,
} from '../carousel';
import { Media } from '../content';
import { Tab, TabList, TabPanel, Tabs } from '../tabs';

const meta = {
  title: 'Carousel',
  component: Carousel,
  parameters: {
    variant: 'fullscreen',
  },
  args: {
    onSelect: fn(),
    onSettled: fn(),
    align: 'center',
    loop: false,
    orientation: 'horizontal',
    scrollGestures: false,
  },
  render: ({ ...props }) => {
    const itemsVariants = cva({
      base: 'gap-4 *:basis-1/2',
      variants: {
        orientation: { vertical: 'h-84 max-w-xs', horizontal: null },
        loop: { false: null, true: null },
      },
      // Add the correct padding to the container based on the orientation if we're looping
      compoundVariants: [
        {
          orientation: 'vertical',
          loop: true,
          className: 'pt-4',
        },
        {
          orientation: 'horizontal',
          loop: true,
          className: 'pl-4',
        },
      ],
    });

    return (
      <Carousel {...props}>
        <CarouselItemsContainer>
          <CarouselItems className={itemsVariants(props)}>
            <CarouselItem>
              <Media>
                <img src={newApartmentBlocks} alt="" />
              </Media>
            </CarouselItem>
            <CarouselItem>
              <Media>
                <img src={movingDay} alt="" loading="lazy" />
              </Media>
            </CarouselItem>
            <CarouselItem>
              <Media fit="contain">
                <img src={podcastStudio} alt="" loading="lazy" />
              </Media>
            </CarouselItem>
            <CarouselItem>
              <Media>
                <img src={residentialArea} alt="" loading="lazy" />
              </Media>
            </CarouselItem>
          </CarouselItems>
        </CarouselItemsContainer>
        <CarouselControls className="pt-4">
          <CarouselButton slot="prev" />
          <CarouselButton slot="next" />
        </CarouselControls>
      </Carousel>
    );
  },
  // Helpers the stories below compose. Without this they're picked up as stories of
  // their own and rendered without args, which throws.
  excludeStories: ['galleryImages', 'galleryImagesExterior', 'Gallery', 'TabbedImageGallery'],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const DefaultSelectedIndex: Story = {
  args: {
    initialIndex: 3,
  },
};

export const Looping: Story = {
  args: {
    loop: true,
  },
};

export const AutoPlay: Story = {
  args: {
    autoPlayDelay: 3000,
  },
};

export const AutoPlayLooping: Story = {
  args: {
    autoPlayDelay: 3000,
    loop: true,
  },
};

export const ScrollGestures: Story = {
  args: {
    scrollGestures: true,
  },
};

export const OneSlidePerView: Story = {
  args: {
    className: '**:data-[slot="carousel-item"]:basis-full',
  },
};

export const RoundedCorners: Story = {
  args: {
    className:
      '**:data-[slot="carousel-item"]:rounded-3xl **:data-[slot="carousel-item"]:overflow-hidden',
  },
};

export const VariableWidth: Story = {
  args: {
    className:
      '**:data-[slot="carousel-item"]:nth-2:basis-1/3 **:data-[slot="carousel-item"]:nth-4:basis-1/5',
  },
};

export const VerticalOrientation: Story = {
  args: {
    orientation: 'vertical',
  },
};

export const galleryImages = [
  {
    src: newApartmentBlocks,
    alt: 'Nye boligblokker i sentrum',
  },
  {
    src: movingDay,
    alt: 'Live på flyttefot',
  },
  {
    src: office,
    alt: 'På kontoret',
  },
  {
    src: podcastStudio,
    alt: 'Podcast i studio',
  },
  {
    src: obosLogoBlue,
    alt: 'OBOS logo',
  },
  {
    src: residentialArea,
    alt: 'Boligområde',
  },
  {
    src: portrait,
    alt: 'Daniel Kjørberg Siraj',
  },
];

export const galleryImagesExterior = [
  {
    src: office,
    alt: 'På kontoret',
  },
  {
    src: obosLogoBlue,
    alt: 'OBOS logo',
  },
  {
    src: residentialArea,
    alt: 'Boligområde',
  },
  {
    src: portrait,
    alt: 'Daniel Kjørberg Siraj',
  },
  {
    src: newApartmentBlocks,
    alt: 'Nye boligblokker i sentrum',
  },
];
/**
 * Thumbnail strip as a simple scrollable list.
 * Scrolls the active thumbnail into view automatically.
 */
function Thumbnails({
  images,
  onSelect,
  selectedIndex = 0,
}: {
  images: { src: string; alt: string }[];
  onSelect: (index: number) => void;
  selectedIndex?: number;
}) {
  const tablistRef = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const item = refs.current[selectedIndex];
    const list = tablistRef.current;
    if (!item || !list) return;

    list.scrollTo({
      top: item.offsetTop - list.offsetTop,
      behavior: 'smooth',
    });
  }, [selectedIndex]);

  return (
    <div
      ref={tablistRef}
      className="scrollbar-hidden flex shrink-0 basis-1/5 flex-col gap-1 overflow-y-auto max-lg:hidden"
      role="tablist"
      aria-label="Slides"
    >
      {images.map((image, index) => (
        <button
          type="button"
          role="tab"
          className="focus-visible:outline-focus-offset m-2 cursor-pointer aria-selected:scale-90"
          onClick={() => onSelect(index)}
          aria-label={`Slide ${index + 1}`}
          aria-selected={selectedIndex === index}
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
        >
          <img src={image.src} alt="" className="aspect-3/2 w-full object-cover" loading="lazy" />
        </button>
      ))}
    </div>
  );
}

/**
 * A standalone image gallery with thumbnails, blurred backdrop, and carousel controls.
 */
export function Gallery({
  images,
  carouselProps,
}: {
  images: { src: string; alt: string }[];
  carouselProps: Record<string, unknown>;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselRef = useRef<CarouselElement>(null);

  return (
    <section
      className="flex gap-x-8 max-lg:relative max-lg:h-svh max-lg:max-h-full max-lg:items-center max-lg:overflow-hidden lg:aspect-3/2"
      aria-label="Bildegalleri"
    >
      <Thumbnails
        images={images}
        onSelect={(index: number) => {
          carouselRef.current?.goToSlide(index);
        }}
        selectedIndex={selectedIndex}
      />

      {/* Blurred backdrop of current image on small screens */}
      <img
        src={images[selectedIndex]?.src}
        alt=""
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-70 blur-lg lg:hidden"
      />
      <Carousel
        {...carouselProps}
        ref={carouselRef}
        onSelect={setSelectedIndex}
        className="lg:grow lg:p-2"
        loop
      >
        <CarouselItemsContainer className="relative">
          <CarouselItems>
            {images.map((image, index) => (
              <CarouselItem key={index} className="basis-full">
                <figure className="relative">
                  <img
                    className="aspect-3/2 w-full object-cover"
                    src={image.src}
                    alt={image.alt}
                    loading={index > 0 ? 'lazy' : undefined}
                  />
                  <figcaption
                    className="absolute inset-0 flex items-end justify-start p-4"
                    aria-hidden
                  >
                    <Badge color="gray-dark" size="small">
                      {image.alt}
                    </Badge>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselItems>
        </CarouselItemsContainer>
        <div className="relative flex justify-between gap-x-2 p-4">
          <Badge className="flex min-h-0 items-center gap-1 p-2" color="white" size="small">
            <span className="heading-xs">{selectedIndex + 1}</span>
            <span aria-hidden>/</span>
            <span className="sr-only">{'\u00a0av\u00a0'}</span>
            <span>{images.length}</span>
          </Badge>
          <CarouselControls>
            <CarouselButton slot="prev" color="contrast" variant="primary" />
            <CarouselButton slot="next" color="contrast" variant="primary" />
          </CarouselControls>
        </div>
      </Carousel>
    </section>
  );
}

export function TabbedImageGallery({
  carouselProps = {},
}: {
  carouselProps?: Record<string, unknown>;
}) {
  return (
    <Tabs>
      <TabList aria-label="Velg galleri" className="mx-2">
        <Tab id="interior">Interiør</Tab>
        <Tab id="exterior">Eksteriør</Tab>
      </TabList>
      <TabPanel id="interior">
        <Gallery images={galleryImages} carouselProps={carouselProps} />
      </TabPanel>
      <TabPanel id="exterior">
        <Gallery images={galleryImagesExterior} carouselProps={carouselProps} />
      </TabPanel>
    </Tabs>
  );
}

export const ImageGallery: Story = {
  args: {
    align: 'center',
    loop: false,
    orientation: 'horizontal',
  },
  render: (props) => {
    return (
      <div className="container">
        <TabbedImageGallery carouselProps={props} />
      </div>
    );
  },
};
