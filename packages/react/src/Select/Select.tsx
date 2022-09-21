import { forwardRef } from 'react';
import { cx } from '@/utils';
import { ChevronDown } from '@obosbbl/grunnmuren-icons';

export interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { children, className, ...rest } = props;

    return (
      <div className={cx('relative', className)}>
        <select
          {...rest}
          className="focus:border-blue border-gray-dark w-full appearance-none rounded-lg border-2 border-solid bg-white px-4 py-3 focus:outline-none"
          ref={ref}
        >
          {children}
        </select>
        <ChevronDown className="absolute top-4 right-4" />
      </div>
    );
  },
);
