import { forwardRef, Ref, useContext } from 'react';
import classNames from 'clsx';
import { ButtonColorContext } from '.';

export type ButtonColor = 'standard' | 'white' | 'light-green';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  className?: string;
  color?: 'standard' | 'white' | 'light-green';
  disabled?: boolean;
  href?: string;
  /** @default button */
  type?: 'button' | 'submit' | 'reset';
  /** @default primary */
  variant?: 'primary' | 'secondary';
}

const buttonVariations = {
  'standard-primary': 'bg-green border-green text-white',
  'standard-secondary': 'bg-white border-green text-black',
  'light-green-primary': 'bg-green-light border-green-light text-black',
  'light-green-secondary': 'bg-transparent border-green-light text-green-light',
  'white-primary': 'bg-white border-white text-black',
  'white-secondary': 'bg-transparent border-white text-white',
} as const;

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    className,
    color: colorFromProp,
    href,
    type = 'button',
    variant = 'primary',
    ...rest
  } = props;

  const colorFromContext = useContext(ButtonColorContext);

  const color = colorFromProp ?? colorFromContext;

  const buttonVariation = buttonVariations[`${color}-${variant}`];

  const classes = classNames(
    className,
    buttonVariation,
    'gm-button relative no-underline inline-block border-solid border-2 px-6 py-2 rounded-xl transition-all duration-200 font-medium w-fit disabled:pointer-events-none disabled:text-black disabled:bg-gray-light disabled:border-gray-light hover:rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black ring-offset-2',
  );

  return (
    <>
      {href /* @ts-expect-error Find a solutions later but not necessary now */ ? (
        <a
          {...rest}
          href={href}
          ref={ref as Ref<HTMLAnchorElement>}
          className={classes}
        />
      ) : (
        <button
          {...rest}
          type={type}
          ref={ref as Ref<HTMLButtonElement>}
          className={classes}
        />
      )}
    </>
  );
});
