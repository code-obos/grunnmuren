import { cx } from 'cva';
import { type Ref, forwardRef } from 'react';
import {
  Breadcrumbs as RACBreadcrumbs,
  type BreadcrumbsProps as RACBreadcrumbsProps,
} from 'react-aria-components';
import type { BreadcrumbProps } from './Breadcrumb';

type BreadcrumbsProps = {
  /** Additional CSS className for the element. */
  className?: string;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;
} & Omit<RACBreadcrumbsProps<BreadcrumbProps>, 'className' | 'style'>;

function Breadcrumbs(props: BreadcrumbsProps, ref: Ref<HTMLOListElement>) {
  const { className, children, ...restProps } = props;

  return (
    <RACBreadcrumbs
      {...restProps}
      className={cx(className, 'flex flex-wrap text-sm leading-6')}
      ref={ref}
    >
      {children}
    </RACBreadcrumbs>
  );
}

const _Breadcrumbs = forwardRef(Breadcrumbs);
export { _Breadcrumbs as Breadcrumbs, type BreadcrumbsProps };
