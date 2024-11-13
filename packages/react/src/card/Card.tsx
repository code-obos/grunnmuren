import { cva, VariantProps } from 'cva';

type CardProps = VariantProps<typeof cardVariants> & {
  children?: React.ReactNode;
  className?: string;
};

const cardVariants = cva({
  base: [
    'rounded-2xl border p-3',
    'grid auto-rows-max gap-y-4',
    // Heading styles:
    '[&_[data-slot="heading"]]:heading-s [&_[data-slot="heading"]]:text-pretty',
    // Content styles:
    '[&_[data-slot="content"]]:grid [&_[data-slot="content"]]:auto-rows-max [&_[data-slot="content"]]:gap-y-4',
    // Media styles:
    '[&_[data-slot="media"]]:overflow-hidden', // Prevent content from overflowing the rounded corners
    '[&_[data-slot="media"]]:rounded-t-2xl', // Top corners are always rounded
    // Position media at the edges of the card (because of these negative margins the media-element must be a wrapper around the actual image or other media content)
    '[&_[data-slot="media"]]:mx-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))] [&_[data-slot="media"]]:mt-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',
    // Sets the aspect ratio of the media content (width: 100% is necessary to make aspect ratio work in FF)
    '[&_[data-slot="media"]>*]:aspect-[3/2] [&_[data-slot="media"]>*]:w-full [&_[data-slot="media"]_img]:object-cover',
  ],
  variants: {
    border: {
      black: 'border-black',
      'blue-dark': 'border-blue-dark',
      'green-dark': 'border-green-dark',
      undefined: [
        'border-transparent',
        // Media styles:
        '[&_[data-slot="media"]]:rounded-b-2xl',
      ],
    },
  },
});

const Card = ({
  children,
  className: _className,
  border,
  ...restProps
}: CardProps) => {
  const className = cardVariants({
    className: _className,
    border,
  });
  return (
    <div className={className} {...restProps}>
      {children}
    </div>
  );
};

export { Card, type CardProps };
