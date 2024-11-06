import {
  ContextValue,
  Link,
  Provider,
  type LinkProps,
} from 'react-aria-components';
import { cva, cx } from 'cva';
import { createContext, useContext, Children, useId } from 'react';
import { HeadingContext, MediaContext, MediaOverlayContext } from '../content';
import { useMatchBreakPoints } from '../hooks';
import { Badge } from '../badge';

// Internal context used for semantics on the Card children
const CardsContext = createContext(false);

const useCardsContext = () => useContext(CardsContext);

const CardsContextProvider = ({ children }: { children: React.ReactNode }) => (
  <CardsContext.Provider value={true}>{children}</CardsContext.Provider>
);

type OverlayBadgeProps = {
  color?: 'blue-dark' | 'mint';
  align?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
};

const overlayBadgeVariants = cva({
  base: 'absolute top-0 rounded-none',
  variants: {
    align: {
      left: [
        // Make sure the overlay corner radius aligns perfectly with the card
        'rounded-br-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
        'left-0',
      ],
      right: [
        // Make sure the overlay corner radius aligns perfectly with the card
        'rounded-bl-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
        'right-0',
      ],
    },
  },
});

const OverlayBadge = ({
  className,
  color = 'blue-dark',
  align = 'left',
  children,
}: OverlayBadgeProps) => (
  <Badge
    size="large"
    color={color}
    className={overlayBadgeVariants({
      align,
      className,
    })}
  >
    {children}
  </Badge>
);

type Direction = 'row' | 'column';

type ResponsiveDirection = {
  default?: Direction;
  sm?: Direction;
  md?: Direction;
  lg?: Direction;
  xl?: Direction;
  '2xl'?: Direction;
};

type CardProps = {
  className?: string;
  children: React.ReactNode;
  href?: LinkProps['href'];
  border?: 'black' | 'dark-blue' | 'dark-green';
  /**
   * Determines the direction of the card layout (column: vertical, row: horizontal).
   * @default column
   */
  direction?: Direction | ResponsiveDirection;
  /**
   * The element type to render the card as.
   * @default li if rendered inside a Cards component
   * @default section otherwise
   */
  as?: 'section' | 'li' | 'aside' | 'div';
};

type ClickAreaProps = {
  children: JSX.Element;
  /**
   * Determines if the click area is active or not.
   * @default true
   */
  active?: boolean;
};

const ClickAreaContext = createContext<
  ContextValue<Partial<ClickAreaProps>, HTMLDivElement>
>({});

