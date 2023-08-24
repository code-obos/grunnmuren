import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const chipVariants = cva(
  // 'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  'font-semibold inline-flex items-center rounded-lg w-fit px-4 py-2 border-2',
  {
    variants: {
      variant: {
        contained: 'border-transparent',
        outline: 'bg-white',
      },
      color: {
        'red-light': 'bg-red-light border-red-light',
        'orange-light': 'bg-orange-light border-orange-light',
        'green-light': 'bg-green-light border-green-light',
        'blue-light': 'bg-blue-light border-blue-light',
      },
    },
    defaultVariants: {
      variant: 'contained',
      color: 'green-light',
    },
  },
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {}

function Chip({ className, color, variant, ...props }: ChipProps) {
  return <div className={chipVariants({ color, variant })} {...props} />;
}

export { Chip, chipVariants };
