import { cva, cx, type VariantProps } from 'cva';
import { createContext, type HTMLProps } from 'react';
import { GroupContext, Provider } from 'react-aria-components';
import { HeadingContext } from '../content';

type HeroProps = HTMLProps<HTMLDivElement> &
  VariantProps<typeof variants> & {
    children: React.ReactNode;
  };

type HeroContextValue = {
  variant: HeroProps['variant'];
};

const HeroContext = createContext<HeroContextValue | null>(null);

// Common variant for "standard" and "full-bleed" Hero variants
const oneColumnLayout = [
  // Vertical spacing in the <Content>
  'lg:*:data-[slot="content"]:gap-y-4',
  // Main text content takes up 9 columns on medium screens and above
  'lg:*:data-[slot="content"]:col-span-9',
  // Make sure other elements than <Content> and <Media> (i.e CTA) does not span the full width on small screens
  '*:not-data-[slot="content"]:not-data-[slot="media"]:w-fit',
  // Other elements than <Content> and <Media> (e.g. CTA, SVG logo or Badge) take up 3 columns on medium screens and above, and are right aligned
  'lg:*:not-data-[slot="content"]:not-data-[slot="media"]:not-data-[slot="carousel"]:col-span-3 lg:*:not-data-[slot="content"]:not-data-[slot="media"]:justify-self-end',
  // <Media> and <Carousel> content takes up the full width on medium screens and above
  'lg:*:data-[slot="media"]:col-span-full *:data-[slot="media"]:*:w-full',
  'lg:*:data-[slot="carousel"]:col-span-full',
  // Aligns <Content> and any element beside it (e.g. <Media>, <Badge>, <CTA> etc.) to the bottom of the <Content> container
  'lg:items-end',
];

const nonFullBleedAspectRatiosForSmallScreens =
  '*:data-[slot="media"]:*:aspect-[1/1] sm:*:data-[slot="media"]:*:aspect-4/3 md:*:data-[slot="media"]:*:aspect-3/2';

