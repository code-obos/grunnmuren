import { cx } from '@/utils';
import { forwardRef } from 'react';

interface CardContentProps extends React.ComponentPropsWithoutRef<'div'> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <div className={cx(className, 'p-8 md:px-10')} {...rest} ref={ref} />
    );
  },
);
