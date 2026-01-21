import {
  ArrowRight,
  Download,
  LinkExternal,
} from '@obosbbl/grunnmuren-icons-react';
import { cva, type VariantProps } from 'cva';
import {
  Children,
  cloneElement,
  isValidElement,
  type JSX,
  type ReactNode,
} from 'react';
import { Provider } from 'react-aria-components';
import { HeadingContext } from '../content';
import type { UNSAFE_LinkProps } from '../link/link';

const linkListContainerVariants = cva({
  base: null,
  variants: {
    layout: {
      stack: null,
      grid: '@container',
    },
  },
  defaultVariants: {
    layout: 'stack',
  },
});

type LinkListContainerProps = VariantProps<typeof linkListContainerVariants> &
  React.HTMLProps<HTMLDivElement> & {
    children: JSX.Element | JSX.Element[];
  };

const LinkListContainer = ({
  className,
  layout = 'stack',
  ...props
}: LinkListContainerProps) => (
  <Provider values={[[HeadingContext, { size: 'm' }]]}>
    <div
      {...props}
      className={linkListContainerVariants({ className, layout })}
      data-layout={layout}
    />
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
  const childProps = (
    isValidElement(child) ? child.props : {}
  ) as UNSAFE_LinkProps;

  return (
    <li {...props} data-slot="link-list-item">
      {isValidElement(child) &&
        cloneElement(child, {
          animateIcon: childProps.download
            ? 'down'
            : childProps.rel?.includes('external')
              ? 'up-right'
              : 'right',
          '~iconRight': childProps.download ? (
            <Download />
          ) : childProps.rel?.includes('external') ? (
            <LinkExternal />
          ) : (
            <ArrowRight />
          ),
        } as UNSAFE_LinkProps)}
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
