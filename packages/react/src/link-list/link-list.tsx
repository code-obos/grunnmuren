import {
  ArrowRight,
  Download,
  LinkExternal,
} from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { Children, type JSX, type ReactNode } from 'react';
import {
  UNSAFE_Link as Link,
  type UNSAFE_LinkProps as LinkProps,
} from '../link/link';

type LinkListProps = React.HTMLProps<HTMLDivElement> & {
  children: JSX.Element | JSX.Element[];
};

const LinkList = ({ className, children, ...restProps }: LinkListProps) => {
  const numberofLinks = Children.count(children);
  return (
    <div className={cx(className, '@container')} {...restProps}>
      <ul
        className={cx(
          'min-w-fit',
          // Hide dividers at the top of the list (overflow-y) and prevents arrow icon from overflowing container when animated to the right (overflow-x)
          'overflow-hidden',
          // Add a small gap between items that fits the divider lines (this way the divider line don't take up any space in each item)
          'grid auto-rows-max gap-y-px',
          // Gaps for when the list is displayed in multiple columns
          '@lg:gap-x-12 @md:gap-x-9 @sm:gap-x-4 @xl:gap-x-16',
          numberofLinks > 5 && [
            '@xl:grid-cols-2',
            (numberofLinks === 9 || numberofLinks > 10) && '@4xl:grid-cols-3',
          ],
        )}
      >
        {children}
      </ul>
    </div>
  );
};

type LinkListItemProps = LinkProps & {
  children: ReactNode;
  isExternal?: boolean;
};

const LinkListItem = ({
  children,
  isExternal,
  className,
  ...restProps
}: LinkListItemProps) => {
  let Icon = ArrowRight;
  let iconTransition = 'group-hover:motion-safe:translate-x-1';

  if (restProps.download) {
    Icon = Download;
    iconTransition = cx('group-hover:motion-safe:translate-y-1');
  } else if (isExternal) {
    iconTransition = cx(
      'group-hover:motion-safe:-translate-y-0.5 group-hover:motion-safe:translate-x-0.5',
    );
    Icon = LinkExternal;
  }

  return (
    <li
      // Creates divider lines that works in any grid layout and with the focus ring
      className="after:-top-px relative p-0.75 after:absolute after:right-0 after:left-0 after:h-px after:w-full after:bg-gray-light"
    >
      <Link
        {...restProps}
        className={cx(
          className,
          'group paragraph flex w-full cursor-pointer justify-between gap-x-2 py-3.5 font-medium no-underline focus-visible:outline-focus',
        )}
      >
        <span>{children}</span>
        <Icon className={iconTransition} />
      </Link>
    </li>
  );
};

export {
  LinkList as UNSAFE_LinkList,
  type LinkListProps as UNSAFE_LinkListProps,
  LinkListItem as UNSAFE_LinkListItem,
  type LinkListItemProps as UNSAFE_LinkListItemProps,
};
