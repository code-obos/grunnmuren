import { cva, type VariantProps } from 'cva';
import type { Ref } from 'react';

type BadgeProps = VariantProps<typeof badgeVariants> & {
  children?: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
  /** Ref to the element. */
  ref?: Ref<HTMLSpanElement>;
};

const badgeVariants = cva({
  base: ['inline-flex w-fit items-center justify-center gap-1.5 rounded-lg [&_svg]:shrink-0'],
  variants: {
    color: {
      'gray-dark': 'bg-neutral-base-default text-neutral-base-contrast-default',
      mint: 'bg-accent-surface-active text-neutral-text-default',
      sky: 'bg-primary-surface-active text-neutral-text-default',
      white: 'bg-neutral-surface-default text-neutral-text-default',
      'blue-dark': 'bg-primary-base-default text-primary-base-contrast-default',
      'green-dark': 'bg-accent-base-default text-accent-base-contrast-default',
    },
    size: {
      small: 'description px-2 py-0.5 [&_svg]:size-4',
      medium: 'description px-2.5 py-1.5 [&_svg]:size-4',
      large: 'paragraph px-3 py-2 [&_svg]:size-5',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

function Badge(props: BadgeProps) {
  const { className: _className, color, size, ...restProps } = props;

  const className = badgeVariants({
    className: _className,
    color,
    size,
  });

  return <span className={className} {...restProps} data-slot="badge" />;
}

export { Badge, type BadgeProps };
