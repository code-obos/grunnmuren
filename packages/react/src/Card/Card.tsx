import classNames from 'clsx';
import { defu } from '../utils';

export interface CardProps<T extends React.ElementType> {
  as?: T;
  /** @default white */
  bgColor?: 'white' | 'gray';
}

const defaultProps = {
  bgColor: 'white',
} as const;

export const Card = <T extends React.ElementType = 'div'>(
  props: CardProps<T> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof CardProps<T>>,
) => {
  const {
    as: Component = 'div',
    className,
    bgColor,
    ...rest
  } = defu(props, defaultProps);

  return (
    <Component
      className={classNames(className, 'relative overflow-hidden rounded-3xl', {
        'border-gray-concrete border-2 border-solid bg-white':
          bgColor === 'white',
        'bg-gray-light': bgColor === 'gray',
      })}
      {...rest}
    />
  );
};
