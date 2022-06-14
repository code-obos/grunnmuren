import classNames from 'clsx';
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
      className={classNames(
        className,
        "no-underline before:absolute before:top-0 before:left-0 before:block before:h-full before:w-full before:content-[''] hover:underline",
      )}
      ref={ref}
      {...rest}
    />
  );
});
