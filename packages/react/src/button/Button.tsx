import { useRef, useState, forwardRef, type Ref } from 'react';
import { cva, type VariantProps } from 'cva';
import {
  Button as RACButton,
  Link as RACLink,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components';
import { LoadingSpinner } from '@obosbbl/grunnmuren-icons-react';
import { mergeRefs, useLayoutEffect } from '@react-aria/utils';

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
  },
});

type ButtonOrLinkProps = VariantProps<typeof buttonVariants> & {
  children?: React.ReactNode;
  href?: string;
  /**
   * Display the button in a loading state
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
  forwardedRef: Ref<HTMLButtonElement | HTMLAnchorElement>,
) {
  const {
    children: _children,
    color,
    isIconOnly,
    isLoading,
    variant,
    style: _style,
    ...restProps
  } = props;

  const [widthOverride, setWidthOverride] = useState<number>();

  const ownRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const ref = mergeRefs(ownRef, forwardedRef);

  useLayoutEffect(() => {
    if (isLoading) {
      const requestID = window.requestAnimationFrame(() => {
        setWidthOverride(ownRef.current?.getBoundingClientRect()?.width);
      });
      return () => {
        setWidthOverride(undefined);
        cancelAnimationFrame(requestID);
      };
    }
  }, [isLoading, _children]);

  const className = buttonVariants({
    className: props.className,
    color,
    isIconOnly,
    variant,
  });

  const children = widthOverride ? (
    // remove margin for icon alignment
    <LoadingSpinner className="!m-0 mx-auto animate-spin" />
  ) : (
    _children
  );

  const style = { ..._style, width: widthOverride };

  return isLinkProps(restProps) ? (
    <RACLink
      {...restProps}
      className={className}
      style={style}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
      data-slot="button"
    >
      {children}
    </RACLink>
  ) : (
    <RACButton
      {...restProps}
      className={className}
      style={style}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      data-slot="button"
    >
      {children}
    </RACButton>
  );
}

const _Button = forwardRef(Button);
export { _Button as Button, type ButtonProps };
