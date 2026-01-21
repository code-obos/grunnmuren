import {
  ArrowRight,
  Download,
  LinkExternal,
} from '@obosbbl/grunnmuren-icons-react';
import { cva, type VariantProps } from 'cva';
import { Children, cloneElement, type JSX, type ReactNode } from 'react';
import { Provider } from 'react-aria-components';
import { HeadingContext } from '../content';

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
