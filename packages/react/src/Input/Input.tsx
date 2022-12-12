import { forwardRef } from 'react';
import { cx } from '@/utils';

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  as?: string;
  /** React node on the left (ex. icon, text, component) */
  leftAddon?: React.ReactNode;
  /** React node on the left (ex. icon, text, component) */
  rightAddon?: React.ReactNode;
  /** Render input as invalid. Sets `aria-invalid` to true */
  isInvalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    isInvalid,
    size,
    as,
    type: typeProp,
    rightAddon,
    leftAddon,
    ...rest
  } = props;

  const Component = as ?? 'input';

  const type = getType(Component, typeProp);

  return (
    <div
      className={cx(
        className,
        'relative flex items-center rounded-lg border border-b-[3px] focus-within:-ml-[2px] focus-within:-mt-[2px] focus-within:border-[3px] focus-within:shadow',
        {
          'focus-within:border-blue-dark border-black': !isInvalid,
          'border-red focus-within:border-red': isInvalid,
          'w-fit': size != null,
          'w-full': size == null,
          'pl-4': leftAddon,
          'pr-4': rightAddon,
        },
      )}
    >
      {leftAddon}

      <Component
        aria-invalid={isInvalid}
        // @ts-expect-error figure out how to get ref working with an `as` prop
        ref={ref}
        className="focus:none placeholder-gray w-full rounded-lg border-none px-4 py-3.5 focus:outline-none"
        size={size}
        type={type}
        {...rest}
      />

      {rightAddon}
    </div>
  );
});

function getType(Component: string, type?: string) {
  if (type != null) return type;

  if (Component === 'input') return 'text';
}
