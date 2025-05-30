import { type VariantProps, cva } from 'cva';
import type { Ref } from 'react';

type BadgeProps = VariantProps<typeof badgeVariants> & {
  children?: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
  /** Ref to the element. */
  ref?: Ref<HTMLSpanElement>;
};

const badgeVariants = cva({
  base: [
    'inline-flex w-fit items-center justify-center gap-1.5 rounded-lg [&_svg]:shrink-0',
  ],
  variants: {
    color: {
      'gray-dark': 'bg-gray-dark text-white',
      mint: 'bg-mint',
      sky: 'bg-sky',
      white: 'bg-white',
      'blue-dark': 'bg-blue-dark text-white',
      'green-dark': 'bg-green-dark text-white',
    },
    size: {
      small: 'description px-2 py-0.5 [&_svg]:h-4 [&_svg]:w-4',
      medium: 'description px-2.5 py-1.5 [&_svg]:h-4 [&_svg]:w-4',
      large: 'paragraph px-3 py-2 [&_svg]:h-5 [&_svg]:w-5',
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
