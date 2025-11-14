import {
  ArrowRight,
  Download,
  LinkExternal,
} from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import type { JSX, ReactNode } from 'react';
import {
  UNSAFE_Link as Link,
  type UNSAFE_LinkProps as LinkProps,
} from '../link';

type LinkListContainerProps = React.HTMLProps<HTMLDivElement> & {
  children: JSX.Element | JSX.Element[];
};

const LinkListContainer = ({
  className,
  ...restProps
}: LinkListContainerProps) => (
  <div className={cx(className, 'link-list-container')} {...restProps} />
);

type LinkListProps = React.HTMLProps<HTMLDivElement> & {
  children: JSX.Element | JSX.Element[];
};

const LinkList = ({ className, children, ...restProps }: LinkListProps) => (
  <LinkListContainer className={className} {...restProps}>
    <ul data-slot="link-list">{children}</ul>
  </LinkListContainer>
);

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
  let iconTransition = cx('group-hover:motion-safe:translate-x-1');

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
    <li data-slot="link-list-item">
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
  type LinkListContainerProps as UNSAFE_LinkListContainerProps,
  LinkListContainer as UNSAFE_LinkListContainer,
  LinkList as UNSAFE_LinkList,
  type LinkListProps as UNSAFE_LinkListProps,
  LinkListItem as UNSAFE_LinkListItem,
  type LinkListItemProps as UNSAFE_LinkListItemProps,
};
