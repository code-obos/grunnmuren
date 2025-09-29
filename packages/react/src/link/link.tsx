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
        'inline-flex cursor-pointer items-center gap-1 font-medium focus-visible:outline-focus-offset [&>svg]:shrink-0',
      )}
    >
      {children}
    </Link>
  );
};

export { CustomLink as Link, type CustomLinkProps as LinkProps };
