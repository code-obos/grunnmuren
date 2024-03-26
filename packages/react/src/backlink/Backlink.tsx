import { forwardRef, type Ref } from 'react';
import { cx } from 'cva';
import { Link as RACLink, type LinkProps } from 'react-aria-components';
import { ChevronLeft } from '@obosbbl/grunnmuren-icons-react';

type BacklinkProps = {
  /** Additional CSS className for the element. */
  className?: string;

  /** Additional style properties for the element. */
  style?: React.CSSProperties;

  /** The URL to navigate to when clicking the backlink. */
  href?: string;

  /** The content of the link */
  children?: React.ReactNode;

  /** To underline the link
   * @default false
   */
  withUnderline?: boolean;
} & Omit<LinkProps, 'className' | 'style'>;

function Backlink(props: BacklinkProps, ref: Ref<HTMLAnchorElement>) {
  const { className, children, href, withUnderline, ...restProps } = props;

  return (
    <RACLink
      className={cx(
        className,
        !withUnderline && '[&:not(:hover)]:no-underline',
        'group flex max-w-fit items-center gap-1 rounded-md p-2.5 focus:outline-none focus-visible:ring focus-visible:ring-black',
      )}
      {...restProps}
      ref={ref}
      href={href}
    >
      <ChevronLeft
        className={cx(
          '-ml-[0.5em] flex-shrink-0 transition-transform duration-300 group-hover:-translate-x-1',
        )}
      />
      {children}
    </RACLink>
  );
}

const _Backlink = forwardRef(Backlink);
export { _Backlink as Backlink, type BacklinkProps };
