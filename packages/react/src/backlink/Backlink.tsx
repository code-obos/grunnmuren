import { forwardRef, type Ref } from 'react';
import { cx } from 'cva';
import { Link as RACLink, type LinkProps } from 'react-aria-components';
import { ArrowLeft } from '@obosbbl/grunnmuren-icons-react';

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
      className={cx(className, 'flex max-w-fit items-center py-2.5')}
      {...restProps}
      ref={ref}
      href={href}
    >
      <>
        <ArrowLeft className={cx('mr-2', iconStyle)} />
        {children}
      </>
    </RACLink>
  );
}

const _Backlink = forwardRef(Backlink);
export { _Backlink as Backlink, type BacklinkProps };
