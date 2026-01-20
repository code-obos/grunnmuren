import {
  ArrowRight,
  Download,
  LinkExternal,
} from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { Children, cloneElement, type JSX, type ReactNode } from 'react';
import { Provider } from 'react-aria-components';
import { HeadingContext } from '../content';
import { _LinkContext, type UNSAFE_LinkProps as LinkProps } from '../link';

type LinkListContainerProps = React.HTMLProps<HTMLDivElement> & {
  children: JSX.Element | JSX.Element[];
};

const LinkListContainer = ({
  className,
  ...restProps
}: LinkListContainerProps) => (
  // Dual providers makes for easier typing and more readable code
  <Provider values={[[HeadingContext, { size: 'm' }]]}>
    <div className={cx(className, 'link-list-container')} {...restProps} />
  </Provider>
);

type LinkListProps = React.HTMLProps<HTMLUListElement> & {
  children: JSX.Element | JSX.Element[];
};

const LinkList = (props: LinkListProps) => (
  <ul {...props} data-slot="link-list" />
);

type LinkListItemProps = React.HTMLProps<HTMLLIElement> & {
  children: ReactNode;
};

const LinkListItem = ({ children, ...props }: LinkListItemProps) => {
  const child = Children.only(children);

  return (
    <li {...props} data-slot="link-list-item">
      {cloneElement(child, {
        animateIcon: child.props.download
          ? 'down'
          : child.props.rel?.includes('external')
            ? 'up-right'
            : 'right',
        '~iconRight': child.props.download ? (
          <Download />
        ) : child.props.rel?.includes('external') ? (
          <LinkExternal />
        ) : (
          <ArrowRight />
        ),
      })}
    </li>
  );
};

export {
  LinkList,
  LinkListContainer,
  LinkListItem,
  type LinkListContainerProps,
  type LinkListItemProps,
  type LinkListProps,
};
