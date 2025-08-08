import {
  ArrowRight,
  Download,
  LinkExternal,
} from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import type { JSX, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-aria-components';

type _LinkListProps = React.HTMLProps<HTMLUListElement> & {
  children: JSX.Element | JSX.Element[];
};

const LinkList = ({ className, children, ...restProps }: _LinkListProps) => (
  <ul
    {...restProps}
    className={cx(
      className,
      // Hide dividers at the top of the list (overflow-y) and prevents arrow icon from overflowing container when animated to the right (overflow-x)
      'overflow-hidden',
      // Add a small gap between items that fits the divider lines (this way the divider line don't take up any space in each item)
      'grid gap-y-0.25',
      // Add a gap between items if the list is displayed in multiple columns
      'sm:gap-x-4 md:gap-x-9 lg:gap-x-12 xl:gap-x-16',
    )}
  >
    {children}
  </ul>
);

type LinkListItemProps = LinkProps & {
  children: ReactNode;
  isExternal?: boolean;
};

const LinkListItem = ({
  children,
  isExternal,
  ...restProps
}: LinkListItemProps) => {
  let Icon = ArrowRight;
  let iconTransition = 'group-hover:motion-safe:translate-x-1';
  if (restProps.download) {
    Icon = Download;
    iconTransition = 'group-hover:motion-safe:translate-y-1';
  } else if (isExternal) {
    iconTransition =
      'group-hover:motion-safe:-translate-y-0.5 group-hover:motion-safe:translate-x-0.5';
    Icon = LinkExternal;
  }
  return (
    <li
      // Creates divider lines that works in any grid layout and the focus ring
      className="after:-top-0.25 relative p-0.75 after:absolute after:right-0 after:left-0 after:h-0.25 after:w-full after:bg-gray-light"
    >
      <Link
        className={cx(
          'group paragraph flex cursor-pointer justify-between gap-x-2 py-3.5 font-medium no-underline focus-visible:outline-focus',
        )}
        {...restProps}
      >
        <span>{children}</span>
        <Icon
          className={cx(
            'shrink-0 motion-safe:transition-transform',
            iconTransition,
          )}
        />
      </Link>
    </li>
  );
};

export {
  LinkList as UNSAFE_LinkList,
  type _LinkListProps as UNSAFE__LinkListProps,
  LinkListItem as UNSAFE_LinkListItem,
  type LinkListItemProps as UNSAFE_LinkListItemProps,
};