const variants = cva({
  base: [
    'container px-0', // We want to eliminate the default padding on the container, as this component will typically be put inside a container
    // Grid variant to position the Hero's content
    'grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16',
    'gap-y-10 lg:gap-y-12',
    // Enable vertical gap within <Content>
    '*:data-[slot="content"]:grid',
    // Vertical spacing in the <Content>
    '*:data-[slot="content"]:gap-y-3',
    // Make sure <Media> content fills any available vertical and horizontal space
    '*:data-[slot="media"]:*:object-cover',
    '*:data-[slot="carousel"]:overflow-hidden *:data-[slot="carousel"]:rounded-3xl',
    // Make the carousel items full width, so we scroll one at a time
    '**:data-[slot="carousel-item"]:basis-full',
  ],
  variants: {
    /**
     * Defines the variant of the Hero
     * @default standard
     * */
    variant: {
      standard: [
        oneColumnLayout,
        nonFullBleedAspectRatiosForSmallScreens,
        'lg:*:data-[slot="media"]:*:aspect-2/1',
      ],
      'full-bleed': [
        oneColumnLayout,
        // Position the media and carousel content to fill the entire viewport width
        '*:data-[slot="media"]:*:absolute *:data-[slot="media"]:*:left-0',
        // Special case for Carousel, where the Media is nested inside a CarouselItem
        '*:data-[slot="carousel"]:**:data-[slot="media"]:w-full',
        // Match the heights of the <Media> or <Carousel> wrapper for the Media content (e.g. image, VideoLoop, video etc.)
        // This is necessary due to the absolute positioning of the media and carousel containers in this variant
        // biome-ignore lint/nursery/useSortedClasses: biome is unable to sort the custom classes for 3xl and 4xl breakpoints
        '**:data-[slot="media"]:h-80 sm:**:data-[slot="media"]:h-[25rem] md:**:data-[slot="media"]:h-[30rem] lg:**:data-[slot="media"]:h-[35rem] xl:**:data-[slot="media"]:h-[40rem] 2xl:**:data-[slot="media"]:h-[42rem] 3xl:**:data-[slot="media"]:h-[48rem] 4xl:**:data-[slot="media"]:h-[53rem]',
        '**:data-[slot="media"]:*:h-[inherit]',
        // biome-ignore lint/nursery/useSortedClasses: biome is unable to sort the custom classes for 3xl and 4xl breakpoints
        '*:data-[slot="carousel"]:h-80 sm:*:data-[slot="carousel"]:h-[25rem] md:*:data-[slot="carousel"]:h-[30rem] lg:*:data-[slot="carousel"]:h-[35rem] xl:*:data-[slot="carousel"]:h-[40rem] 2xl:*:data-[slot="carousel"]:h-[42rem] 3xl:*:data-[slot="carousel"]:h-[48rem] 4xl:*:data-[slot="carousel"]:h-[53rem]',
        '*:data-[slot="carousel"]:w-full!',
        // Override aspect ratio of the media and carousel-item slots (since we can not use aspect for full-bleed layout)
        '**:data-[slot="carousel-item"]:data-[slot="media"]:*:aspect-none',
        // break out the carousel out of the container
        '**:data-[slot="carousel-items-container"]:absolute **:data-[slot="carousel-items-container"]:right-0 **:data-[slot="carousel-items-container"]:left-0 **:data-[slot="carousel-items-container"]:h-[inherit]',
        // Positions the carousel controls inside the carousel
        '**:data-[slot="carousel-controls"]:z-10 **:data-[slot="carousel-controls"]:mb-4 *:data-[slot="carousel"]:flex *:data-[slot="carousel"]:items-end *:data-[slot="carousel"]:justify-end',
      ],
      'two-column': [
        'lg:items-center lg:*:col-span-6',
        // Vertical spacing in the <Content>
        'lg:*:data-[slot="content"]:gap-y-7',
        nonFullBleedAspectRatiosForSmallScreens,
        // Set media aspect ratio to 1:1 (square)
        'lg:*:data-[slot="media"]:*:aspect-square',
      ],
    },
  },
  compoundVariants: [
    {
      variant: ['standard', 'two-column'],
      className: [
        '*:data-[slot="media"]:*:rounded-3xl',
        '**:data-[slot="carousel-controls"]:absolute *:data-[slot="carousel"]:relative **:data-[slot="carousel-controls"]:right-4 **:data-[slot="carousel-controls"]:bottom-4 **:data-[slot="carousel-container"]:rounded-3xl',
      ],
    },
  ],
  defaultVariants: {
    variant: 'standard',
  },
});

const Hero = ({ variant, className, children, ...rest }: HeroProps) => {
  const variantsClassName = variants({
    variant,
    className,
  });
  return (
    <Provider
      values={[
        [HeroContext, { variant }],
        [
          HeadingContext,
          {
            // Sets the default heading size for the Hero based on the variant
            size: variant === 'two-column' ? 'xl' : 'l',
            className:
              // word-break:break-word to allow long words to break (this is necessary to make hyphens work in grid containers in Safari)
              'hyphens-auto text-pretty [word-break:break-word]',
          },
        ],
        [
          GroupContext,
          {
            // Prevents the group from being announced as a group by screen readers
            // The Group component is used to group the Hero's CTA buttons together visually, and has no semantic meaning
            role: 'presentation',
            className: 'flex flex-wrap gap-3 *:w-fit',
          },
        ],
      ]}
    >
      <div className={cx(variantsClassName, className)} {...rest}>
        {children}
      </div>
    </Provider>
  );
};

export {
  Hero as UNSAFE_Hero,
  HeroContext as UNSAFE_HeroContext,
  type HeroProps as UNSAFE_HeroProps,
  type HeroContextValue as UNSAFE_HeroContextValue,
};
