import { forwardRef } from 'react';
import { cx } from '@/utils';

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  as?: string;
  prefix?: string;
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
          'border-gray-dark focus-within:border-blue': !isInvalid,
          'border-red focus-within:border-red': isInvalid,
          'w-fit': size != null,
          'w-full': size == null,
        },
      )}
    >
      {prefix && <span className="text-gray pl-4">{prefix}</span>}
      <Component
        aria-invalid={isInvalid}
        // @ts-expect-error figure out how to get ref working with an `as` prop
        ref={ref}
        className="focus:none placeholder-gray w-full rounded-md border-none px-4 py-3 outline-none"
        size={size}
        type={type}
        {...rest}
      />
      {/* {valid && <Icon className="text-green absolute right-1" name="check" />} */}
    </div>
  );
});

function getType(Component: string, type?: string) {
  if (type != null) return type;

  if (Component === 'input') return 'text';
}
