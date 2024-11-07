import { cva, VariantProps } from 'cva';
import { Provider } from 'react-aria-components';
import { ContentContext, HeadingContext, MediaContext } from '../content';

type CardProps = VariantProps<typeof cardVariants> & {
  children?: React.ReactNode;
  className?: string;
};

const cardVariants = cva({
  base: ['rounded-2xl border p-3', 'grid auto-rows-max gap-y-4'],
  variants: {
    border: {
      black: 'border-black',
      'blue-dark': 'border-blue-dark',
      'green-dark': 'border-green-dark',
      undefined: 'border-transparent',
    },
  },
});

const cardMediaVariants = cva({
  base: [
    // Hide overflow (outside the border radius)
    'overflow-hidden',
    // Bleed to the edges of the card (over the border)
    'mx-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))] mt-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',
  ],
  variants: {
    hasBorder: {
      false: 'rounded-2xl', // All corners rounded
      true: 'rounded-t-2xl', // Only top corners rounded
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
      <Provider
        values={[
          [
            HeadingContext,
            {
              className: 'heading-s text-pretty',
            },
          ],
          [
            ContentContext,
            {
              className: 'grid gap-y-4 auto-rows-max',
            },
          ],
          [
            MediaContext,
            {
              className: cardMediaVariants({
                hasBorder: !!border,
              }),
              aspectRatio: '3:2',
            },
          ],
        ]}
      >
        {children}
      </Provider>
    </div>
  );
};

export { Card, type CardProps };
