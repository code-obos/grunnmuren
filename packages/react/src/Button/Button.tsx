import React, {
  isValidElement,
  Children,
  forwardRef,
  Ref,
  useContext,
  cloneElement,
} from 'react';
import { cx } from '@/utils';
import { ButtonColorContext } from '.';

export type ButtonColor = 'standard' | 'white' | 'light-green';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  className?: string;
  color?: 'standard' | 'white' | 'light-green';
  disabled?: boolean;
  href?: string;
  /** Renders the button in a loading state */
  loading?: boolean;
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
    children: childrenFromProp,
    className,
    color: colorFromProp,
    href,
    loading,
    type = 'button',
    variant = 'primary',
    ...rest
  } = props;

  const colorFromContext = useContext(ButtonColorContext);

  const color = colorFromProp ?? colorFromContext;

  const buttonVariation = buttonVariations[`${color}-${variant}`];

  const classes = cx(className, buttonVariation, 'button');

  const children = loading ? (
    <Loader>{childrenFromProp}</Loader>
  ) : (
    childrenFromProp
  );

  return (
    <>
      {href /* @ts-expect-error Find a solutions later but not necessary now */ ? (
        <a
          aria-busy={loading ? true : undefined}
          {...rest}
          href={href}
          ref={ref as Ref<HTMLAnchorElement>}
          className={classes}
        >
          {children}
        </a>
      ) : (
        <button
          aria-busy={loading ? true : undefined}
          {...rest}
          type={type}
          ref={ref as Ref<HTMLButtonElement>}
          className={classes}
        >
          {children}
        </button>
      )}
    </>
  );
});

/**
 * Creates a loading indicator overlay in the button. This is really hackish so an explainer is necessary.
 *
 * We don't want the button size to change when we're showing the loading indicator, so we must still "render"
 * the regular content, even though we don't want it to be visible. Some of the button variations have transparent
 * backgrounds, so we can't just set a bg color for the loading overlay either...
 *
 * As a workaround, we hide all the button's children (except the loader) using visibility: hidden, so it
 * still takes space in the dom, and is accessible for screen readers.
 *
 * Children are deeply traversed to ensure that text nodes have a wrapper that can be targed by the visibility hidden rule
 *
 *
 */
const Loader = (props: { children: React.ReactNode }) => {
  return (
    <>
      {deeplyWrapStrings(props.children)}
      <span
        // Notice the important modifier to visible here: we want it to escape the visibility hidden applied to the buttons children
        className="!visible absolute top-1 bottom-1 left-1 right-1 grid place-items-center overflow-hidden bg-inherit"
        aria-hidden
      >
        <LoadingIcon className="animate-spin" />
      </span>
    </>
  );
};

// TODO: Load from icon lib when the icon is exported properly from Figma
const LoadingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="1.25em"
    height="1.25em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={4}
      d="M22 12C22 10.2897 21.5613 8.60798 20.726 7.11558C19.8906 5.62318 18.6864 4.36998 17.2285 3.47575C15.7706 2.58152 14.1077 2.07615 12.3988 2.00795C10.6898 1.93975 8.99195 2.311 7.46743 3.0862C5.9429 3.86141 4.64268 5.01466 3.69102 6.43575C2.73937 7.85683 2.1681 9.49824 2.0318 11.2031C1.89551 12.908 2.19875 14.6193 2.91255 16.1735C3.62634 17.7277 4.72684 19.0729 6.10884 20.0805"
    />
    <circle cx={21} cy={18} r={2} fill="currentColor" />
  </svg>
);

/**
 * Recurse children to wrap strings with spans so they're targeted by the visibility hidden rule
 */
function deeplyWrapStrings(children: React.ReactNode): React.ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return typeof child === 'string' ? <span>{child}</span> : child;
    }

    if (child.props.children) {
      const props = {
        children: deeplyWrapStrings(child.props.children),
      };
      child = cloneElement(child, props);
    }

    return child;
  });
}
