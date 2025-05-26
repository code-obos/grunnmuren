import { cva, cx, type VariantProps } from 'cva';
import type { HTMLProps } from 'react';
import { GroupContext, Provider } from 'react-aria-components';

type HeroProps = HTMLProps<HTMLDivElement> &
  VariantProps<typeof variants> & {
    children: React.ReactNode;
  };

const variants = cva({
  base: '*:data-[slot="media"]:*:object-cover',
  variants: {
    /**
     * Defines the layout of the Hero
     * @default standard
     * */
    layout: {
      standard: [
        // Wrap content in a container
        'container',
        // Spacing between the media and the text content above it
        '*:data-[slot="media"]:mt-10 lg:*:data-[slot="media"]:mt-12',
        // Round the corners of the media content
        '*:data-[slot="media"]:*:rounded-3xl',
      ],
      'full-bleed': [
        // Wrap text content in a container
        '*:data-[slot="content"]:container',
        // Spacing between the media and the text content above it
        '*:data-[slot="media"]:mt-10 lg:*:data-[slot="media"]:mt-12',
        // biome-ignore lint/nursery/useSortedClasses: biome is unable to sort the custom classes for 3xl and 4xl breakpoints
        '*:data-[slot="media"]:h-70 sm:*:data-[slot="media"]:h-[25rem] md:*:data-[slot="media"]:h-[30rem] lg:*:data-[slot="media"]:h-[35rem] xl:*:data-[slot="media"]:h-[40rem] 2xl:*:data-[slot="media"]:h-[42rem] 3xl:*:data-[slot="media"]:h-[48rem] 4xl:*:data-[slot="media"]:h-[53rem]',
        // Match the heights of the <Media> wrapper for the Media content (e.g. image, VideoLoop, video etc.)
        // biome-ignore lint/nursery/useSortedClasses: biome is unable to sort the custom classes for 3xl and 4xl breakpoints
        '*:data-[slot="media"]:*:h-70 sm:*:data-[slot="media"]:*:h-[25rem] md:*:data-[slot="media"]:*:h-[30rem] lg:*:data-[slot="media"]:*:h-[35rem] xl:*:data-[slot="media"]:*:h-[40rem] 2xl:*:data-[slot="media"]:*:h-[42rem] 3xl:*:data-[slot="media"]:*:h-[48rem] 4xl:*:data-[slot="media"]:*:h-[53rem]',
        // Position the media content to fill the entire viewport width
        '*:data-[slot="media"]:*:absolute *:data-[slot="media"]:*:left-0 *:data-[slot="media"]:*:w-full',
      ],
      'two-column': [
        // Wrap content in a container
        'container',
        // Use a grid layout for two-column layout
        'grid gap-x-16 gap-y-10 lg:grid-cols-2 lg:items-center',
        // Vertical spacing in the text content
        '*:data-[slot="content"]:grid *:data-[slot="content"]:gap-y-7',
        // Round the corners of the media content
        '*:data-[slot="media"]:*:rounded-3xl',
        '*:data-[slot="media"]:*:aspect-[1/1]',
      ],
    },
    /**
     * Defines the level of the Hero in the page hierarchy
     * @default 2 when layout is standard or full-bleed, 1 when layout is two-column
     */
    level: {
      1: '**:data-[slot="heading"]:heading-xl',
      2: '**:data-[slot="heading"]:heading-l',
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
      className: '**:data-[slot="heading"]:heading-l',
    },
    // If the layout is full-bleed, default to level 2
    {
      layout: 'full-bleed',
      level: undefined,
      className: '**:data-[slot="heading"]:heading-l',
    },
    // If the layout is two-column, default to level 1
    {
      layout: 'two-column',
      level: undefined,
      className: '**:data-[slot="heading"]:heading-xl',
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
