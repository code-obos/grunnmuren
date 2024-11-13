import { cva, cx, VariantProps } from 'cva';
import { Link, LinkProps, Provider } from 'react-aria-components';
import { HeadingContext } from '../content';

type CardProps = VariantProps<typeof cardVariants> & {
  children?: React.ReactNode;
  className?: string;
  /** Makes the entire card clickable by wrapping the content of the <Heading> in a <Link> */
  href?: LinkProps['href'];
};

const cardVariants = cva({
  base: [
    'group/card',
    'rounded-2xl border p-3',
    'grid auto-rows-max gap-y-4',
    'relative', // Needed for positiong of the clickable pseudo-element (and can also be used for other absolute positioned elements the consumer might add)
    // **** Content ****
    '[&_[data-slot="content"]]:grid [&_[data-slot="content"]]:auto-rows-max [&_[data-slot="content"]]:gap-y-4',

    // **** Media ****
    '[&_[data-slot="media"]]:overflow-hidden', // Prevent content from overflowing the rounded corners
    '[&_[data-slot="media"]]:rounded-t-2xl', // Top corners are always rounded
    // Position media at the edges of the card (because of these negative margins the media-element must be a wrapper around the actual image or other media content)
    '[&_[data-slot="media"]]:mx-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))] [&_[data-slot="media"]]:mt-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',
    // Sets the aspect ratio of the media content (width: 100% is necessary to make aspect ratio work in FF)
    '[&_[data-slot="media"]>*]:aspect-[3/2] [&_[data-slot="media"]>*]:w-full [&_[data-slot="media"]_img]:object-cover',
    // Prepare zoom animation for hover effects. The hover effect can also be enabled by classes on the parent component, so it is always prepared here.
    '[&_[data-slot="media"]>*]:transition-transform [&_[data-slot="media"]>*]:duration-300 [&_[data-slot="media"]>*]:ease-in-out',

    // **** Footer ****
    // Footer content of the footer is intended to be outside the clickable area of the card
    // Fot this reason the CSS of the footer becomes a little bit more complex
    '[&_[data-slot="footer"]]:relative', // Setting it to relative will place it on top of the clickable pseudo-element
    // Position footer at the edges of the card, but give it the same padding as the rest of the card
    '[&_[data-slot="footer"]]:py-3',
    '[&_[data-slot="footer"]]:mx-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',
    '[&_[data-slot="footer"]]:mb-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',
    // Creates a divider line between the footer and the rest of the card that follows the card padding (the CSS would become even more complex if the border was placed on the card itself)
    '[&_[data-slot="footer"]]:before:absolute',
    '[&_[data-slot="footer"]]:before:left-3 [&_[data-slot="footer"]]:before:right-3 [&_[data-slot="footer"]]:before:top-0',
    '[&_[data-slot="footer"]]:before:border-t [&_[data-slot="footer"]]:before:border-t-current',
  ],
  variants: {
    border: {
      black: 'border-black',
      'blue-dark': 'border-blue-dark',
      'green-dark': 'border-green-dark',
      undefined: [
        'border-transparent',
        // Media styles:
        '[&_[data-slot="media"]]:rounded-b-2xl',
      ],
    },
    hasHref: {
      false: '',
      true: [
        // Enables the zoom hover effect on media (note that we can't use group-hover/card here, because there might be other clickable elements in the card aside from the heading)
        '[&:has([data-slot="card-heading-link"]:hover)_[data-slot="media"]>*]:scale-110',

        // Make interactive elements clickable by themselves, while the rest of the card is clickable as a whole
        // The card is then made clickable by a pseudo-element on the heading that covers the entire card
        '[&_a:not([data-slot="card-heading-link"])]:relative [&_button]:relative [&_input]:relative',
        // Place other interactive on top of the pseudo-element that makes the entire card clickable by setting a higher z-index than the pseudo-element
        '[&_a:not([data-slot="card-heading-link"])]:z-[2] [&_button]:z-[2] [&_input]:z-[2]',
      ],
    },
  },
});

const Card = ({
  children,
  className: _className,
  border,
  href,
  ...restProps
}: CardProps) => {
  const className = cardVariants({
    className: _className,
    border,
    hasHref: !!href,
  });
  return (
    <div className={className} {...restProps}>
      <Provider
        values={[
          [
            HeadingContext,
            {
              className: cx(
                'inline',
                // Styles for the heading when content is not wrapped in a link
                !href && 'heading-s w-fit text-pretty',
              ),
              _innerWrapper: (children) =>
                href ? (
                  <Link
                    href={href}
                    // Uses a pseudo-element with absolute position to make the entire card focusable and clickable
                    className={cx(
                      'cursor-pointer',
                      // Note that the border-radius is set 1px less then the card radius
                      // This is due to the fact that the card as a 1px border and needs to be adjusted to align perfectly
                      'no-underline after:absolute after:inset-[calc(theme(borderWidth.DEFAULT)*-1)] after:rounded-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
                      // focus styles
                      'focus-visible:after:outline-focus focus-visible:outline-none focus-visible:after:outline-offset-2',
                      // hover styles
                      // Border (bottom/top) is set to transparent to make sure the bottom underline is not visible when the card is hovered
                      // Border top is set to even out the border bottom used for the underline
                      'border-y-2 border-y-transparent transition-colors hover:border-b-current',
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
    </div>
  );
};

export { Card, type CardProps };