const ClickArea = ({ children, active = true }: ClickAreaProps) =>
  active ? (
    <div
      data-slot="click-area"
      className={cx(
        // Make sure the click area is always placed on top of overlay and media
        'z-[1]',
        '[&>:first-child]:after:absolute [&>:first-child]:after:inset-0 [&>:first-child]:after:rounded-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
        // Remove focus outline from the child
        '[&>:first-child:focus-visible]:outline-none',
        // Focus styles for the click area
        '[&>:first-child:focus-visible]:after:outline-focus [&>:first-child:focus-visible]:after:outline-offset-2',
        'hover:cursor-pointer',
      )}
    >
      {children}
    </div>
  ) : (
    children
  );

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
        // Hover effect on the Card image if the card has a ClickArea
        '[&:hover:has([data-slot="click-area"])_[data-slot="media"]>:not([data-slot="media-overlay"])]:motion-safe:scale-110',
      ],
      true: [
        // Make interactive elements clickable by themselves, while the rest of the card is clickable as a whole
        // The card is then made clickable by a pseudo-element on the heading that covers the entire card
        '[&_a:not([data-slot="card-heading-link"])]:relative [&_button]:relative [&_input]:relative',
        // Place other interactive on top of the pseudo-element that makes the entire card clickable by setting a higher z-index than the pseudo-element
        '[&_a:not([data-slot="card-heading-link"])]:z-[2] [&_button]:z-[2] [&_input]:z-[2]',

        // Don't trigger image zoom hover effect on the entire card when hovering other clickable elements
        '[&:has(a:not([data-slot="card-heading-link"]):hover)_[data-slot="media"]_*:not([data-slot="media-overlay"])]:scale-100',
        // Don't trigger underline hover effect on title when hovering other clickable elements
        '[&:has(a:not([data-slot="card-heading-link"]):hover)_[data-slot="card-heading-link"]]:border-b-transparent',
      ],
    },
    direction: {
      // Cards with vertical layout should have a 50% width on the media, "auto" otherwise
      row: [
        'gap-x-4',
        // Force grid items to snap the available spaces (this is important for the icon placement, and doesn't affect the layout when there is no icon)
        'grid-flow-dense',

        // **** Icons ****
        // If an icon is the first child:
        // - make the icon span the first column, which has a width that matches the size of the icon (auto)
        // - make all other children span the second column, which takes up the remaining space (1fr)
        '[&:has(>svg:first-child)>:not(svg)]:col-start-2 [&:has(>svg:first-child)]:grid-cols-[auto,1fr]',
        // If an icon is the last child:
        // - make the icon span the second column, which has a width that matches the size of the icon (auto)
        // - make all other children span the first column, which takes up the remaining space (1fr)
        '[&:has(>svg:last-child)>:not(svg)]:col-start-1 [&:has(>svg:last-child)]:grid-cols-[1fr,auto]',
        // Center align icons in the middle of each grid cell
        '[&>svg]:self-center',

        // **** Media ****
        // Media should span 50% of the card width, the rest should span the remaining 50% space
        '[&:has(>[data-slot="media"])]:grid-cols-[1fr,1fr]',
        // If media is the first child it should span the first column
        '[&:has(>[data-slot="media"]:last-child)>:not([data-slot="media"])]:col-start-1',
        // All other children should span the second column
        '[&:has(>[data-slot="media"]:first-child)>:not([data-slot="media"])]:col-start-2',

        // If there is no media in the card, make sure the content spans the entire height of the card
        // This override is neccessary due to the inline style passed to the card to make the media grid layout work
        // As we can't conditionally apply inline styles based on the card children, we need to override the height with a grid-template-rows value instead
        '[&:not(:has([data-slot="media"]))]:!grid-rows-[auto]',
      ],
      column: '',
    },
  },
});

const defaultDirection = 'column';

