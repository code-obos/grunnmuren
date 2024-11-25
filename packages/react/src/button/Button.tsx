import { forwardRef, type Ref } from 'react';
import { cva, type VariantProps } from 'cva';
import { useProgressBar } from 'react-aria';
import {
  Button as RACButton,
  Link as RACLink,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components';
import { LoadingSpinner } from '@obosbbl/grunnmuren-icons-react';

/**
 * Figma: https://www.figma.com/file/9OvSg0ZXI5E1eQYi7AWiWn/Grunnmuren-2.0-%E2%94%82-Designsystem?node-id=30%3A2574&mode=dev
 */

const buttonVariants = cva({
  base: [
    'relative inline-flex min-h-[44px] cursor-pointer items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors duration-200 focus-visible:outline-focus-offset',
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
    isPending: { true: '!text-transparent', false: null },
  },
  compoundVariants: [
    {
      color: 'green',
      variant: 'primary',
      // Darken bg by 20% on hover. The color is manually crafted
      className: 'bg-green text-white hover:bg-green-dark active:bg-[#007352]',
    },
    {
      color: 'green',
      variant: 'secondary',
      className:
        'text-black shadow-green hover:bg-green hover:text-white active:bg-green',
    },
    {
      color: 'mint',
      variant: 'primary',
      // Darken bg by 20% on hover. The color is manually crafted
      className: 'active:[#9ddac6] bg-mint text-black hover:bg-[#8dd4bd]',
    },
    {
      color: 'mint',
      variant: 'secondary',
      className: 'text-mint shadow-mint hover:bg-mint hover:text-black',
    },
    {
      color: 'mint',
      variant: 'tertiary',
      className: 'text-mint',
    },
    {
      color: 'white',
      variant: 'primary',
      className: 'bg-white text-black hover:bg-sky active:bg-sky-light',
    },
    {
      color: 'white',
      variant: 'secondary',
      className: 'text-white shadow-white hover:bg-white hover:text-black',
    },
    {
      color: 'white',
      variant: 'tertiary',
      className: 'text-white',
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
  href?: string;
  /**
   * Display the button in a loading state
   * @deprecated Use isPending instead.
   * @default false
   */
  isLoading?: boolean;
};

type ButtonProps = (
  | RACButtonProps
  | React.ComponentPropsWithoutRef<typeof RACLink>
) &
  ButtonOrLinkProps;

function isLinkProps(
  props: ButtonProps,
): props is ButtonOrLinkProps & React.ComponentPropsWithoutRef<typeof RACLink> {
  return !!props.href;
}

function Button(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement | HTMLAnchorElement>,
) {
  const {
    children: _children,
    color,
    isIconOnly,
    isLoading,
    variant,
    isPending: _isPending,
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

  const { progressBarProps } = useProgressBar({
    isIndeterminate: true,
    'aria-label': 'Venter',
  });

  const children = isPending ? (
    <>
      {_children}
      <LoadingSpinner
        className="absolute m-auto animate-spin text-[white]"
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
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      {children}
    </RACLink>
  ) : (
    <RACButton
      {...restProps}
      className={className}
      isPending={isPending}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
    >
      {children}
    </RACButton>
  );
}

const _Button = forwardRef(Button);
export { _Button as Button, type ButtonProps };
