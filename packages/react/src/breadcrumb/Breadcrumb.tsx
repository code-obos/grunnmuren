import { forwardRef, type Ref } from 'react';
import { cx } from 'cva';
import {
  Link,
  Breadcrumb as RACBreadcrumb,
  type BreadcrumbProps as RACBreadcrumbProps,
} from 'react-aria-components';
import { ChevronRight } from '@obosbbl/grunnmuren-icons-react';

const defaultClasses = 'flex items-center';

type BreadcrumbProps = {
  /** Additional CSS className for the element. */
  className?: string;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;
  href?: string;

  /** Children  */
} & Omit<RACBreadcrumbProps, 'className' | 'style'>;

function Breadcrumb(props: BreadcrumbProps, ref: Ref<HTMLLIElement>) {
  const { className, children, href, ...restProps } = props;

  return (
    <RACBreadcrumb
      className={cx(defaultClasses, className, 'group')}
      {...restProps}
      ref={ref}
    >
      {href ? (
        <Link href={href} className="group-last:no-underline">
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
