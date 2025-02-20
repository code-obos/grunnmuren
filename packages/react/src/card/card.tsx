import { type VariantProps, cva } from 'cva';
import { Link, type LinkProps as RACLinkProps } from 'react-aria-components';

type CardProps = VariantProps<typeof cardVariants> & {
  children?: React.ReactNode;
  className?: string;
  /**
   * ARIA role for the `Card`.
   * This is handy if you can not, or don't want to add an extra semantic HTML tag to your `Card` content, or as a wrapper for your `Card`
   * */
  role?: 'complementary' | 'listitem';
};

const cardVariants = cva({
  base: [
    'group/card',
    'rounded-2xl border p-3',
    'flex flex-col gap-y-4',
    'relative', // Needed for positiong of the clickable pseudo-element (and can also be used for other absolute positioned elements the consumer might add)

    // **** Heading ****
    '[&_[data-slot="heading"]]:inline',
    '[&_[data-slot="heading"]]:heading-s',
    '[&_[data-slot="heading"]]:leading-6', // A bit more line height than the default is necessary to make the underline align with the text if the heading has a card link
    '[&_[data-slot="heading"]]:w-fit',
    '[&_[data-slot="heading"]]:text-pretty',
    '[&_[data-slot="heading"]]:hyphens-auto',
    '[&_[data-slot="heading"]]:[word-break:break-word]', // necessary to make hyphens work in grid containers in Safari

    // **** Content ****
    '[&_[data-slot="content"]]:flex [&_[data-slot="content"]]:flex-col [&_[data-slot="content"]]:gap-y-4',

    // **** Media ****
    '[&_[data-slot="media"]]:overflow-hidden', // Prevent content from overflowing the rounded corners
    '[&_[data-slot="media"]]:rounded-t-2xl', // Top corners are always rounded
    // Position media at the edges of the card (because of these negative margins the media-element must be a wrapper around the actual image or other media content)
    '[&_[data-slot="media"]]:mx-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))] [&_[data-slot="media"]]:mt-[calc(theme(space.3)*-1-theme(borderWidth.DEFAULT))]',
    // Sets the aspect ratio of the media content (width: 100% is necessary to make aspect ratio work in FF)
    '[&_[data-slot="media"]>*]:aspect-[3/2] [&_[data-slot="media"]>*]:w-full [&_[data-slot="media"]_img]:object-cover',
    // Prepare zoom animation for hover effects. The hover effect can also be enabled by classes on the parent component, so it is always prepared here.
    '[&_[data-slot="media"]>*]:duration-300 [&_[data-slot="media"]>*]:ease-in-out [&_[data-slot="media"]>*]:motion-safe:transition-transform',

    // **** Card link ****
    // **** Hover ****
    // Enables the zoom hover effect on media (note that we can't use group-hover/card here, because there might be other clickable elements in the card aside from the heading)
    '[&:has([data-slot="card-link"]_a:hover)_[data-slot="media"]>*]:scale-110',
    // **** Card link in Heading ****
    '[&:has([data-slot="heading"]_[data-slot="card-link"]:hover)_[data-slot="media"]>*]:scale-110',
    // Border (bottom/top) is set to transparent to make sure the bottom underline is not visible when the card is hovered
    // Border top is set to even out the border bottom used for the underline
    '[&_[data-slot="heading"]_[data-slot="card-link"]]:no-underline',
    '[&_[data-slot="heading"]_[data-slot="card-link"]]:border-y-2',
    '[&_[data-slot="heading"]_[data-slot="card-link"]]:border-y-transparent',
    '[&_[data-slot="heading"]_[data-slot="card-link"]]:transition-colors',
    '[&_[data-slot="heading"]_[data-slot="card-link"]:hover]:border-b-current',
    // Mimic heading styles for the card link if placed in the heading slot. This is necessary to make the custom underline align with the link text
    '[&_[data-slot="heading"]_[data-slot="card-link"]]:heading-s',
    '[&_[data-slot="heading"]_[data-slot="card-link"]]:leading-6',
    '[&_[data-slot="heading"]_[data-slot="card-link"]]:text-pretty',
    '[&_[data-slot="heading"]_[data-slot="card-link"]]:hyphens-auto',
    '[&_[data-slot="heading"]_[data-slot="card-link"]]:[word-break:break-word]', // necessary to make hyphens work in grid containers in Safari

    // **** Fail-safe for interactive elements ****
    // Make interactive elements clickable by themselves, while the rest of the card is clickable as a whole
    // The card is made clickable by a pseudo-element on the heading that covers the entire card
    '[&:not(:has([data-slot="card-link"]_a))_a:not([data-slot="card-link"])]:relative [&_button]:relative [&_input]:relative',
    // Our Button component has position: relative by default, so we need to override that if it is used in a CardLink (to make the entire card clickable)
    '[&_[data-slot="card-link"]_a]:static',
    // Place other interactive on top of the pseudo-element that makes the entire card clickable
    // by setting a higher z-index than the pseudo-element (which implicitly z-index 0)
    '[&_a:not([data-slot="card-link"])]:z-[1] [&_button]:z-[1] [&_input]:z-[1]',
  ],
  variants: {
    /**
     * The variant of the card
     * @default subtle
     */
    variant: {
      subtle: [
        'border-transparent',
        // Media styles:
        '[&_[data-slot="media"]]:rounded-b-2xl',
      ],
      outlined: 'border border-black',
    },
  },
  defaultVariants: {
    variant: 'subtle',
  },
});

const Card = ({
  children,
  className: _className,
  variant,
  ...restProps
}: CardProps) => {
  const className = cardVariants({
    className: _className,
    variant,
  });
  return (
    <div className={className} {...restProps}>
      {children}
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
        'data-[focus-visible]:after:outline-focus',
        'data-[focus-visible]:after:outline-offset-2',
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
