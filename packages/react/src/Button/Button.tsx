import { cva, type VariantProps } from 'cva';

/**
 * Figma: https://www.figma.com/file/9OvSg0ZXI5E1eQYi7AWiWn/Grunnmuren-2.0-%E2%94%82-Designsystem?node-id=30%3A2574&mode=dev
 */

const buttonVariants = cva({
  base: 'rounded-lg cursor-pointer px-4 py-2 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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
};
// TODO: Link/anchor support https://twitter.com/maranomynet_en/status/1713867936367001890/photo/1

function Button(props: ButtonProps) {
  const { className, variant, color, ...rest } = props;

  return (
    <button
      className={buttonVariants({ className, color, variant })}
      {...rest}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
