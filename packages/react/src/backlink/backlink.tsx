import { ChevronLeft } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { type Ref, forwardRef } from 'react';
import {
  Button,
  type ButtonProps,
  Link,
  type LinkProps as RACLinkProps,
} from 'react-aria-components';

type ButtonOrLinkProps = {
  children?: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
  /** Determines whether to use an anchor or a button for the Backlink */
  href?: RACLinkProps['href'];
  /** To add a permanent underline on the link (not only on hover)
   * @default false
   */
  withUnderline?: boolean;
};

type BacklinkProps = (ButtonProps | RACLinkProps) & ButtonOrLinkProps;

function isLinkProps(
  props: BacklinkProps,
): props is ButtonOrLinkProps & RACLinkProps {
  return !!props.href;
}

function Backlink(
  props: BacklinkProps,
  ref: Ref<HTMLAnchorElement | HTMLButtonElement>,
) {
  const { className, children, withUnderline, ...restProps } = props;

  const Component = isLinkProps(props) ? Link : Button;

  return (
    <Component
      className={cx(
        className,
        'group flex max-w-fit cursor-pointer items-center gap-3 rounded-md p-2.5 no-underline data-[focus-visible]:outline-focus [&:not([data-focus-visible])]:outline-none',
      )}
      {...restProps}
      // @ts-expect-error ignore the type of the ref here
      ref={ref}
    >
      <ChevronLeft
        className={cx(
          '-ml-[0.5em] group-hover:-translate-x-1 flex-shrink-0 transition-transform duration-300',
        )}
      />
      {/* This wrapper is required in order to support the custom underline created with border-bottom when the text spans over multiple lines */}
      <span>
        <span
          className={cx(
            'border-transparent border-t-[1px] border-b-[1px] transition-colors duration-300',
            withUnderline ? 'border-b-black' : 'group-hover:border-b-black',
          )}
        >
          {children}
        </span>
      </span>
    </Component>
  );
}

const _Backlink = forwardRef(Backlink);
export { _Backlink as Backlink, type BacklinkProps };
