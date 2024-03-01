import { forwardRef } from 'react';
import { cx } from 'cva';
import {
  Breadcrumbs as RACBreadcrumbs,
  type BreadcrumbsProps as RACBreadcrumbsProps,
} from 'react-aria-components';
import { BreadcrumbProps } from './Breadcrumb';

const defaultClasses = 'flex flex-wrap';

type BreadcrumbsProps = {
  /** Additional CSS className for the element. */
  className?: string;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;
} & Omit<RACBreadcrumbsProps<BreadcrumbProps>, 'className' | 'style'>;

function Breadcrumbs(props: BreadcrumbsProps) {
  const { className, children, ...restProps } = props;

  return (
    <RACBreadcrumbs {...restProps} className={cx(className, defaultClasses)}>
      {children}
    </RACBreadcrumbs>
  );
}

const _Breadcrumbs = forwardRef(Breadcrumbs);
export { _Breadcrumbs as Breadcrumbs, type BreadcrumbsProps };
