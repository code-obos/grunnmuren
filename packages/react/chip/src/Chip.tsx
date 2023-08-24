import { cva, type VariantProps } from 'class-variance-authority';

const chipVariants = cva(
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

export interface ChipBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof chipVariants> {}

function ChipBase({ className, color, variant, ...props }: ChipBaseProps) {
  return (
    <div className={chipVariants({ className, color, variant })} {...props} />
  );
}

export { ChipBase, chipVariants };
