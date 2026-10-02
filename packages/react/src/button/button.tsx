import { LoadingSpinner } from '@obosbbl/grunnmuren-icons-react';
import { cva, type VariantProps } from 'cva';
import { createContext, type Ref } from 'react';
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components/Button';
import { Link as RACLink, type LinkProps as RACLinkProps } from 'react-aria-components/Link';
import { type ContextValue, useContextProps } from 'react-aria-components/slots';
import { useProgressBar } from 'react-aria/useProgressBar';

import { animateIconVariants } from '../classes';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

/**
 * Figma: https://www.figma.com/file/9OvSg0ZXI5E1eQYi7AWiWn/Grunnmuren-2.0-%E2%94%82-Designsystem?node-id=30%3A2574&mode=dev
 */

const buttonVariants = cva({
  composes: animateIconVariants,
  base: [
    'focus-visible:outline-focus-offset inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-lg font-medium whitespace-nowrap transition-colors duration-200',
  ],
  variants: {
    /**
     * The variant of the button
     * @default primary
     */
    variant: {
      primary: 'no-underline',
      // by using an inset box-shadow to emulate a border instead of an actual border, the button size will be equal regardless of the variant
      secondary: 'border-2 border-current no-underline hover:border-transparent',
      tertiary: 'underline hover:no-underline',
    },
    /**
     * Adjusts the color of the button for usage on different backgrounds.
     * @default blue
     */
    color: {
      blue: 'focus-visible:outline-focus',
      mint: 'focus-visible:outline-focus focus-visible:outline-mint',
      white: 'focus-visible:outline-focus focus-visible:outline-primary-base-contrast-default',
    },
    /**
     * When the button is without text, but with a single icon.
     * @default false
     */
    isIconOnly: {
      true: 'p-2 [&>svg]:size-7',
      false: 'gap-2.5 px-4 py-2',
    },
    // Make the content of the button transparent to hide it's content, but keep the button width
    isPending: { true: 'relative text-transparent!', false: null },
  },
  compoundVariants: [
    {
      color: 'blue',
      variant: 'primary',
      // Every state is darker than the one before it
      className:
        'bg-primary-base-default hover:bg-primary-base-hover text-primary-base-contrast-default active:bg-primary-base-active active:text-primary-base-contrast-default **:[[role="progressbar"]]:text-primary-base-contrast-default',
    },
    {
      color: 'blue',
      variant: 'secondary',
      className:
        'text-primary-text-default hover:bg-primary-base-hover **:[[role="progressbar"]]:text-primary-text-default hover:text-primary-base-contrast-default active:bg-primary-base-active [&:hover_[role="progressbar"]]:text-primary-base-contrast-default hover:border-transparent',
    },
    {
      color: 'blue',
      variant: 'tertiary',
      className: '**:[[role="progressbar"]]:text-neutral-text-default',
    },
    // Mint stays on the palette for now. The role set has nothing for a button on a dark
    // background, and nothing darker than mint-300 to hover to. Waiting on the designer.
    {
      color: 'mint',
      variant: 'primary',
      // Darken bg by 20% on hover. The color is manually crafted
      className:
        'bg-mint active:[#9ddac6] text-black hover:bg-[#8dd4bd] **:[[role="progressbar"]]:text-black',
    },
    {
      color: 'mint',
      variant: 'secondary',
      className:
        'text-mint hover:bg-mint **:[[role="progressbar"]]:text-mint hover:text-black [&:hover_[role="progressbar"]]:text-black',
    },
    {
      color: 'mint',
      variant: 'tertiary',
      className: 'text-mint **:[[role="progressbar"]]:text-mint',
    },
    {
      color: 'white',
      variant: 'primary',
      className:
        'hover:bg-primary-surface-hover active:bg-primary-surface-active bg-neutral-surface-default text-neutral-text-default **:[[role="progressbar"]]:text-neutral-text-default',
    },
    {
      color: 'white',
      variant: 'secondary',
      className:
        'text-primary-base-contrast-default hover:bg-neutral-surface-default hover:text-neutral-text-default [&:hover_[role="progressbar"]]:text-neutral-text-default **:[[role="progressbar"]]:text-primary-base-contrast-default',
    },
    {
      color: 'white',
      variant: 'tertiary',
      className:
        'text-primary-base-contrast-default **:[[role="progressbar"]]:text-primary-base-contrast-default',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    color: 'blue',
    isIconOnly: false,
    isPending: false,
  },
});

type ButtonOrLinkProps = VariantProps<typeof buttonVariants> & {
  children?: React.ReactNode;
  href?: RACLinkProps['href'];
  /** Additional style properties for the element. */
  style?: React.CSSProperties;
  /** Ref to the element. */
  ref?: Ref<HTMLButtonElement | HTMLAnchorElement>;
};

type ButtonProps = (RACButtonProps | RACLinkProps) & ButtonOrLinkProps;

const ButtonContext = createContext<
  ContextValue<ButtonProps, HTMLButtonElement | HTMLAnchorElement>
>({});

function isLinkProps(props: ButtonProps): props is ButtonOrLinkProps & RACLinkProps {
  return !!props.href;
}

function Button({ ref = null, ...props }: ButtonProps) {
  [props, ref] = useContextProps(props, ref, ButtonContext);
  const {
    animateIcon,
    children: _children,
    color,
    isIconOnly,
    variant,
    isPending,
    ...restProps
  } = props;

  const className = buttonVariants({
    // Don't animate the icon when we're pending, as it affects the loading spinner
    animateIcon: isPending ? undefined : animateIcon,
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
      <LoadingSpinner className="absolute m-auto motion-safe:animate-spin" {...progressBarProps} />
    </>
  ) : (
    _children
  );

  return isLinkProps(restProps) ? (
    <RACLink
      {...(restProps as RACLinkProps)}
      className={className}
      data-slot="button"
      ref={ref as Ref<HTMLAnchorElement>}
    >
      {children}
    </RACLink>
  ) : (
    <RACButton
      {...(restProps as RACButtonProps)}
      className={className}
      data-slot="button"
      isPending={isPending}
      ref={ref as Ref<HTMLButtonElement>}
    >
      {children}
    </RACButton>
  );
}

export { Button, ButtonContext, type ButtonProps };
