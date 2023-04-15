import { forwardRef } from 'react';
import { ChevronDown } from '@obosbbl/grunnmuren-icons';
import { cx } from '@/utils';

export interface SelectPlainProps
  extends Omit<React.ComponentPropsWithoutRef<'select'>, 'size'> {
  /**
   * Collection of <option />-elements
   */
  children: React.ReactNode;

  /** Render select as invalid. Sets `aria-invalid` to true */
  isInvalid?: boolean;

  /**
   * Changes font-size, padding and gaps
   * @default medium
   */
  size?: 'medium' | 'small';
}

export const SelectPlain = forwardRef<HTMLSelectElement, SelectPlainProps>(
  (props, ref) => {
    const { children, className, isInvalid, size, ...rest } = props;

    const isSmall = size === 'small';

    return (
      <div className={cx(className, 'relative', isSmall && 'text-sm')}>
        <select
          aria-invalid={isInvalid}
          {...rest}
          className={cx(
            'w-full cursor-pointer appearance-none border border-b-[3px] bg-white focus:-ml-0.5 focus:-mt-0.5 focus:border-[3px] focus:shadow focus:outline-none',
            isSmall ? 'rounded px-3.5 py-2' : 'rounded-lg px-4 py-3.5',
            isInvalid
              ? 'border-red focus:border-red'
              : 'focus:border-blue-dark border-black',
          )}
          ref={ref}
        >
          {children}
        </select>
        <ChevronDown
          className={cx(
            'pointer-events-none absolute bottom-0 top-0 my-auto',
            isSmall ? 'right-3.5' : 'right-4',
          )}
        />
      </div>
    );
  },
);
