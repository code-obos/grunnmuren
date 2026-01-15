import {
  ArrowRight,
  Download,
  LinkExternal,
} from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import type { JSX, ReactNode } from 'react';
import { type LinkRenderProps, Provider } from 'react-aria-components';
import { HeadingContext } from '../content';
import { _LinkContext, type UNSAFE_LinkProps as LinkProps } from '../link';

type LinkListContainerProps = React.HTMLProps<HTMLDivElement> & {
  children: JSX.Element | JSX.Element[];
};

// Sets the correct icons for each link in the link list
const _LinkProvider = ({ children }: { children: ReactNode }) => (
  <Provider
    values={[
      [
        _LinkContext,
        {
          _innerWrapper:
            ({ children, download, rel }: LinkProps) =>
            (values: LinkRenderProps) => {
              let Icon = ArrowRight;

              if (download) {
                Icon = Download;
              } else if (rel?.includes('external')) {
                Icon = LinkExternal;
              }

              return (
                <>
                  {typeof children === 'function'
                    ? children({ ...values, defaultChildren: null })
                    : children}
                  <Icon />
                </>
              );
            },
        },
      ],
    ]}
  >
    {children}
  </Provider>
);

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
  <_LinkProvider>
    <ul {...props} data-slot="link-list" />
  </_LinkProvider>
);

type LinkListItemProps = React.HTMLProps<HTMLLIElement> & {
  children: ReactNode;
};

const LinkListItem = (props: LinkListItemProps) => (
  <li {...props} data-slot="link-list-item" />
);

export {
  LinkList,
  LinkListContainer,
  LinkListItem,
  type LinkListContainerProps,
  type LinkListItemProps,
  type LinkListProps,
};
