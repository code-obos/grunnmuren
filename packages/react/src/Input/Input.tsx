import { forwardRef } from 'react';
import { cx } from '@/utils';

export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'prefix'> {
  as?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** Render input as invalid. Sets `aria-invalid` to true */
  isInvalid?: boolean;

  /* TODO: implement validation */
  // valid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    isInvalid,
    size,
    prefix,
    suffix,
    as,
    type: typeProp,
    ...rest
  } = props;

  const Component = as ?? 'input';

  const type = getType(Component, typeProp);

  return (
    <div
      className={cx(
        className,
        'relative flex items-center rounded-md border-[1px] border-b-[3px] focus-within:-ml-[2px] focus-within:-mt-[2px] focus-within:border-[3px] focus-within:shadow',
        {
          'focus-within:border-blue-dark border-black': !isInvalid,
          'border-red focus-within:border-red': isInvalid,
          'w-fit': size != null,
          'w-full': size == null,
        },
      )}
    >
      {prefix}

      <Component
        aria-invalid={isInvalid}
        // @ts-expect-error figure out how to get ref working with an `as` prop
        ref={ref}
        className="focus:none placeholder-gray w-full rounded-md border-none px-4 py-3.5 outline-none"
        size={size}
        type={type}
        {...rest}
      />

      {suffix}
    </div>
  );
});

function getType(Component: string, type?: string) {
  if (type != null) return type;

  if (Component === 'input') return 'text';
}
