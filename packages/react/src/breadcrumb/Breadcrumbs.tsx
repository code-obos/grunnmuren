import { forwardRef } from 'react';
import { cx } from 'cva';
import {
  Breadcrumbs as RACBreadcrumbs,
  Link as RACLink,
  type BreadcrumbsProps as RACBreadcrumbsProps,
} from 'react-aria-components';
import { ChevronRight } from '@obosbbl/grunnmuren-icons-react';
import { Breadcrumb, BreadcrumbProps } from './Breadcrumb';

const defaultClasses = 'flex flex-wrap';

type BreadcrumbsProps = {
  /** Additional CSS className for the element. */
  className?: string;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;
  links: Array<{ href: string; text: string }>;
} & Omit<RACBreadcrumbsProps<BreadcrumbProps>, 'className' | 'style'>;

function Breadcrumbs(props: BreadcrumbsProps) {
  const { className, links, ...restProps } = props;

  return (
    <RACBreadcrumbs {...restProps} className={cx(className, defaultClasses)}>
      {links.map((link, i) => (
        <Breadcrumb key={i} className="flex items-center">
          {i === links.length - 1 ? (
            <p>{link.text}</p>
          ) : (
            <>
              <RACLink href={link.href}>{link.text}</RACLink>
              <ChevronRight className="px-1" />
            </>
          )}
        </Breadcrumb>
      ))}
    </RACBreadcrumbs>
  );
}

const _Breadcrumbs = forwardRef(Breadcrumbs);
export { _Breadcrumbs as Breadcrumbs, type BreadcrumbsProps };
