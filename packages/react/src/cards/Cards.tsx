import { Link, Provider, type LinkProps } from 'react-aria-components';
import { cva, cx } from 'cva';
import { createContext, useContext, Children } from 'react';
import { HeadingContext, MediaContext } from '../content';

// Internal context used for semantics on the Card children
const CardsContext = createContext(false);

const useCardsContext = () => useContext(CardsContext);

const CardsContextProvider = ({ children }: { children: React.ReactNode }) => (
  <CardsContext.Provider value={true}>{children}</CardsContext.Provider>
);

type OverlayProps = {
  color?: 'blue-dark' | 'blue' | 'mint';
  align?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
};

const overlayVariants = cva({
  // Needs a negative offset to align with the card border
  // z-index is set to make sure it is always placed on top of the image,
  // even when the overlay is put before the image in the DOM.
  base: 'w-fit px-3 py-2',
  variants: {
    color: {
      'blue-dark': ['bg-blue-dark', 'text-white'],
      blue: ['bg-blue', 'text-white'],
      mint: ['bg-mint', 'text-black'],
    },
    align: {
      left: [
        // Make sure the overlay corner radius aligns perfectly with the card
        'rounded-br-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
      ],
      right: [
        // Make sure the overlay corner radius aligns perfectly with the card
        'rounded-bl-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
      ],
    },
  },
});

const Overlay = ({
  className,
  color = 'blue-dark',
  align = 'left',
  ...props
}: OverlayProps) => (
  // Wrapper to prevent the overlay from overflowing (overflow-hidden) the card border radius if it's wider than the card and wrapps to a new line
  <div
    className={cx(
      className,
      // Position over the Card border by using negative position
      'absolute left-[calc(theme(borderWidth.DEFAULT)*-1)] right-[calc(theme(borderWidth.DEFAULT)*-1)] top-[calc(theme(borderWidth.DEFAULT)*-1)] z-[1] overflow-hidden rounded-t-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
      // Make sure click events "pass through" the overlay to the card
      'pointer-events-none',
    )}
  >
    <div
      className={overlayVariants({
        color,
        align,
        className,
      })}
      {...props}
    />
  </div>
);

type CardProps = {
  className?: string;
  children: React.ReactNode;
  href?: LinkProps['href'];
  border?: 'black' | 'dark-blue' | 'dark-green';
  /** @default 'column' */
  directon?: 'row' | 'column';
};

const cardVariants = cva({
  base: [
    // We can't use overflow-hidden on the card to force content to follow the border radius as it will hide the focus outline
    'rounded-2xl p-3',
    'group/card relative grid gap-y-4',
    'border',
    // Fixes width on inlined Button components
    // This is needed to make sure the button only takes up the space it's content needs
    // While still preventing it from overflowing the card
    '[&_[data-slot="button"]]:w-fit [&_[data-slot="button"]]:max-w-full [&_[data-slot="button"]]:!whitespace-normal',
  ],
  variants: {
    border: {
      black: 'border-black',
      'dark-blue': 'border-blue-dark',
      'dark-green': 'border-mint',
      undefined: 'border-transparent',
    },
    href: {
      false: [
        // Make entire card clickable if it contains one single CTA but no other clickable elements, and has no href prop for the entire card
        '[&:not(:has(a:not([data-slot="button"]),button:not([data-slot="button"]),input))_[data-slot="button"]:first-of-type:last-of-type]:after:absolute',
        // Make the pseudo-element cover the entire card
        '[&:not(:has(a:not([data-slot="button"]),button:not([data-slot="button"]),input))_[data-slot="button"]:first-of-type:last-of-type]:after:inset-0',
        // Fixes rounding of the pseudo-element corners so they align perfectly with the card
        '[&:not(:has(a:not([data-slot="button"]),button:not([data-slot="button"]),input))_[data-slot="button"]:first-of-type:last-of-type]:after:rounded-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
        // Focus styles on CTA (only when there is one single CTA as the only interactive element)
        '[&:not(:has(a:not([data-slot="button"]),button:not([data-slot="button"]),input))_[data-slot="button"]:first-of-type:last-of-type:focus-visible]:after:outline-focus [&:not(:has(a:not([data-slot="button"]),button:not([data-slot="button"]),input))_[data-slot="button"]:first-of-type:last-of-type:focus-visible]:outline-none [&:not(:has(a:not([data-slot="button"]),button:not([data-slot="button"]),input))_[data-slot="button"]:first-of-type:last-of-type:focus-visible]:after:outline-offset-2',
        // Hover effect on CTA (only when there is one single CTA as the only interactive element)
        '[&:hover:has([data-slot="button"]:first-of-type:last-of-type)_[data-slot="media"]_*]:motion-safe:scale-110',
      ],
      true: [
        // Make interactive elements clickable by themselves, while the rest of the card is clickable as a whole
        // The card is then made clickable by a pseudo-element on the heading that covers the entire card
        // And since the heading (card-heading-link) comes before all other content, they will be clickable by just setting their position to relative
        '[&_a:not([data-slot="card-heading-link"])]:relative [&_button]:relative [&_input]:relative',
        // Don't trigger image zoom hover effect on the entire card when hovering CTA's
        '[&:has(a:not([data-slot="card-heading-link"]):hover)_[data-slot="media"]_*]:scale-100',
        // Don't trigger underline hover effect on title when hovering CTA's
        '[&:has(a:not([data-slot="card-heading-link"]):hover)_[data-slot="card-heading-link"]]:border-b-transparent',
      ],
    },
    directon: {
      // Cards with vertical layout should have a 50% width on the media, "auto" otherwise
      row: [
        'gap-x-4',
        // Force grid items to snap the available spaces (this is important for the icon placement, and doesn't affect the layout when there is no icon)
        'grid-flow-dense',

        // **** Icons ****
        // If an icon is the first child:
        // - make the icon span the first column, which has a width that matches the size of the icon (auto)
        // - make all other children span the second column, which takes up the remaining space (1fr)
        '[&:has(svg:first-child)>:not(svg)]:col-start-2 [&:has(svg:first-child)]:grid-cols-[auto,1fr]',
        // If an icon is the last child:
        // - make the icon span the second column, which has a width that matches the size of the icon (auto)
        // - make all other children span the first column, which takes up the remaining space (1fr)
        '[&:has(svg:last-child)>:not(svg)]:col-start-1 [&:has(svg:last-child)]:grid-cols-[1fr,auto]',
        // Center align icons in the middle of each grid cell
        '[&>svg]:self-center',

        // **** Media ****
        '[&:has([data-slot="media"])]:grid-cols-[1fr,1fr]',
        // If media is the first child:
        '[&:has([data-slot="media"]:first-child)>:not([data-slot="media"])]:col-start-2',
        '[&:has([data-slot="media"]:last-child)>:not([data-slot="media"])]:col-start-1',
        // To make sure all the other children only spans their natural height we add a pseudo-element that can take up the remaining space in the grid
        '[&:has([data-slot="media"])]:after:relative',

        // If there is no media in the card, make sure the content spans the entire height of the card
        // This override is neccessary due to the inline style passed to the card to make the media grid layout work
        // As we can't conditionally apply inline styles based on the card children, we need to override the height with a grid-template-rows value instead
        '[&:not(:has([data-slot="media"]))]:!grid-rows-[auto]',
      ],
      column: '',
    },
  },
});

