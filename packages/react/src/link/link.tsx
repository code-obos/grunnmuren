import { cx } from 'cva';
import type { ReactNode } from 'react';
import { Link, type LinkProps } from 'react-aria-components';

type CustomLinkProps = LinkProps & {
  children: ReactNode;
};

/**
 * A basic link component that extends react-aria-components Link with consistent styling.
 * Provides accessible focus styles and maintains design system consistency.
 */
const CustomLink = ({ children, className, ...restProps }: CustomLinkProps) => {
  return (
    <Link
      {...restProps}
      className={cx(
        className,
        'cursor-pointer font-medium focus-visible:outline-focus-offset',
      )}
    >
      {children}
    </Link>
  );
};

export { CustomLink as UNSAFE_Link, type CustomLinkProps as UNSAFE_LinkProps };
