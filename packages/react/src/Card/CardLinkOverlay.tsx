import { forwardRef } from 'react';
export interface CardLinkOverlayProps
  extends React.ComponentPropsWithoutRef<'a'> {}

export const CardLinkOverlay = forwardRef<
  HTMLAnchorElement,
  CardLinkOverlayProps
>((props, ref) => {
  return (
    <a
      className="no-underline before:absolute before:top-0 before:left-0 before:block before:h-full before:w-full before:content-[''] hover:underline"
      ref={ref}
      {...props}
    />
  );
});
