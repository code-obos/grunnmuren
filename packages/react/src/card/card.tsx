import { type VariantProps, cva, cx } from 'cva';
import {
  Link,
  Provider,
  type LinkProps as RACLinkProps,
} from 'react-aria-components';
import { HeadingContext } from '../content';

type CardProps = VariantProps<typeof cardVariants> & {
  children?: React.ReactNode;
  className?: string;
};

const cardVariants = cva({
  base: [
    'group/card',
    'rounded-[inherit]', // Inherits rounded corners from the parent container
    'border p-3',
    'flex flex-col gap-y-4', // y-gap ensures a vertical spacing for both vertical layout and responsive horizontal layout
    'relative', // Needed for positiong of the clickable pseudo-element (and can also be used for other absolute positioned elements the consumer might add)

    // **** Content ****
    '[&_[data-slot="content"]]:flex [&_[data-slot="content"]]:flex-col [&_[data-slot="content"]]:gap-y-4',

    // **** Media ****
    '[&_[data-slot="media"]_*]:pointer-events-none', // Passes clicks through the media content to card link (if present)
    '[&_[data-slot="media"]]:overflow-hidden', // Prevent content from overflowing the rounded corners
    '[&_[data-slot="media"]]:relative', // Needed for positioning the <Badge> component (if present)
    // Position media at the edges of the card (because of these negative margins the media-element must be a wrapper around the actual image or other media content)
    '[&_[data-slot="media"]]:mx-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))] [&_[data-slot="media"]]:mt-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',

    // Sets the aspect ratio of the media content (width: 100% is necessary to make aspect ratio work on images in FF)
    '[&_[data-slot="media"]>*:not([data-slot="badge"])]:aspect-3/2 [&_[data-slot="media"]>img]:w-full [&_[data-slot="media"]>img]:object-cover',
    // Prepare zoom animation for hover effects. The hover effect can also be enabled by classes on the parent component, so it is always prepared here.
    '[&_[data-slot="media"]>*]:duration-300 [&_[data-slot="media"]>*]:ease-in-out [&_[data-slot="media"]>*]:motion-safe:transition-transform',

    // **** Card link ****
    // **** Hover ****
    // Enables the zoom hover effect on media (note that we can't use group-hover/card here, because there might be other clickable elements in the card aside from the heading)
    '[&:has([data-slot="card-link"]_a:hover)_[data-slot="media"]>img]:scale-110',
    '[&:has([data-slot="heading"]_[data-slot="card-link"]:hover)_[data-slot="media"]>img]:scale-110',

    // **** Fail-safe for interactive elements ****
    // Make interactive elements clickable by themselves, while the rest of the card is clickable as a whole
    // The card is made clickable by a pseudo-element on the heading that covers the entire card
    '[&:not(:has([data-slot="card-link"]_a))_a:not([data-slot="card-link"])]:relative [&_button]:relative [&_input]:relative',
    // Our Button component has position: relative by default, so we need to override that if it is used in a CardLink (to make the entire card clickable)
    '[&_[data-slot="card-link"]_a]:static',
    // Place other interactive on top of the pseudo-element that makes the entire card clickable
    // by setting a higher z-index than the pseudo-element (which implicitly z-index 0)
    '[&_a:not([data-slot="card-link"])]:z-[1] [&_button]:z-[1] [&_input]:z-[1]',

    // **** Badge ****
    '[&_[data-slot="media"]_[data-slot="badge"]]:absolute [&_[data-slot="media"]_[data-slot="badge"]]:top-0',
    // Increasing z-index Preserves badge position when media content is hovered (the transform scale effect might otherwise move the badge behind the other media content)
    '[&_[data-slot="media"]_[data-slot="badge"]]:z-[1]',
    // Left aligned - override default corner radius of the badge
    '[&_[data-slot="media"]_[data-slot="badge"]:first-child]:rounded-tl-2xl',
    '[&_[data-slot="media"]_[data-slot="badge"]:first-child]:rounded-br-2xl',
    '[&_[data-slot="media"]_[data-slot="badge"]:first-child]:rounded-tr-none',
    '[&_[data-slot="media"]_[data-slot="badge"]:first-child]:rounded-bl-none',
    // Right aligned - override default corner radius of the badge
    '[&_[data-slot="media"]_[data-slot="badge"]:last-child]:rounded-tl-none',
    '[&_[data-slot="media"]_[data-slot="badge"]:last-child]:rounded-br-none',
    '[&_[data-slot="media"]_[data-slot="badge"]:last-child]:rounded-tr-2xl',
    '[&_[data-slot="media"]_[data-slot="badge"]:last-child]:rounded-bl-2xl',
    // ... and position the badge at the right edge of the media content
    '[&_[data-slot="media"]_[data-slot="badge"]:last-child]:right-0',
  ],
  variants: {
    /**
     * The variant of the card
     * @default subtle
     */
    variant: {
      subtle: [
        'border-transparent',
        // **** Media styles ****
        '[&_[data-slot="media"]]:rounded-2xl', // All corners are rounded
      ],
      outlined: 'border border-black',
    },
    /**
     * The layout of the card
     * @default vertical
     */
    layout: {
      vertical: [
        'flex-col',
        // **** Media ****
        '[&_[data-slot="media"]]:rounded-t-2xl', // Both Top corners are rounded
      ],
      horizontal: [
        'gap-x-4', // Since this does not affect the layout before the flex direction is set (at breakpoint @2xl for Card with Media), we can set it here
        // **** With Media ****
        '[&:has(>[data-slot="media"]:last-child)]:flex-col-reverse', // Always display the media at the top of the card
        'has-data-[slot=media]:@2xl:!flex-row', // We need !important to override the specificity (first-/last-child) of the flex-col-reverse and flex-col classes

        '*:data-[slot=media]:@2xl:h-fit', // Fail-safe for rounded corners on media content
        'has-data-[slot=media]:*:@2xl:basis-1/2', // Ensures a 50/50 split of the media and content on medium screens
        // Position media at the edges of the card
        '*:data-[slot=media]:@2xl:mb-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',
        '*:data-[slot=media]:first:@2xl:mr-0',
        '*:data-[slot=media]:last:@2xl:ml-0',

        // Make sure the card link is clickable when the media is on the right side
        // This is necessary because the media content is positioned after the card link in the DOM
        '[&:has(>[data-slot="media"]:last-child)_[data-slot="card-link"]]:z-[1]',

        // **** Without Media ****
        'not-has-data-[slot=media]:@md:flex-row',
        // Make the layout responsive: when the Content reaches a minimum width of 12rem, the layout switches to vertical. Also makes sure Content takes up the remaining space available.
        'not-has-data-[slot=media]:**:data-[slot=content]:grow',
        // Make sure svg's etc. are not shrinkable
        '[&>:not([data-slot="content"],[data-slot="media"])]:shrink-0',
      ],
    },
  },
  defaultVariants: {
    variant: 'subtle',
    layout: 'vertical',
  },
  compoundVariants: [
    {
      variant: 'outlined',
      layout: 'horizontal',
      className: [
        // **** Media ****
        // Some rounded corners are removed when the card is outlined
        '[&_[data-slot="media"]]:rounded-t-2xl', // On small screens, the top corners are rounded
        '*:data-[slot=media]:first:@2xl:rounded-tr-none *:data-[slot=media]:first:@2xl:rounded-bl-2xl', // Both left corners are rounded when media is on the left side
        '*:data-[slot=media]:last:@2xl:rounded-tl-none *:data-[slot=media]:last:@2xl:rounded-br-2xl', // Both right corners are rounded when media is on the right side
        // **** Badge ****
        // Override default corner radius of the badge to match the media border radius
        '[&_[data-slot="media"]:first-child_[data-slot="badge"]:last-child]:@2xl:rounded-tr-none',
        '[&_[data-slot="media"]:last-child_[data-slot="badge"]:first-child]:@2xl:rounded-tl-none',
      ],
    },
  ],
});

