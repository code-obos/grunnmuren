import { LoadingSpinner } from '@obosbbl/grunnmuren-icons-react';
import { type VariantProps, cva } from 'cva';
import type { Ref } from 'react';
import { useProgressBar } from 'react-aria';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  Link as RACLink,
  type LinkProps as RACLinkProps,
} from 'react-aria-components';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

/**
 * Figma: https://www.figma.com/file/9OvSg0ZXI5E1eQYi7AWiWn/Grunnmuren-2.0-%E2%94%82-Designsystem?node-id=30%3A2574&mode=dev
 */

const buttonVariants = cva({
  base: [
    'inline-flex min-h-[44px] cursor-pointer items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors duration-200 focus-visible:outline-focus-offset',
  ],
  variants: {
    /**
     * The variant of the button
     * @default primary
     */
    variant: {
      primary: 'no-underline',
      // by using an inset box-shadow to emulate a border instead of an actual border, the button size will be equal regardless of the variant
      secondary: 'no-underline shadow-[inset_0_0_0_2px]',
      tertiary: 'underline hover:no-underline',
    },
    /**
     * Adjusts the color of the button for usage on different backgrounds.
     * @default green
     */
    color: {
      green: 'focus-visible:outline-focus',
      mint: 'focus-visible:outline-focus focus-visible:outline-mint',
      white: 'focus-visible:outline-focus focus-visible:outline-white',
    },
    /**
     * When the button is without text, but with a single icon.
     * @default false
     */
    isIconOnly: {
      true: 'p-2 [&>svg]:h-7 [&>svg]:w-7',
      false: 'gap-2.5 px-4 py-2',
    },
    // Make the content of the button transparent to hide it's content, but keep the button width
    isPending: { true: '!text-transparent relative', false: null },
  },
  compoundVariants: [
    {
      color: 'green',
      variant: 'primary',
      // Darken bg by 20% on hover. The color is manually crafted
      className:
        'bg-green text-white hover:bg-green-dark active:bg-[#007352] [&_[role="progressbar"]]:text-white',
    },
    {
      color: 'green',
      variant: 'secondary',
      className:
        'text-black shadow-green hover:bg-green hover:text-white active:bg-green [&:hover_[role="progressbar"]]:text-white [&_[role="progressbar"]]:text-black',
    },
    {
      color: 'green',
      variant: 'tertiary',
      className: '[&_[role="progressbar"]]:text-black',
    },
    {
      color: 'mint',
      variant: 'primary',
      // Darken bg by 20% on hover. The color is manually crafted
      className:
        'bg-mint text-black hover:bg-[#8dd4bd] active:[#9ddac6] [&_[role="progressbar"]]:text-black',
    },
    {
      color: 'mint',
      variant: 'secondary',
      className:
        'text-mint shadow-mint hover:bg-mint hover:text-black [&:hover_[role="progressbar"]]:text-black [&_[role="progressbar"]]:text-mint',
    },
    {
      color: 'mint',
      variant: 'tertiary',
      className: 'text-mint [&_[role="progressbar"]]:text-mint',
    },
    {
      color: 'white',
      variant: 'primary',
      className:
        'bg-white text-black hover:bg-sky active:bg-sky-light [&_[role="progressbar"]]:text-black',
    },
    {
      color: 'white',
      variant: 'secondary',
      className:
        'text-white shadow-white hover:bg-white hover:text-black [&:hover_[role="progressbar"]]:text-black [&_[role="progressbar"]]:text-white',
    },
    {
      color: 'white',
      variant: 'tertiary',
      className: 'text-white [&_[role="progressbar"]]:text-white',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    color: 'green',
    isIconOnly: false,
    isPending: false,
  },
});

type ButtonOrLinkProps = VariantProps<typeof buttonVariants> & {
  children?: React.ReactNode;
  href?: RACLinkProps['href'];
  /**
   * Display the button in a loading state
   * @deprecated Use isPending instead.
   * @default false
   */
  isLoading?: boolean;
  /** Additional style properties for the element. */
  style?: React.CSSProperties;
  /** Ref to the element. */
  ref?: Ref<HTMLButtonElement | HTMLAnchorElement>;
};

type ButtonProps = (RACButtonProps | RACLinkProps) & ButtonOrLinkProps;

function isLinkProps(
  props: ButtonProps,
): props is ButtonOrLinkProps & RACLinkProps {
  return !!props.href;
}

function Button(props: ButtonProps) {
  const {
    children: _children,
    color,
    isIconOnly,
    isLoading,
    variant,
    isPending: _isPending,
    ref,
    ...restProps
  } = props;

  const isPending = _isPending || isLoading;

  const className = buttonVariants({
    className: props.className,
    color,
    isIconOnly,
    variant,
    isPending,
  });

  const locale = useLocale();

  const { progressBarProps } = useProgressBar({
    isIndeterminate: true,
    'aria-label': translations.pending[locale],
  });

  const children = isPending ? (
    <>
      {_children}
      <LoadingSpinner
        className="absolute m-auto motion-safe:animate-spin"
        {...progressBarProps}
      />
    </>
  ) : (
    _children
  );

  return isLinkProps(restProps) ? (
    <RACLink
      {...restProps}
      className={className}
      ref={ref as Ref<HTMLAnchorElement>}
    >
      {children}
    </RACLink>
  ) : (
    <RACButton
      {...restProps}
      className={className}
      isPending={isPending}
      ref={ref as Ref<HTMLButtonElement>}
    >
      {children}
    </RACButton>
  );
}

export { Button, type ButtonProps };
