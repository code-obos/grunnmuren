import { useRef, useState } from 'react';
import { cva, type VariantProps } from 'cva';
import { LoadingSpinner } from '@obosbbl/grunnmuren-icons-react';

import { useClientLayoutEffect } from '../utils/useClientLayoutEffect';

/**
 * Figma: https://www.figma.com/file/9OvSg0ZXI5E1eQYi7AWiWn/Grunnmuren-2.0-%E2%94%82-Designsystem?node-id=30%3A2574&mode=dev
 */

const buttonVariants = cva({
  base: 'inline-flex min-h-[44px] cursor-pointer items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  variants: {
    /**
     * The variant of the button
     * @default primary
     */
    variant: {
      primary: 'border-none',
      secondary: 'border-2',
      tertiary: 'underline hover:no-underline',
    },
    /**
     * Adjusts the color of the button for usage on different backgrounds.
     * @default green
     */
    color: {
      green: 'focus-visible:ring-black',
      mint: 'focus-visible:ring-mint focus-visible:ring-offset-green-dark',
      white: 'focus-visible:ring-white focus-visible:ring-offset-blue',
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
        'border-green bg-white text-black hover:bg-green hover:text-white active:bg-green',
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
      className: 'border-mint text-mint hover:bg-mint hover:text-black',
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
      className: 'border-white text-white hover:bg-white hover:text-black',
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
  },
});

type ButtonOrLinkProps =
  | (React.ComponentPropsWithoutRef<'button'> & {
      href?: never;
    })
  | (React.ComponentPropsWithoutRef<'a'> & {
      href: string;
    });

type ButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
  /**
   * Display the button in a loading state
   * @default false
   */
  loading?: boolean;
  style?: React.CSSProperties;
} & ButtonOrLinkProps;

function Button(props: ButtonProps) {
  const { children, className, color, loading, variant, style, ...restProps } =
    props;

  // TODO: Merge refs when we use RAC
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [widthOverride, setWidthOverride] = useState<number>();

  useClientLayoutEffect(() => {
    if (loading) {
      const requestID = window.requestAnimationFrame(() => {
        setWidthOverride(buttonRef?.current?.getBoundingClientRect()?.width);
      });
      return () => {
        setWidthOverride(undefined);
        cancelAnimationFrame(requestID);
      };
    }
  }, [loading, children]);

  let Component: 'a' | 'button' = 'a';
  if (props.href == null) {
    // If we don't have a href, it's a button, and we add a fallback type button to prevent the button from accidentally submitting when in a form
    Component = 'button';
    restProps.type ??= 'button';
  }

  return (
    // @ts-expect-error TS doesn't agree here taht restProps is safe to spread, because restProps for anchors aren't type compatible with restProps for buttons, but that should be okay here
    <Component
      aria-busy={loading ? true : undefined}
      className={buttonVariants({ className, color, variant })}
      ref={buttonRef as never}
      style={{
        ...style,
        width: widthOverride,
      }}
      {...restProps}
    >
      {widthOverride ? (
        <LoadingSpinner className="mx-auto animate-spin" />
      ) : (
        children
      )}
    </Component>
  );
}

export { Button, type ButtonProps };
