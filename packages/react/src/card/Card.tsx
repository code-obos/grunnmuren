import { cva, VariantProps } from 'cva';
import { Link, LinkProps } from 'react-aria-components';

type CardProps = VariantProps<typeof cardVariants> & {
  children?: React.ReactNode;
  className?: string;
};

const cardVariants = cva({
  base: [
    'group/card',
    'rounded-2xl border p-3',
    'grid auto-rows-max gap-y-4',
    'relative', // Needed for positiong of the clickable pseudo-element (and can also be used for other absolute positioned elements the consumer might add)

    // **** Heading ****
    '[&_[data-slot="heading"]]:inline',
    '[&:not(:has([data-slot="card-link"]))_[data-slot="heading"]]:heading-s',
    '[&:not(:has([data-slot="card-link"]))_[data-slot="heading"]]:w-fit',
    '[&:not(:has([data-slot="card-link"]))_[data-slot="heading"]]:text-pretty',

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
    '[&_[data-slot="media"]>*]:duration-300 [&_[data-slot="media"]>*]:ease-in-out [&_[data-slot="media"]>*]:motion-safe:transition-transform',

    // **** Card link ****
    // Enables the zoom hover effect on media (note that we can't use group-hover/card here, because there might be other clickable elements in the card aside from the heading)
    '[&:has([data-slot="card-link"]:hover)_[data-slot="media"]>*]:scale-110',
    // **** Card link in Heading ****
    // **** Hover: custom underline ****
    // Border (bottom/top) is set to transparent to make sure the bottom underline is not visible when the card is hovered
    // Border top is set to even out the border bottom used for the underline
    '[&_[data-slot="heading"]_[data-slot="card-link"]]:border-y-2',
    '[&_[data-slot="heading"]_[data-slot="card-link"]]:border-y-transparent',
    '[&_[data-slot="heading"]_[data-slot="card-link"]]:transition-colors',
    '[&_[data-slot="heading"]_[data-slot="card-link"]:hover]:border-b-current',
    // Mimic heading styles for the card link if placed in the heading slot
    '[&_[data-slot="heading"]_[data-slot="card-link"]]:heading-s [&_[data-slot="heading"]_[data-slot="card-link"]]:text-pretty',

    // **** Fail-safe for interactive elements ****
    // Make interactive elements clickable by themselves, while the rest of the card is clickable as a whole
    // The card is then made clickable by a pseudo-element on the heading that covers the entire card
    '[&_a:not([data-slot="card-link"])]:relative [&_button]:relative [&_input]:relative',
    // Place other interactive on top of the pseudo-element that makes the entire card clickable
    // by setting a higher z-index than the pseudo-element (which implicitly z-index 0)
    '[&_a:not([data-slot="card-link"])]:z-[1] [&_button]:z-[1] [&_input]:z-[1]',
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
  },
});

const Card = ({
  children,
  className: _className,
  border,
  ...restProps
}: CardProps) => {
  const className = cardVariants({
    className: _className,
    border,
  });
  return (
    <div className={className} {...restProps}>
      {children}
    </div>
  );
};

type RACLinkProps = Pick<LinkProps, 'href' | 'routerOptions' | 'children'>;

type CardLinkWrapperProps = {
  [Key in keyof RACLinkProps]: LinkProps[Key];
} & {
  // Override children type of LinkProps as it also allows a callback which is not allowed in HTMLProps
  children: React.ReactNode;
};

type CardLinkProps = {
  className?: string;
} & (RACLinkProps | CardLinkWrapperProps);

const cardLinkVariants = cva({
  base: [
    'cursor-pointer',
    // **** Clickarea ****
    'after:absolute',
    'after:inset-[calc(theme(borderWidth.DEFAULT)*-1)]',
    'after:rounded-[calc(theme(borderRadius.2xl)-theme(borderWidth.DEFAULT))]',
  ],
  variants: {
    withHref: {
      true: [
        // **** Focus ****
        'focus-visible:outline-none',
        'focus-visible:after:outline-focus',
        'focus-visible:after:outline-offset-2',
        // **** Hover ****
        // Links are underlined by default, and the underline is removed on hover.
        // So we make sure that also happens when the user hovers the clickable area.
        'hover:no-underline',
      ],
      false: [
        // **** Focus ****
        '[&_a:focus-visible]:outline-none',
        '[&:has(a:focus-visible)]:after:outline-focus',
        '[&:has(a:focus-visible)]:after:outline-offset-2',
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
      {...restProps}
      href={href}
      className={className}
    />
  ) : (
    // We can't utilize that the `Link` component from react-aria-components renders as a span if it doesn't have an href,
    // because it still renders with role="link" and tabindex="0" which makes it focusable.
    // So we need to render a div instead.
    <div
      data-slot="card-link"
      className={className}
      {...(restProps as CardLinkWrapperProps)}
    />
  );
};

export { Card, type CardProps, type CardLinkProps, CardLink };
