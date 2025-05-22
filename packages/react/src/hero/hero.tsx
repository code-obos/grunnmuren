import { useLayoutEffect, useRef, type HTMLProps } from 'react';
import { cx } from 'cva';

type HeroProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

const Hero = ({ className, children }: HeroProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;

    const media = container.querySelector(
      '[data-slot="media"]',
    ) as HTMLElement | null;

    if (media === null) return;

    media.style.marginLeft = `calc(-${document.documentElement.clientWidth / 2}px + 50%)`;
    const scrollbarWidth = `${window.innerWidth - document.body.clientWidth}px`;
    media.style.maxWidth = `calc(100vw - ${scrollbarWidth})`;
  }, []);
  return (
    <div
      ref={ref}
      className={cx(
        '*:data-[slot="content"]:container',
        '**:data-[slot="heading"]:heading-l',
        '*:data-[slot="media"]:mt-8 lg:*:data-[slot="media"]:mt-10',
        '*:data-[slot="media"]:w-screen lg:*:data-[slot="media"]:mt-10',
        '*:data-[slot="media"]:*:max-h-[39.875rem] *:data-[slot="media"]:*:w-full *:data-[slot="media"]:*:object-cover',
        className,
      )}
    >
      {children}
    </div>
  );
};

export { Hero as UNSAFE_Hero };
