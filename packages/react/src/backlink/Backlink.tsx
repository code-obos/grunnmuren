import { forwardRef, type Ref } from 'react';
import { cx } from 'cva';
import { Link as RACLink, type LinkProps } from 'react-aria-components';
import { ChevronLeft } from '@obosbbl/grunnmuren-icons-react';

type BacklinkProps = {
  /** Additional CSS className for the element. */
  className?: string;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;

  /** The URL to navigate to when clicking the breadcrumb. */
  href?: string;

  /** Icon styling */
  iconStyle?: string;
} & Omit<LinkProps, 'className' | 'style'>;

function Backlink(props: BacklinkProps, ref: Ref<HTMLAnchorElement>) {
  const { className, children, href, iconStyle, ...restProps } = props;

  return (
    <RACLink
      className={cx(
        className,
        'group flex max-w-fit items-center rounded-md py-2.5 pr-1 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-black',
      )}
      {...restProps}
      ref={ref}
      href={href}
    >
      <>
        <ChevronLeft
          className={cx(
            'mr-2 transition-transform duration-300 group-hover:-translate-x-1',
            iconStyle,
          )}
        />
        {children}
      </>
    </RACLink>
  );
}

const _Backlink = forwardRef(Backlink);
export { _Backlink as Backlink, type BacklinkProps };
