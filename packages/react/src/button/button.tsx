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
     * The role the button takes its colours from. `contrast` is the white button for dark
     * backgrounds.
     * @default primary
     */
    color: {
      primary: 'focus-visible:outline-focus',
      accent: 'focus-visible:outline-focus',
      neutral: 'focus-visible:outline-focus',
      contrast: 'focus-visible:outline-focus focus-visible:outline-primary-base-contrast-default',
      /** @deprecated Use `contrast` */
      mint: 'focus-visible:outline-focus focus-visible:outline-mint',
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
    // The button sets data-color to its role, so the short tokens point at that role and the
    // three share one set of classes. Hover and pressed get lighter than the fill.
    {
      color: ['primary', 'accent', 'neutral'],
      variant: 'primary',
      className:
        'bg-base-default hover:bg-base-hover text-base-contrast-default active:bg-base-active active:text-base-contrast-default **:[[role="progressbar"]]:text-base-contrast-default',
    },
    {
      color: ['primary', 'accent', 'neutral'],
      variant: 'secondary',
      className:
        'text-text-default hover:bg-base-hover **:[[role="progressbar"]]:text-text-default hover:text-base-contrast-default active:bg-base-active [&:hover_[role="progressbar"]]:text-base-contrast-default hover:border-transparent',
    },
    {
      color: ['primary', 'accent', 'neutral'],
      variant: 'tertiary',
      className: '**:[[role="progressbar"]]:text-neutral-text-default',
    },
    {
      color: 'contrast',
      variant: 'primary',
      className:
        'hover:bg-primary-surface-hover active:bg-primary-surface-active bg-neutral-surface-default text-neutral-text-default **:[[role="progressbar"]]:text-neutral-text-default',
    },
    {
      color: 'contrast',
      variant: 'secondary',
      className:
        'text-primary-base-contrast-default hover:bg-neutral-surface-default hover:text-neutral-text-default [&:hover_[role="progressbar"]]:text-neutral-text-default **:[[role="progressbar"]]:text-primary-base-contrast-default',
    },
    {
      color: 'contrast',
      variant: 'tertiary',
      className:
        'text-primary-base-contrast-default **:[[role="progressbar"]]:text-primary-base-contrast-default',
    },
    // Deprecated, and stays on the palette so it looks the same as before in every theme.
    // Hover and pressed are hand picked, there's nothing darker than mint-300 to use.
    {
      color: 'mint',
      variant: 'primary',
      className:
        'bg-mint text-black hover:bg-[#8dd4bd] active:bg-[#9ddac6] **:[[role="progressbar"]]:text-black',
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
  ],
  defaultVariants: {
    variant: 'primary',
    color: 'primary',
    isIconOnly: false,
    isPending: false,
  },
});

type ButtonColor = NonNullable<VariantProps<typeof buttonVariants>['color']>;

// The palette names from before the roles that look the same as a role. Kept so existing
// code doesn't break, and removed in the next major. Mint has no role, so it's a variant.
const legacyColors = { blue: 'primary', white: 'contrast' } as const;

type ButtonOrLinkProps = Omit<VariantProps<typeof buttonVariants>, 'color'> & {
  /**
   * The role the button takes its colours from. `contrast` is the white button for dark
   * backgrounds.
   *
   * `blue`, `mint` and `white` are deprecated: use `primary` instead of `blue`, and
   * `contrast` instead of `mint` and `white`. `mint` still renders mint until it's removed.
   * @default primary
   */
  color?: ButtonColor | keyof typeof legacyColors;
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

  const resolvedColor: ButtonColor =
    color && color in legacyColors
      ? legacyColors[color as keyof typeof legacyColors]
      : ((color as ButtonColor | undefined) ?? 'primary');

  // Only the roles have short tokens to point at
  const dataColor =
    resolvedColor === 'contrast' || resolvedColor === 'mint' ? undefined : resolvedColor;

  const className = buttonVariants({
    // Don't animate the icon when we're pending, as it affects the loading spinner
    animateIcon: isPending ? undefined : animateIcon,
    className: props.className,
    color: resolvedColor,
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
      data-color={dataColor}
      data-slot="button"
      ref={ref as Ref<HTMLAnchorElement>}
    >
      {children}
    </RACLink>
  ) : (
    <RACButton
      {...(restProps as RACButtonProps)}
      className={className}
      data-color={dataColor}
      data-slot="button"
      isPending={isPending}
      ref={ref as Ref<HTMLButtonElement>}
    >
      {children}
    </RACButton>
  );
}

export { Button, ButtonContext, type ButtonProps };
