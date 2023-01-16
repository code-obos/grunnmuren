import { cx } from '@/utils';
import { forwardRef } from 'react';

interface CardImageProps extends React.ComponentPropsWithoutRef<'img'> {
  width: number;
  height: number;
}

export const CardImage = forwardRef<HTMLImageElement, CardImageProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <img
        className={cx(className, 'w-full object-cover')}
        loading="lazy"
        {...rest}
        ref={ref}
      />
    );
  },
);
