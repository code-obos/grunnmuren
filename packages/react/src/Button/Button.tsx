import React, {
  isValidElement,
  Children,
  forwardRef,
  Ref,
  useContext,
  cloneElement,
} from 'react';
import { LoadingSpinner } from '@obosbbl/grunnmuren-icons';
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
  'light-green-primary': 'bg-mint border-mint text-black',
  'light-green-secondary': 'bg-transparent border-mint text-mint',
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
        className="!visible absolute bottom-1 left-1 right-1 top-1 grid place-items-center overflow-hidden bg-inherit"
        aria-hidden
      >
        <LoadingSpinner className="animate-spin" />
      </span>
    </>
  );
};

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
