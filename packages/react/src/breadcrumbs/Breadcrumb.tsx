import { forwardRef, type Ref } from 'react';
import { cx } from 'cva';
import {
  Link,
  Breadcrumb as RACBreadcrumb,
  type BreadcrumbProps as RACBreadcrumbProps,
} from 'react-aria-components';
import { ChevronRight } from '@obosbbl/grunnmuren-icons-react';

type BreadcrumbProps = {
  /** Additional CSS className for the element. */
  className?: string;
  children?: React.ReactNode;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;

  /** The URL to navigate to when clicking the breadcrumb. */
  href?: string;
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
          className="rounded-sm data-[focus-visible]:focus-outline-black focus:outline-none group-last:no-underline"
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
