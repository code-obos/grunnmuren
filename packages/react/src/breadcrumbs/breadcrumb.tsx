import { ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import {
  Breadcrumb as RACBreadcrumb,
  type BreadcrumbProps as RACBreadcrumbProps,
} from 'react-aria-components';
import {
  UNSAFE_Link as Link,
  type UNSAFE_LinkProps as LinkProps,
} from '../link';
import type { RACTypeHelper } from '../type-helpers';

type BreadcrumbProps = {
  /** The URL to navigate to when clicking the breadcrumb. */
  href?: LinkProps['href'];
} & RACTypeHelper<RACBreadcrumbProps, HTMLLIElement>;

function Breadcrumb(props: BreadcrumbProps) {
  const { className, children, href, ...restProps } = props;

  return (
    <RACBreadcrumb
      className={cx(className, 'group flex items-center')}
      {...restProps}
    >
      {href ? (
        <Link
          href={href}
          // use outline instead of ring-3 for focus marker that can be offset without creating a white background between the focus marker and the element content
          className="rounded-xs font-normal hover:underline focus-visible:outline-focus group-last:no-underline"
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

export { Breadcrumb, type BreadcrumbProps };
