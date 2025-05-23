import { cx } from 'cva';
import type { HTMLProps } from 'react';

type HeroProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

const Hero = ({ className, children }: HeroProps) => {
  return (
    <div
      className={cx(
        // Wrap text content in a container
        '*:data-[slot="content"]:container',
        // Style the Hero heading
        '**:data-[slot="heading"]:heading-l',
        // Spacing between the media and the text content above it
        '*:data-[slot="media"]:mt-8 lg:*:data-[slot="media"]:mt-10',
        // Responsive heights for the <Media> wrapper component
        // biome-ignore lint/nursery/useSortedClasses: biome is unable to sort the custom classes for 3xl and 4xl breakpoints
        '*:data-[slot="media"]:h-70 sm:*:data-[slot="media"]:h-[25rem] md:*:data-[slot="media"]:h-[30rem] lg:*:data-[slot="media"]:h-[35rem] xl:*:data-[slot="media"]:h-[40rem] 2xl:*:data-[slot="media"]:h-[42rem] 3xl:*:data-[slot="media"]:h-[48rem] 4xl:*:data-[slot="media"]:h-[53rem]',
        // Match the heights of the <Media> wrapper for the Media content (e.g. image, VideoLoop, video etc.)
        // biome-ignore lint/nursery/useSortedClasses: biome is unable to sort the custom classes for 3xl and 4xl breakpoints
        '*:data-[slot="media"]:*:h-70 sm:*:data-[slot="media"]:*:h-[25rem] md:*:data-[slot="media"]:*:h-[30rem] lg:*:data-[slot="media"]:*:h-[35rem] xl:*:data-[slot="media"]:*:h-[40rem] 2xl:*:data-[slot="media"]:*:h-[42rem] 3xl:*:data-[slot="media"]:*:h-[48rem] 4xl:*:data-[slot="media"]:*:h-[53rem]',
        // Position the media content to fill the entire viewport width
        '*:data-[slot="media"]:*:absolute *:data-[slot="media"]:*:left-0 *:data-[slot="media"]:*:w-full *:data-[slot="media"]:*:object-cover',
        className,
      )}
    >
      {children}
    </div>
  );
};

export { Hero as UNSAFE_Hero, type HeroProps as UNSAFE_HeroProps };
