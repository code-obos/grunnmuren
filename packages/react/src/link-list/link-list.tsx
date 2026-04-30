import { cva, cx, type VariantProps } from 'cva';
import { createContext, type JSX, type ReactNode, useContext } from 'react';
import { Provider } from 'react-aria-components/slots';

import { HeadingContext } from '../content';

type LinkListContextValue = {
  shouldRenderAutoIcons: boolean;
};

export const LinkListContext = createContext<LinkListContextValue | null>(null);

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
    '**:[svg]:text-base',
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

const LinkListContainer = ({ className, layout = 'stack', ...props }: LinkListContainerProps) => {
  const container = (
    <Provider values={[[HeadingContext, { size: 'm', className: cx(linkStyles) }]]}>
      <div
        {...props}
        className={linkListContainerVariants({ className, layout })}
        data-layout={layout}
        data-slot="link-list-container"
      />
    </Provider>
  );

  const hasLinkListContext = !!useContext(LinkListContext);

  if (hasLinkListContext) {
    return container;
  }

  return (
    <LinkListContext.Provider value={{ shouldRenderAutoIcons: true }}>
      {container}
    </LinkListContext.Provider>
  );
};

type LinkListProps = React.HTMLProps<HTMLUListElement> & {
  children: JSX.Element | JSX.Element[];
};

const LinkList = ({ className, children, ...restProps }: LinkListProps) => {
  const ul = (
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
    >
      {children}
    </ul>
  );

  const hasLinkListContext = !!useContext(LinkListContext);

  if (hasLinkListContext) {
    return ul;
  }

  return (
    <LinkListContext.Provider value={{ shouldRenderAutoIcons: true }}>
      {ul}
    </LinkListContext.Provider>
  );
};

type LinkListItemProps = React.HTMLProps<HTMLLIElement> & {
  children: ReactNode;
};

const LinkListItem = ({ children, className, ...props }: LinkListItemProps) => (
  <li
    {...props}
    className={cx(
      className,
      'after:bg-gray-light relative p-1.25 after:absolute after:inset-x-0 after:-top-px after:h-px after:w-full',
      '*:data-[slot=link]:paragraph',
      ...linkStyles,
    )}
    data-slot="link-list-item"
  >
    {children}
  </li>
);

export {
  LinkList,
  LinkListContainer,
  LinkListItem,
  type LinkListContainerProps,
  type LinkListContextValue,
  type LinkListItemProps,
  type LinkListProps,
};
