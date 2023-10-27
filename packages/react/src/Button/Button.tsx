import { useRef, useState } from 'react';
import { cva, type VariantProps } from 'cva';
import { LoadingSpinner } from '@obosbbl/grunnmuren-icons-react';

import { useClientLayoutEffect } from '../utils/useClientLayoutEffect';

/**
 * Figma: https://www.figma.com/file/9OvSg0ZXI5E1eQYi7AWiWn/Grunnmuren-2.0-%E2%94%82-Designsystem?node-id=30%3A2574&mode=dev
 */

const buttonVariants = cva({
  base: 'min-h-[44px] cursor-pointer rounded-lg px-4 py-2 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  variants: {
    /**
     * The variant of the button
     * @default primary
     */
    variant: {
      primary: 'border-none hover:underline',
      secondary: 'border-2 hover:underline',
      tertiary: 'underline',
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
      className: 'border-green bg-white text-black hover:border-green-dark',
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
      className: 'border-mint text-mint',
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
      className: 'border-white text-white',
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

type ButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
  /**
   * Display the button in a loading state
   * @default false
   */
  loading?: boolean;
  style?: React.CSSProperties;
};
// TODO: Link/anchor support https://twitter.com/maranomynet_en/status/1713867936367001890/photo/1

function Button(props: ButtonProps) {
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

  return (
    <button
      aria-busy={loading ? true : undefined}
      className={buttonVariants({ className, color, variant })}
      ref={buttonRef}
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
    </button>
  );
}

export { Button, buttonVariants, type ButtonProps };
