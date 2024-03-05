import { useRef, useState, forwardRef, type Ref } from 'react';
import { cva, type VariantProps } from 'cva';
import { LoadingSpinner } from '@obosbbl/grunnmuren-icons-react';
import { mergeRefs } from '@react-aria/utils';

import { useClientLayoutEffect } from '../utils/useClientLayoutEffect';

/**
 * Figma: https://www.figma.com/file/9OvSg0ZXI5E1eQYi7AWiWn/Grunnmuren-2.0-%E2%94%82-Designsystem?node-id=30%3A2574&mode=dev
 */

const buttonVariants = cva({
  base: [
    'inline-flex min-h-[44px] cursor-pointer items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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
      green: 'focus-visible:ring-black',
      mint: 'focus-visible:ring-mint focus-visible:ring-offset-green-dark',
      white: 'focus-visible:ring-white focus-visible:ring-offset-blue',
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
        'bg-white text-black shadow-green hover:bg-green hover:text-white active:bg-green',
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
  isLoading?: boolean;
  style?: React.CSSProperties;
} & ButtonOrLinkProps;

function Button(
  props: ButtonProps,
  forwardedRef: Ref<HTMLButtonElement | HTMLAnchorElement>,
) {
  const {
    children,
    className,
    color,
    isIconOnly,
    isLoading,
    variant,
    style,
    ...restProps
  } = props;

  const [widthOverride, setWidthOverride] = useState<number>();

  const ownRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const ref = mergeRefs(ownRef, forwardedRef);

  useClientLayoutEffect(() => {
    if (isLoading) {
      const requestID = window.requestAnimationFrame(() => {
        setWidthOverride(ownRef.current?.getBoundingClientRect()?.width);
      });
      return () => {
        setWidthOverride(undefined);
        cancelAnimationFrame(requestID);
      };
    }
  }, [isLoading, children]);

  let Component: 'a' | 'button' = 'a';
  if (props.href == null) {
    // If we don't have a href, it's a button, and we add a fallback type button to prevent the button from accidentally submitting when in a form
    Component = 'button';
    restProps.type ??= 'button';
  }

  return (
    // @ts-expect-error TS doesn't agree here taht restProps is safe to spread, because restProps for anchors aren't type compatible with restProps for buttons, but that should be okay here
    <Component
      aria-busy={isLoading ? true : undefined}
      className={buttonVariants({ className, color, isIconOnly, variant })}
      ref={ref as never}
      style={{
        ...style,
        width: widthOverride,
      }}
      {...restProps}
    >
      {widthOverride ? (
        // remove margin for icon alignment
        <LoadingSpinner className="!m-0 mx-auto animate-spin" />
      ) : (
        children
      )}
    </Component>
  );
}

const _Button = forwardRef(Button);
export { _Button as Button, type ButtonProps };