const Card = ({
  className,
  border,
  href,
  directon = 'column',
  children,
}: CardProps) => {
  const hasListContext = useCardsContext();
  const Element = hasListContext ? 'li' : 'div';
  const numberOfChildren = Children.count(children);
  return (
    <Element
      className={cardVariants({
        border,
        href: !!href,
        directon,
        className,
      })}
      style={
        directon === 'row'
          ? {
              // To make sure the media spans the entire card height while the other children only spans their natural height
              // We set the grid-template-rows to auto for all children except the last one, which spans the remaining space
              // The last row will be applied to the pseudo-element that takes up the remaining space of the column containing every other child than the media
              gridTemplateRows: `repeat(${numberOfChildren - 1}, auto) 1fr`,
            }
          : undefined
      }
    >
      <Provider
        values={[
          [
            MediaContext,
            {
              aspectRatio: '3:2',
              className: cx(
                // Make sure image is placed to top and the sides over Card the border
                'overflow-hidden',
                !border && 'rounded-b-2xl',
                // column
                directon === 'column' &&
                  'mx-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))] mt-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',
                directon === 'column' && 'rounded-t-2xl',

                // row
                directon === 'row' && 'first:rounded-l-2xl last:rounded-r-2xl',
                directon === 'row' && !border && 'rounded-t-2xl',
                directon === 'row' &&
                  'my-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',
                directon === 'row' &&
                  'first:ml-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',
                directon === 'row' &&
                  'last:mr-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',

                // Child (image/video) styles
                '*:object-cover',
                // Prepare animation for hover effects. This can also be enabled by classes of the parent component, so it is always prepared here.
                '*:transition-transform *:duration-300 *:ease-in-out',
                href &&
                  // Enables the hover effect
                  '*:group-hover/card:motion-safe:scale-110',
              ),
              // Never announce the content of media in Cards, as they are purely decorative
              'aria-hidden': true,
              style:
                directon === 'row'
                  ? {
                      // Work around since row-span-full doesn't work in a grid with auto rows (unknown number of items)
                      // and tailwind doesn't support classnames built from variables/template literals
                      // This makes the media span the entire card height
                      gridRow: `span ${numberOfChildren} / span ${numberOfChildren}`,
                    }
                  : undefined,
            },
          ],
          [
            HeadingContext,
            {
              className: 'heading-s inline text-pretty',
              _innerWrapper: (children) =>
                href ? (
                  <Link
                    href={href}
                    // Uses a pseudo-element with absolute position to make the entire card focusable and clickable
                    // Makes border-radius of the focus ring match the image border-radius
                    className={cx(
                      // Pseudo-element needed to enable click on entire card
                      // It is also used to apply focus styles.
                      // Note that the border-radius is set 1px less then the card radius
                      // This is due to the fact that the card as a 1px border and needs to be adjusted to align perfectly
                      'no-underline after:absolute after:inset-0 after:rounded-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
                      // focus styles
                      'focus-visible:after:outline-focus focus-visible:outline-none focus-visible:after:outline-offset-2',
                      // hover styles
                      // TODO: fix line height hon hover
                      'border-b-2 border-b-transparent transition-colors group-hover/card:*:border-b-current',
                    )}
                    data-slot="card-heading-link"
                  >
                    {children}
                  </Link>
                ) : (
                  children
                ),
            },
          ],
        ]}
      >
        {children}
      </Provider>
    </Element>
  );
};

type CardsProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};

const Cards = ({ className, children }: CardsProps) => {
  return (
    <CardsContextProvider>
      <ul className={className}>{children}</ul>
    </CardsContextProvider>
  );
};

export { Overlay, OverlayProps, Card, type CardProps, type CardsProps, Cards };
