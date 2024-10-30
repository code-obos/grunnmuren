import { Link, Provider, type LinkProps } from 'react-aria-components';
import { cva, cx } from 'cva';
import { createContext, useContext } from 'react';
import { HeadingContext, MediaContext } from '../content';

// Internal context used for semantics on the Card children
const CardsContext = createContext(false);

const useCardsContext = () => useContext(CardsContext);

const CardsContextProvider = ({ children }: { children: React.ReactNode }) => (
  <CardsContext.Provider value={true}>{children}</CardsContext.Provider>
);

type CardOverlayProps = {
  color?: 'blue-dark' | 'blue' | 'mint';
  align?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
};

const overlayVariants = cva({
  base: 'absolute top-0 px-3 py-2',
  variants: {
    color: {
      'blue-dark': ['bg-blue-dark', 'text-white'],
      blue: ['bg-blue', 'text-white'],
      mint: ['bg-mint', 'text-black'],
    },
    align: {
      left: ['left-0', 'rounded-br-2xl', 'rounded-tl-2xl'],
      right: ['right-0', 'rounded-bl-2xl', 'rounded-tr-2xl'],
    },
  },
});

const CardOverlay = ({
  className,
  color = 'blue-dark',
  align = 'left',
  ...props
}: CardOverlayProps) => (
  <span
    className={overlayVariants({
      color,
      align,
      className,
    })}
    {...props}
  />
);

type CardProps = {
  className?: string;
  children: React.ReactNode;
  href?: LinkProps['href'];
  border?: 'black' | 'dark-blue' | 'dark-green';
};

const cardVariants = cva({
  base: [
    // We can't use overflow-hidden on the card to force content to follow the border radius as it will hide the focus outline
    'rounded-2xl p-3',
    'group/card relative grid gap-y-4',
    'border',
    // Fixes width on inlined Button components
    '[&_[data-slot="button"]]:w-fit',
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
        '[&:not(:has(a:not([data-slot="button"]),button:not([data-slot="button"]),input))_[data-slot="button"]:first-of-type:last-of-type]:after:bottom-0 [&:not(:has(a:not([data-slot="button"]),button:not([data-slot="button"]),input))_[data-slot="button"]:first-of-type:last-of-type]:after:left-0 [&:not(:has(a:not([data-slot="button"]),button:not([data-slot="button"]),input))_[data-slot="button"]:first-of-type:last-of-type]:after:right-0 [&:not(:has(a:not([data-slot="button"]),button:not([data-slot="button"]),input))_[data-slot="button"]:first-of-type:last-of-type]:after:top-0',
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
  },
});

const Card = ({ className, border, href, children }: CardProps) => {
  const hasListContext = useCardsContext();
  const Element = hasListContext ? 'li' : 'div';
  return (
    <Element
      className={cardVariants({
        border,
        className,
        href: !!href,
      })}
    >
      <Provider
        values={[
          [
            MediaContext,
            {
              aspectRatio: '3:2',
              className: cx(
                // Make sure image is placed to top and the sides over Card the border
                'mx-[calc(theme(space.3)*-1-1px)] mt-[calc(theme(space.3)*-1-1px)]',
                'overflow-hidden rounded-t-2xl',
                !border && 'rounded-b-2xl',
                // Child (image/video) styles
                '*:object-cover',
                // Prepare animation for hover effects
                '*:transition-transform *:duration-300 *:ease-in-out',
                href &&
                  // Enables the hover effect
                  '*:group-hover/card:motion-safe:scale-110',
              ),
              // TODO: Fix this type error
              children: null,
              // TODO: We should never display alt text in Cards, as they are purely decorative (is aria-hidden on wrapper enough?)
              'aria-hidden': true,
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
                      'no-underline after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:rounded-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
                      // focus styles
                      'focus-visible:after:outline-focus focus-visible:outline-none focus-visible:after:outline-offset-2',
                      // 'focus-visible:outline-none focus-visible:before:absolute focus-visible:before:-inset-2 focus-visible:before:rounded-3xl focus-visible:before:border-2 focus-visible:before:border-black',
                      // hover styles
                      'border-b-2 border-b-transparent transition-colors group-hover/card:border-b-current',
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
  CardOverlay,
  CardOverlayProps,
  Card,
  type CardProps,
  type CardsProps,
  Cards,
};
