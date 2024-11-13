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

        // **** Fail-safe for interactive elements ****
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
                      // **** Hover: custom underline ****
                      // The border radius needs to be adjusted to align perfectly with the card border
                      'no-underline after:absolute after:inset-[calc(theme(borderWidth.DEFAULT)*-1)] after:rounded-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
                      // Border (bottom/top) is set to transparent to make sure the bottom underline is not visible when the card is hovered
                      // Border top is set to even out the border bottom used for the underline
                      'border-y-2 border-y-transparent transition-colors hover:border-b-current',
                      // Match the heading styles (especially important when the content spans mulitple lines)
                      'heading-s text-pretty',
                      // **** Focus ****
                      'focus-visible:after:outline-focus focus-visible:outline-none focus-visible:after:outline-offset-2',
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
