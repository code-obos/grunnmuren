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
        'inline-flex cursor-pointer items-center gap-1 font-medium hover:no-underline focus-visible:outline-current focus-visible:outline-focus-offset [&>svg]:shrink-0 [&>svg]:motion-safe:transition-transform',
      )}
    >
      {children}
    </Link>
  );
};

export { CustomLink as UNSAFE_Link, type CustomLinkProps as UNSAFE_LinkProps };
