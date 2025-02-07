import { ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { type Ref, forwardRef } from 'react';
import {
  Link,
  Breadcrumb as RACBreadcrumb,
  type BreadcrumbProps as RACBreadcrumbProps,
  type LinkProps as RACLinkProps,
} from 'react-aria-components';

type BreadcrumbProps = {
  /** Additional CSS className for the element. */
  className?: string;
  children?: React.ReactNode;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;

  /** The URL to navigate to when clicking the breadcrumb. */
  href?: RACLinkProps['href'];
} & Omit<RACBreadcrumbProps, 'className' | 'style'>;

function Breadcrumb(props: BreadcrumbProps, ref: Ref<HTMLLIElement>) {
  const { className, children, href, ...restProps } = props;

  return (
    <RACBreadcrumb
      className={cx(className, 'group flex items-center')}
      {...restProps}
      ref={ref}
    >
      {href ? (
        <Link
          href={href}
          // use outline instead of ring for focus marker that can be offset without creating a white background between the focus marker and the element content
          className="rounded-sm group-last:no-underline data-[focus-visible]:outline-focus [&:not([data-focus-visible])]:outline-none"
        >
          {children}
        </Link>
      ) : (
        children
      )}
      <ChevronRight className="px-1 group-last:hidden" />
    </RACBreadcrumb>
  );
}

const _Breadcrumb = forwardRef(Breadcrumb);
export { _Breadcrumb as Breadcrumb, type BreadcrumbProps };
