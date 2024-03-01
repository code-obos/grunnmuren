import { forwardRef } from 'react';
import { cx } from 'cva';
import {
  Breadcrumb as RACBreadcrumb,
  type BreadcrumbProps as RACBreadcrumbProps,
} from 'react-aria-components';

const defaultClasses = 'flex items-center';

type BreadcrumbProps = {
  /** Additional CSS className for the element. */
  className?: string;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;

  /** Children  */
  children: React.ReactNode;
} & Omit<RACBreadcrumbProps, 'className' | 'style'>;

function Breadcrumb(props: BreadcrumbProps) {
  const { className, children, ...restProps } = props;

  return (
    <RACBreadcrumb className={cx(defaultClasses, className)} {...restProps}>
      {children}
    </RACBreadcrumb>
  );
}

const _Breadcrumb = forwardRef(Breadcrumb);
export { _Breadcrumb as Breadcrumb, type BreadcrumbProps };
