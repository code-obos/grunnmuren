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
     * @default default
     */
    color: {
      default: 'focus-visible:ring-black',
      mint: 'focus-visible:ring-mint focus-visible:ring-offset-green-dark',
      white: 'focus-visible:ring-white focus-visible:ring-offset-blue',
    },
  },
  compoundVariants: [
    {
      color: 'default',
      variant: 'primary',
      // Darken bg by 20% on hover. The color is manually crafted
      className: 'bg-green text-white hover:bg-green-dark active:bg-[#007352]',
    },
    {
      color: 'default',
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
    color: 'default',
  },
});

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  href?: never;
} & _ButtonProps;

type AnchorProps = React.ComponentPropsWithoutRef<'a'> & {
  href: string;
} & _ButtonProps;

const isAnchor = (props: ButtonProps | AnchorProps): props is AnchorProps => {
  return 'href' in props;
};

type _ButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
  /**
   * Display the button in a loading state
   * @default false
   */
  loading?: boolean;
  style?: React.CSSProperties;
};

function Button(props: AnchorProps): JSX.Element;
function Button(props: ButtonProps): JSX.Element;
function Button(props: ButtonProps | AnchorProps) {
  const { children, className, color, loading, variant, style, ...restProps } =
    props;

  // TODO: Merge refs when we use RAC
  const buttonRef = useRef<HTMLButtonElement | null>(null);
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

  if (props.href != null) {
    return <a {...restProps} />;
  }

  return (
    <button
      aria-busy={loading ? true : undefined}
      className={buttonVariants({ className, color, variant })}
      ref={buttonRef}
      style={{
        ...style,
        width: widthOverride,
      }}
      type="button"
      {...restProps}
    >
      {widthOverride ? (
        <LoadingSpinner className="mx-auto animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}

export { Button, buttonVariants, type ButtonProps };
