import { forwardRef } from 'react';
import classNames from 'clsx';

/**
 * CSS inspired by https://moderncss.dev/pure-css-custom-checkbox-style/
 */

export interface CheckboxProps extends React.ComponentPropsWithRef<'input'> {
  children: React.ReactNode;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { children, className, ...rest } = props;

    return (
      <label
        className={classNames(
          className,
          'inline-flex cursor-pointer items-center',
        )}
      >
        <input
          className="checkbox border-gray-dark checked:bg-green checked:border-green mr-3 grid h-[1.25em] w-[1.25em] cursor-pointer appearance-none place-content-center rounded border-2 border-solid bg-white text-white focus:outline-none focus:ring-2 focus:ring-black"
          ref={ref}
          type="checkbox"
          {...rest}
        />
        {children}
      </label>
    );
  },
);
