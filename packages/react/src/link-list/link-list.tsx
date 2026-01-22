import {
  ArrowRight,
  Download,
  LinkExternal,
} from '@obosbbl/grunnmuren-icons-react';
import { cva, cx, type VariantProps } from 'cva';
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

const linkStyles = [
  '*:data-[slot=link]:flex',
  '*:data-[slot=link]:w-full',
  '*:data-[slot=link]:justify-between',
  '*:data-[slot=link]:gap-x-2',
  '*:data-[slot=link]:py-3.5',
  '*:data-[slot=link]:no-underline',
  '*:data-[slot=link]:focus-visible:outline-focus',
];

const linkListContainerVariants = cva({
  base: [
    '*:data-[slot=link-list]:overflow-visible',

    '*:data-[slot=heading]:p-1.25',
    '*:data-[slot=heading]:*:data-[slot=link]:py-2.25',
    '*:data-[slot=heading]:*:data-[slot=link]:[svg]:text-base', // THIS WORK?
    'has-data-[slot=heading]:*:data-[slot=link-list]:overflow-visible',
    '*:data-[slot=heading]:has-not:*:data-[slot=link]:my-2.25',
  ],
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
  <Provider
    values={[[HeadingContext, { size: 'm', className: cx(linkStyles) }]]}
  >
    <div
      {...props}
      className={linkListContainerVariants({ className, layout })}
      data-layout={layout}
      data-slot="link-list-container"
    />
  </Provider>
);

type LinkListProps = React.HTMLProps<HTMLUListElement> & {
  children: JSX.Element | JSX.Element[];
};

const LinkList = ({ className, ...restProps }: LinkListProps) => (
  <ul
    {...restProps}
    data-slot="link-list"
    className={cx(
      /**
       * Hides dividers at the top of the list (overflow-y)
       * while preventing arrow icons from overflowing container when animated to the right (overflow-x)
       */
      'grid min-w-fit auto-rows-max gap-y-px overflow-hidden',
      className,
    )}
  />
);

type LinkListItemProps = React.HTMLProps<HTMLLIElement> & {
  children: ReactNode;
};

const LinkListItem = ({ children, className, ...props }: LinkListItemProps) => {
  const child = Children.only(children);
  const childProps = (
    isValidElement(child) ? child.props : {}
  ) as UNSAFE_LinkProps;

  return (
    <li
      {...props}
      className={cx(
        className,
        'after:-top-px relative p-1.25 after:absolute after:right-0 after:left-0 after:h-px after:w-full after:bg-gray-light',
        '*:data-[slot=link]:paragraph',
        ...linkStyles,
      )}
      data-slot="link-list-item"
    >
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
