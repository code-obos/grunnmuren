import { cx } from 'cva';
import type { Ref } from 'react';
import {
  Breadcrumbs as RACBreadcrumbs,
  type BreadcrumbsProps as RACBreadcrumbsProps,
} from 'react-aria-components';
import type { OmitRACStyleProps } from '../type-helpers';
import type { BreadcrumbProps } from './breadcrumb';

type BreadcrumbsProps = {
  ref?: Ref<HTMLOListElement>;
} & OmitRACStyleProps<RACBreadcrumbsProps<BreadcrumbProps>>;

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
