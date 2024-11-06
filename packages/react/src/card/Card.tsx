import { cva, cx, VariantProps } from 'cva';
import { Provider } from 'react-aria-components';
import { HeadingContext } from '../content';

type CardProps = VariantProps<typeof cardVariants> & {
  children?: React.ReactNode;
  className?: string;
};

const cardVariants = cva({
  base: 'rounded-2xl border p-3',
  variants: {
    border: {
      black: 'border-black',
      'blue-dark': 'border-blue-dark',
      'green-dark': 'border-green-dark',
      undefined: 'border-transparent',
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
        ]}
      >
        {children}
      </Provider>
    </div>
  );
};

type CardBodyProps = {
  children?: React.ReactNode;
  className?: string;
};

const CardBody = ({ children, className, ...restProps }: CardBodyProps) => (
  <div className={cx(className, 'grid gap-y-4')} {...restProps}>
    {children}
  </div>
);

export { Card, type CardProps, type CardBodyProps, CardBody };
