import { type VariantProps, cva, cx } from 'cva';
import type { HTMLProps } from 'react';
import { GroupContext, Provider } from 'react-aria-components';

type Variants = VariantProps<typeof variants>;

type ExcludeVariants<T> = {
  [K in keyof Variants]?: Exclude<Variants[K], T | undefined>;
};

type HeroBaseProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

type HeroProps1 = HeroBaseProps & ExcludeVariants<'full-bleed' | 2>;

type HeroProps2 = HeroBaseProps & ExcludeVariants<'two-column' | 1>;

type HeroProps = HeroProps1 | HeroProps2;

const roundedMediaCorners = '*:data-[slot="media"]:*:rounded-3xl';

// Common layout for "standard" and "full-bleed" Hero layouts
const oneColumnLayout = [
  // Vertical spacing in the <Content>
  'lg:*:data-[slot="content"]:gap-y-4',
  // Main text content takes up 9 columns on medium screens and above
  'lg:*:data-[slot="content"]:col-span-9',
  // Make sure other elements than <Content> and <Media> (i.e CTA) does not span the full width on small screens
  '*:not-data-[slot="content"]:not-data-[slot="media"]:w-fit',
  // Other elements than <Content> and <Media> (e.g. CTA, SVG logo or Badge) take up 3 columns on medium screens and above, and are right aligned
  'lg:*:not-data-[slot="content"]:not-data-[slot="media"]:col-span-3 lg:*:not-data-[slot="content"]:not-data-[slot="media"]:justify-self-end',
  // <Media> content takes up the full width on medium screens and above
  'lg:*:data-[slot="media"]:col-span-full *:data-[slot="media"]:*:w-full',
  // Aligns <Content> and any element beside it (e.g. <Media>, <Badge>, <CTA> etc.) to the bottom of the <Content> container
  'lg:items-end',
];

const level1Heading = '**:data-[slot="heading"]:heading-xl';
const level2Heading = '**:data-[slot="heading"]:heading-l';

const variants = cva({
  base: [
    'container',
    // Grid layout to position the Hero's content
    'grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16',
    'gap-y-10 lg:gap-y-12',
    // Enable vertical gap within <Content>
    '*:data-[slot="content"]:grid',
    // Vertical spacing in the <Content>
    '*:data-[slot="content"]:gap-y-3',
    // Make sure <Media> content fills any available vertical and horizontal space
    '*:data-[slot="media"]:*:object-cover',
  ],
  variants: {
    /**
     * Defines the layout of the Hero
     * @default standard
     * */
    layout: {
      standard: [roundedMediaCorners, oneColumnLayout],
      'full-bleed': [
        oneColumnLayout,
        // biome-ignore lint/nursery/useSortedClasses: biome is unable to sort the custom classes for 3xl and 4xl breakpoints
        '*:data-[slot="media"]:h-70 sm:*:data-[slot="media"]:h-[25rem] lg:*:data-[slot="media"]:h-[30rem] lg:*:data-[slot="media"]:h-[35rem] xl:*:data-[slot="media"]:h-[40rem] 2xl:*:data-[slot="media"]:h-[42rem] 3xl:*:data-[slot="media"]:h-[48rem] 4xl:*:data-[slot="media"]:h-[53rem]',
        // Match the heights of the <Media> wrapper for the Media content (e.g. image, VideoLoop, video etc.)
        // biome-ignore lint/nursery/useSortedClasses: biome is unable to sort the custom classes for 3xl and 4xl breakpoints
        '*:data-[slot="media"]:*:h-70 sm:*:data-[slot="media"]:*:h-[25rem] lg:*:data-[slot="media"]:*:h-[30rem] lg:*:data-[slot="media"]:*:h-[35rem] xl:*:data-[slot="media"]:*:h-[40rem] 2xl:*:data-[slot="media"]:*:h-[42rem] 3xl:*:data-[slot="media"]:*:h-[48rem] 4xl:*:data-[slot="media"]:*:h-[53rem]',
        // Position the media content to fill the entire viewport width
        '*:data-[slot="media"]:*:absolute *:data-[slot="media"]:*:left-0',
      ],
      'two-column': [
        'lg:items-center lg:*:col-span-6',
        // Vertical spacing in the <Content>
        'lg:*:data-[slot="content"]:gap-y-7',
        roundedMediaCorners,
        // Set media aspect ratio to 1:1 (square)
        'lg:*:data-[slot="media"]:*:aspect-[1/1]',
      ],
    },
    /**
     * Defines the level of the Hero in the page hierarchy
     * @default 2 when layout is standard or full-bleed, 1 when layout is two-column
     */
    level: {
      1: level1Heading,
      2: level2Heading,
    },
  },
  defaultVariants: {
    layout: 'standard',
  },
  compoundVariants: [
    // If the layout is standard or unset, default to level 2
    {
      layout: 'standard',
      level: undefined,
      className: level2Heading,
    },
    // If the layout is full-bleed, default to level 2
    {
      layout: 'full-bleed',
      level: undefined,
      className: level2Heading,
    },
    // If the layout is two-column, default to level 1
    {
      layout: 'two-column',
      level: undefined,
      className: level1Heading,
    },
  ],
});

const Hero = ({ layout, level, className, children }: HeroProps) => {
  const variantsClassName = variants({
    layout,
    level,
    className,
  });
  return (
    <Provider
      values={[
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
      <div className={cx(variantsClassName, className)}>{children}</div>
    </Provider>
  );
};

export { Hero as UNSAFE_Hero, type HeroProps as UNSAFE_HeroProps };
