import { forwardRef, type Ref, HTMLProps } from 'react';
import { cx } from 'cva';
import { ChevronLeft } from '@obosbbl/grunnmuren-icons-react';

type BacklinkProps = {
  /** Additional CSS className for the element. */
  className?: string;

  /** The URL to navigate to when clicking the backlink. */
  href?: string;

  /** To add a permanent underline on the link (not only on hover)
   * @default false
   */
  withUnderline?: boolean;
} & HTMLProps<HTMLAnchorElement>;

function Backlink(props: BacklinkProps, ref: Ref<HTMLAnchorElement>) {
  const { className, children, href, withUnderline, ...restProps } = props;

  return (
    <a
      className={cx(
        className,
        'group flex max-w-fit items-center gap-3 rounded-md p-2.5 no-underline focus:outline-none focus-visible:ring focus-visible:ring-black',
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
      <span
        className={cx(
          'border-b-[1px] border-t-[1px] border-transparent leading-none transition-colors duration-300',
          withUnderline ? 'border-b-black' : 'group-hover:border-b-black',
        )}
      >
        {children}
      </span>
    </a>
  );
}

const _Backlink = forwardRef(Backlink);
export { _Backlink as Backlink, type BacklinkProps };
