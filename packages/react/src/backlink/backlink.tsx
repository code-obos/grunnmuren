import { ChevronLeft } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import type { Ref } from 'react';
import {
  Button,
  type ButtonProps,
  Link,
  type LinkProps,
} from 'react-aria-components';
import { animateIconVariants } from '../classes';

type ButtonOrLinkProps = {
  children?: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
  /** Determines whether to use an anchor or a button for the Backlink */
  href?: LinkProps['href'];
  /** To add a permanent underline on the link (not only on hover)
   * @default false
   */
  withUnderline?: boolean;
  /** Ref to the element. */
  ref?: Ref<HTMLAnchorElement | HTMLButtonElement>;
};

type BacklinkProps = (ButtonProps | LinkProps) & ButtonOrLinkProps;

function isLinkProps(
  props: BacklinkProps,
): props is ButtonOrLinkProps & LinkProps {
  return !!props.href;
}

function Backlink(props: BacklinkProps) {
  const { className, children, withUnderline, ref, ...restProps } = props;

  const _className = cx(
    className,
    animateIconVariants({ animateIcon: 'left' }),
    'group flex max-w-fit cursor-pointer items-center gap-3 rounded-md p-2.5 font-normal no-underline focus-visible:outline-focus',
  );

  const content = (
    <>
      <ChevronLeft className={cx('-ml-[0.5em] duration-300')} />
      {/* This wrapper is required in order to support the custom underline created with border-bottom when the text spans over multiple lines */}
      <span>
        <span
          className={cx(
            'border-transparent border-y transition-colors duration-300',
            withUnderline ? 'border-b-black' : 'group-hover:border-b-black',
          )}
        >
          {children}
        </span>
      </span>
    </>
  );

  if (isLinkProps(props)) {
    return (
      <Link
        {...(restProps as LinkProps)}
        className={_className}
        ref={ref as Ref<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  return (
    <Button
      {...(restProps as ButtonProps)}
      className={_className}
      ref={ref as Ref<HTMLButtonElement>}
    >
      {content}
    </Button>
  );
}

export { Backlink, type BacklinkProps };
