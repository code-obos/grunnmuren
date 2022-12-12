import { forwardRef } from 'react';
import { cx } from '@/utils';
import { ChevronDown } from '@obosbbl/grunnmuren-icons';

export interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
  children: React.ReactNode;
  /** Render select as invalid. Sets `aria-invalid` to true */
  isInvalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { children, className, isInvalid, ...rest } = props;

    return (
      <div className={cx('relative', className)}>
        <select
          {...rest}
          className={cx(
            'w-full cursor-pointer appearance-none rounded-lg border border-b-[3px] border-solid bg-white px-4 py-3.5 focus:-mt-0.5 focus:-ml-0.5 focus:border-[3px] focus:shadow focus:outline-none',
            isInvalid
              ? 'border-red focus:border-red'
              : 'focus:border-blue-dark border-black',
          )}
          ref={ref}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute top-4 right-4" />
      </div>
    );
  },
);
