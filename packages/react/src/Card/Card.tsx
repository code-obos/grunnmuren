import { cx } from '@/utils';

export interface CardProps<T extends React.ElementType> {
  /** @default div */
  as?: T;
  /** @default white */
  bgColor?: 'white' | 'gray';
}

export const Card = <T extends React.ElementType = 'div'>(
  props: CardProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof CardProps<T>>,
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
    />
  );
};
