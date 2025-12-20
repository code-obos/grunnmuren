import { cx } from 'cva';
import {
  Breadcrumbs as RACBreadcrumbs,
  type BreadcrumbsProps as RACBreadcrumbsProps,
} from 'react-aria-components';
import type { RACTypeHelper } from '../type-helpers';
import type { BreadcrumbProps } from './breadcrumb';

type BreadcrumbsProps = RACTypeHelper<
  RACBreadcrumbsProps<BreadcrumbProps>,
  HTMLOListElement
>;

function Breadcrumbs(props: BreadcrumbsProps) {
  const { className, children, ...restProps } = props;

  return (
    <RACBreadcrumbs
      {...restProps}
      className={cx(className, 'flex flex-wrap text-sm leading-6')}
    >
      {children}
    </RACBreadcrumbs>
  );
}

export { Breadcrumbs, type BreadcrumbsProps };
