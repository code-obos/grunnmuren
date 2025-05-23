import type { HTMLProps } from 'react';
import { cx } from 'cva';

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
        '*:data-[slot="media"]:h-80 sm:*:data-[slot="media"]:h-96 md:*:data-[slot="media"]:h-[30rem] lg:*:data-[slot="media"]:h-[39.875rem] xl:*:data-[slot="media"]:h-[45rem] 2xl:*:data-[slot="media"]:h-[50rem]',
        // Match the heights of the <Media> wrapper for the Media content (e.g. image, VideoLoop, video etc.)
        '*:data-[slot="media"]:*:h-80 sm:*:data-[slot="media"]:*:h-96 md:*:data-[slot="media"]:*:h-[30rem] lg:*:data-[slot="media"]:*:h-[39.875rem] xl:*:data-[slot="media"]:*:h-[45rem] 2xl:*:data-[slot="media"]:*:h-[50rem]',
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
