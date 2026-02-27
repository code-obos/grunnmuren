import { LoadingSpinner } from '@obosbbl/grunnmuren-icons-react';
import { compose, cva, type VariantProps } from 'cva';
import { createContext, type Ref } from 'react';
import { useProgressBar } from 'react-aria';
import {
  type ContextValue,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
  Link as RACLink,
  type LinkProps as RACLinkProps,
  useContextProps,
} from 'react-aria-components';
import { animateIconVariants } from '../classes';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

/**
 * Figma: https://www.figma.com/file/9OvSg0ZXI5E1eQYi7AWiWn/Grunnmuren-2.0-%E2%94%82-Designsystem?node-id=30%3A2574&mode=dev
 */

const buttonVariants = compose(
  animateIconVariants,
  cva({
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
        secondary:
          'border-2 border-current no-underline hover:border-transparent',
        tertiary: 'underline hover:no-underline',
      },
      /**
       * Adjusts the color of the button for usage on different backgrounds.
       * @default blue
       */
      color: {
        blue: 'focus-visible:outline-focus',
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
      isPending: { true: 'relative text-transparent!', false: null },
    },
    compoundVariants: [
      {
        color: 'blue',
        variant: 'primary',
        // Darken bg by 20% on hover. The color is manually crafted
        className:
          'bg-blue-dark text-white hover:bg-blue active:bg-[#0536A0] active:text-white [&_[role="progressbar"]]:text-white',
      },
      {
        color: 'blue',
        variant: 'secondary',
        className:
          'text-blue-dark hover:border-transparent hover:bg-blue hover:text-blue-dark hover:text-white active:bg-[#0536A0] [&:hover_[role="progressbar"]]:text-white [&_[role="progressbar"]]:text-blue-dark',
      },
      {
        color: 'blue',
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
          'text-mint hover:bg-mint hover:text-black [&:hover_[role="progressbar"]]:text-black [&_[role="progressbar"]]:text-mint',
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
          'text-white hover:bg-white hover:text-black [&:hover_[role="progressbar"]]:text-black [&_[role="progressbar"]]:text-white',
      },
      {
        color: 'white',
        variant: 'tertiary',
        className: 'text-white [&_[role="progressbar"]]:text-white',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      color: 'blue',
      isIconOnly: false,
      isPending: false,
    },
  }),
);

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

function isLinkProps(
  props: ButtonProps,
): props is ButtonOrLinkProps & RACLinkProps {
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
      {...(restProps as RACLinkProps)}
      className={className}
      ref={ref as Ref<HTMLAnchorElement>}
    >
      {children}
    </RACLink>
  ) : (
    <RACButton
      {...(restProps as RACButtonProps)}
      className={className}
      isPending={isPending}
      ref={ref as Ref<HTMLButtonElement>}
    >
      {children}
    </RACButton>
  );
}

export { Button, ButtonContext, type ButtonProps };