const Card = ({
  children,
  className,
  variant,
  layout,
  ...restProps
}: CardProps) => {
  const cardClassName = cardVariants({
    variant,
    layout,
  });
  return (
    // The border-radius is set on the outer container to make it act as an invisible wrapper, only used for container queries
    // Since passing the className prop to this container is necessary to make custom styles behave as expected, we need to apply the border-radius here incase the consumer passes a custom background color
    <div {...restProps} className={cx(className, '@container rounded-2xl')}>
      <div className={cardClassName}>
        <Provider
          values={[
            [
              HeadingContext,
              {
                size: 's',
                className: cx([
                  'inline',
                  'w-fit',
                  'text-pretty',
                  'hyphens-auto',
                  '[word-break:break-word]', // necessary to make hyphens work in grid containers in Safari
                  // **** Card link in Heading ****
                  // Border (bottom/top) is set to transparent to make sure the bottom underline is not visible when the card is hovered
                  // Border top is set to even out the border bottom used for the underline
                  '*:data-[slot="card-link"]:no-underline',
                  '*:data-[slot="card-link"]:border-y-2',
                  '*:data-[slot="card-link"]:border-y-transparent',
                  '*:data-[slot="card-link"]:transition-colors',
                  '*:data-[slot="card-link"]:hover:border-b-current',
                  // Mimic heading styles for the card link if placed in the heading slot. This is necessary to make the custom underline align with the link text
                  '*:data-[slot="card-link"]:font-inherit',
                  '*:data-[slot="card-link"]:text-pretty',
                  '*:data-[slot="card-link"]:hyphens-auto',
                  '*:data-[slot="card-link"]:[word-break:break-word]', // necessary to make hyphens work in grid containers in Safari
                ]),
              },
            ],
          ]}
        >
          {children}
        </Provider>
      </div>
    </div>
  );
};

