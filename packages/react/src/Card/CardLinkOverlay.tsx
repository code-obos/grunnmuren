import { cx } from '@/utils';
import { forwardRef } from 'react';

export interface CardLinkOverlayProps
  extends React.ComponentPropsWithoutRef<'a'> {}

export const CardLinkOverlay = forwardRef<
  HTMLAnchorElement,
  CardLinkOverlayProps
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <a
      className={cx(
        className,
        'no-underline before:absolute before:left-0 before:top-0 before:block before:h-full before:w-full hover:underline',
      )}
      ref={ref}
      {...rest}
    />
  );
});