const Card = ({
  className,
  border,
  href,
  direction: _direction = defaultDirection,
  children,
  as,
}: CardProps) => {
  const headingId = useId();
  const hasListContext = useCardsContext();
  const Element = hasListContext ? 'li' : as ?? 'section';

  let direction =
    typeof _direction === 'string'
      ? _direction
      : _direction.default ?? defaultDirection;

  // Get the current breakpoints that match to determine the direction of the card
  // This has to be done with JS since we can't use media queries on inline styles
  const matches = useMatchBreakPoints();
  if (typeof _direction !== 'string') {
    // Breakpoints in order of priority (largest to smallest), since we are using min-width we start with the largest breakpoint
    (['2xl', 'xl', 'lg', 'md', 'sm'] as const).forEach((breakPoint) => {
      // Apply direction from the first matching breakpoint and upwards (mimicing min-width media queries)
      if (matches[breakPoint]) {
        direction = _direction[breakPoint] ?? direction;
      }
    });
  }

  const numberOfChildren = Children.count(children);
  return (
    <Element
      aria-labelledby={headingId}
      className={cardVariants({
        border,
        href: !!href,
        direction,
        className,
      })}
      style={
        direction === 'row'
          ? {
              // To make sure the media spans the entire card height while the other children only spans their natural height
              // we set the grid-template-rows to auto for all children except the last one, which spans the remaining space.
              // This extra row fills up the remaining space in the columns so that the media can span the entire height of the card (since we set a fixed number of rows)
              // And the other children can span their natural height (a last extra last row that spans the remaining space).
              // By doint this we avoid extra wrapper elements to make the media span the entire height of the card.
              gridTemplateRows: `repeat(${numberOfChildren - 1}, auto) 1fr`,
            }
          : undefined
      }
    >
      <Provider
        values={[
          [
            ClickAreaContext,
            {
              // The click area is only active for other elements when the Card does not have a href itself.
              // Without this the Card heading link click area (which takes up the entire card) would never be clickable, as this ClickArea would be placed on top of it
              active: !href,
            },
          ],
          [
            MediaContext,
            {
              aspectRatio: '3:2',
              className: cx(
                // Make content follow the border radius
                'overflow-hidden',
                // Bottom corners of the Media are rounded when the card has no border
                !border && 'rounded-b-2xl',

                // *** Column direction ***
                // Positions the media to the top of the card and makes sure it spans the entire width of the card
                direction === 'column' &&
                  'mx-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))] mt-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',
                // Rounded top corners for the media to match the column layout
                direction === 'column' && 'rounded-t-2xl',
                // Makes sure the media is always displayed first in the card in a column layout
                direction === 'column' && '-order-1',

                // *** Row direction ***
                direction === 'row' && 'first:rounded-l-2xl last:rounded-r-2xl',
                direction === 'row' && !border && 'rounded-t-2xl',
                direction === 'row' &&
                  'my-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',
                direction === 'row' &&
                  'first:ml-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',
                direction === 'row' &&
                  'last:mr-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',

                // Child image styles
                '[&_img]:object-cover',
                // Prepare animation for hover effects. The hover effect can also be enabled by classes on the parent component, so it is always prepared here.
                '*:transition-transform *:duration-300 *:ease-in-out',
                href &&
                  // Enables the hover effect
                  '[&>:not([data-slot="media-overlay"])]:group-hover/card:motion-safe:scale-110',
              ),
              style:
                direction === 'row'
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
            MediaOverlayContext,
            {
              className: cx(
                // z-index is set to make sure it is always placed on top of the image (this element inherintly have position absolute when put inside a Media component, which is the intended use)
                'z-[1]',
                // Overflow hidden is set to make sure the overlay always follows the border radius of the Media, no matter where it is placed
                // Border radius is set to inherit to make sure the overlay follows the border radius of the Media which varies depending on the card layout
                'overflow-hidden rounded-[inherit]',
                // Make sure click events "pass through" the overlay to the card
                'pointer-events-none',
              ),
            },
          ],
          [
            HeadingContext,
            {
              id: headingId,
              className: cx(
                'inline',
                // Styles for the heading when content not wrapped in a link
                !href && 'heading-s w-fit text-pretty',
              ),
              _innerWrapper: (children) =>
                href ? (
                  <Link
                    href={href}
                    // Uses a pseudo-element with absolute position to make the entire card focusable and clickable
                    className={cx(
                      // Note that the border-radius is set 1px less then the card radius
                      // This is due to the fact that the card as a 1px border and needs to be adjusted to align perfectly
                      // z-index is set to make sure it is always placed on top of the image and overlay
                      'no-underline after:absolute after:inset-0 after:z-[1] after:rounded-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
                      // focus styles
                      'focus-visible:after:outline-focus focus-visible:outline-none focus-visible:after:outline-offset-2',
                      // hover styles
                      // Border (bottom/top) is set to transparent to make sure the bottom underline is not visible when the card is hovered
                      // Border top is set to ensure an even space the heading and it's content
                      'border-y-2 border-y-transparent transition-colors group-hover/card:border-b-current',
                      // Match the heading styles (especially important when the content spans mulitple lines)
                      'heading-s text-pretty',
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

export {
  OverlayBadge,
  type OverlayBadgeProps,
  type ClickAreaProps,
  ClickArea,
  Card,
  type CardProps,
  type CardsProps,
  Cards,
};
