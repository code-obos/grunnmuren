import { cx } from 'cva';
import type { Ref } from 'react';
import {
  Breadcrumbs as RACBreadcrumbs,
  type BreadcrumbsProps as RACBreadcrumbsProps,
} from 'react-aria-components';
import type { BreadcrumbProps } from './breadcrumb';

type BreadcrumbsProps = {
  /** Additional CSS className for the element. */
  className?: string;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;
  /** Ref to the element. */
  ref?: Ref<HTMLOListElement>;
} & Omit<RACBreadcrumbsProps<BreadcrumbProps>, 'className' | 'style'>;

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
