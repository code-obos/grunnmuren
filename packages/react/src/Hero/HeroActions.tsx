import { useContext } from 'react';
import classNames from 'clsx';
import { HeroContext } from './Hero';

interface HeroActionsProps {
  className?: string;
  children?: React.ReactNode;
}

export const HeroActions = (props: HeroActionsProps) => {
  const { className, ...rest } = props;

  const { contentPosition } = useContext(HeroContext);

  return (
    <div
      className={classNames(
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
    />
  );
};
