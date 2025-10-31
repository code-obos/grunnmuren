import { cx } from 'cva';
import type { ReactNode } from 'react';
import {
  Link as _Link,
  type LinkProps as _LinkProps,
} from 'react-aria-components';

type LinkProps = _LinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    children: ReactNode;
  };

/**
 * A basic link component that extends react-aria-components Link with consistent styling.
 * Provides accessible focus styles and maintains design system consistency.
 */
const Link = ({ children, className, ...restProps }: LinkProps) => {
  return (
    <_Link
      {...restProps}
      className={cx(
        className,
        'inline-flex cursor-pointer items-center gap-1 font-medium hover:no-underline focus-visible:outline-current focus-visible:outline-focus-offset [&>svg]:shrink-0',
      )}
    >
      {children}
    </_Link>
  );
};

export { Link as UNSAFE_Link, type LinkProps as UNSAFE_LinkProps };
