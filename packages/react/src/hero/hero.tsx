import type { HTMLProps } from 'react';
import { cx } from 'cva';

type HeroProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

const Hero = ({ className, children }: HeroProps) => {
  return (
    <div
      className={cx(
        '*:data-[slot="content"]:container',
        '**:data-[slot="heading"]:heading-l',
        '*:data-[slot="media"]:mt-8 lg:*:data-[slot="media"]:mt-10',
        '*:data-[slot="media"]:h-80 lg:*:data-[slot="media"]:h-[39.875rem]',
        '*:data-[slot="media"]:*:absolute *:data-[slot="media"]:*:left-0 *:data-[slot="media"]:*:h-80 *:data-[slot="media"]:*:w-full *:data-[slot="media"]:*:object-cover lg:*:data-[slot="media"]:*:h-[39.875rem]',
        className,
      )}
    >
      {children}
    </div>
  );
};

export { Hero as UNSAFE_Hero };
