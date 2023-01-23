import { forwardRef, useContext } from 'react';
import { cx } from '@/utils';
import { HeroContext } from './Hero';

interface HeroActionsProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
  children?: React.ReactNode;
}

export const HeroActions = forwardRef<HTMLDivElement, HeroActionsProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    const { contentPosition } = useContext(HeroContext);

    return (
      <div
        className={cx(
          className,
          'grid items-center justify-center justify-items-center gap-4 md:grid-flow-col',
          // Left align actions/buttons
          {
            'md:justify-start':
              contentPosition === 'vertical-split' ||
              contentPosition === 'below-left',
          },
        )}
        {...rest}
        ref={ref}
      />
    );
  },
);