type CardLinkWrapperProps = {
  children?: React.ReactNode;
  className?: string;
} & {
  [K in keyof Omit<RACLinkProps, 'className' | 'children'>]?: never;
};

type S = Pick<RACLinkProps, 'href'>;

type CardLinkProps =
  | (Omit<RACLinkProps, 'href'> & Required<Pick<RACLinkProps, 'href'>>)
  | CardLinkWrapperProps;

const cardLinkVariants = cva({
  base: 'w-fit max-w-full',
  variants: {
    withHref: {
      true: [
        // **** Clickarea ****
        'cursor-pointer',
        'after:absolute',
        'after:inset-[calc(theme(borderWidth.DEFAULT)*-1)]',
        'after:rounded-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
        // **** Focus ****
        'focus-visible:outline-none',
        'data-focus-visible:after:outline-focus',
        'data-focus-visible:after:outline-offset-2',
        // **** Hover ****
        // Links are underlined by default, and the underline is removed on hover.
        // So we make sure that also happens when the user hovers the clickable area.
        'hover:no-underline',
      ],
      false: [
        // **** Clickarea ****
        '[&_a]:after:cursor-pointer',
        '[&_a]:after:absolute',
        '[&_a]:after:inset-[calc(theme(borderWidth.DEFAULT)*-1)]',
        '[&_a]:after:rounded-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
        // **** Focus ****
        '[&_a[data-focus-visible]]:outline-none',
        '[&_a[data-focus-visible]]:after:outline-focus',
        '[&_a[data-focus-visible]]:after:outline-offset-2',
        // **** Hover ****
        // Links are underlined by default, and the underline is removed on hover.
        // So we make sure that also happens when the user hovers the card.
        // The group-hover ensures that the hover effect also applies when this component is used as a wrapper around a link.
        '[&_a]:group-hover/card:no-underline',
      ],
    },
  },
});

/**
 * A component that creates a clickable area on a card.
 * It can be used either as a wrapper around a link or as a standalone link.
 */
const CardLink = ({
  className: _className,
  href,
  ...restProps
}: CardLinkProps) => {
  const className = cardLinkVariants({
    className: _className,
    withHref: !!href,
  });

  return href ? (
    <Link
      data-slot="card-link"
      {...(restProps as RACLinkProps)}
      href={href}
      className={className}
    />
  ) : (
    // We can't utilize that the `Link` component from react-aria-components renders as a span if it doesn't have an href,
    // because it still renders with role="link" and tabindex="0" which makes it focusable.
    // So we need to render a div instead.
    <div
      {...(restProps as CardLinkWrapperProps)}
      data-slot="card-link"
      className={className}
    />
  );
};

export { Card, CardLink, type CardLinkProps, type CardProps };
