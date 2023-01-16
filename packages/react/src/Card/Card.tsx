import { cx } from '@/utils';
import { forwardRef } from 'react';

export interface CardProps<T extends React.ElementType> {
  /** @default div */
  as?: T;
  /** @default white */
  bgColor?: 'white' | 'gray';
}

const CardInner = <T extends React.ElementType = 'div'>(
  props: CardProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof CardProps<T>>,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const {
    as: Component = 'div',
    className,
    bgColor = 'white',
    ...rest
  } = props;

  return (
    <Component
      className={cx(className, 'relative overflow-hidden rounded-3xl', {
        'border-2 border-solid bg-white': bgColor === 'white',
        'bg-gray-light': bgColor === 'gray',
      })}
      {...rest}
      ref={ref}
    />
  );
};

export const Card = forwardRef(CardInner);
