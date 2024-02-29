import { forwardRef } from 'react';
import { cx } from 'cva';
import {
  Breadcrumbs as RACBreadcrumbs,
  Breadcrumb as RACBreadcrumb,
  Link as RACLink,
} from 'react-aria-components';
import { ChevronRight } from '@obosbbl/grunnmuren-icons-react';

const defaultClasses = 'flex flex-wrap';

type BreadcrumbsProps = {
  /** Additional CSS className for the element. */
  className?: string;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;
  links: Array<{ href: string; label: string }>;
};

function Breadcrumbs(props: BreadcrumbsProps) {
  const { className, links, ...restProps } = props;

  return (
    <RACBreadcrumbs {...restProps} className={cx(className, defaultClasses)}>
      {links.map((link, i) => (
        <RACBreadcrumb key={i} className="flex">
          <RACLink href={link.href}>{link.label}</RACLink>
          <ChevronRight className="-mt-0.5 px-1 align-middle" />
        </RACBreadcrumb>
      ))}
    </RACBreadcrumbs>
  );
}

const _Breadcrumbs = forwardRef(Breadcrumbs);
export { _Breadcrumbs as Breadcrumbs, type BreadcrumbsProps };
