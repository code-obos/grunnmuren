import { forwardRef } from 'react';
import { cx } from '@/utils';
import { FormErrorMessage, useFallbackId } from '..';

/**
 * CSS inspired by https://moderncss.dev/pure-css-custom-checkbox-style/
 */

export interface CheckboxProps extends React.ComponentPropsWithRef<'input'> {
  children: React.ReactNode;
  className?: string;
  /** Error message for the form control */
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { children, className, error, id: idProp, ...rest } = props;

    const id = useFallbackId(idProp);
    const errorMsgId = id + 'err';

    return (
      <div className="grid gap-2">
        <label
          className={cx(className, 'inline-flex cursor-pointer items-center')}
        >
          <input
            id={id}
            className={cx(
              'checkbox checked:bg-green checked:border-green mr-3 grid h-[1.25em] w-[1.25em] flex-none cursor-pointer appearance-none place-content-center rounded border-2 border-solid bg-white text-white focus:outline-none focus:ring-2',
              {
                'border-gray-dark focus:ring-black': !error,
                'border-red focus:ring-red': !!error,
              },
            )}
            ref={ref}
            type="checkbox"
            {...rest}
            aria-describedby={cx({
              [errorMsgId]: !!error,
            })}
            aria-invalid={!!error}
          />
          {children}
        </label>
        {!!error && (
          <FormErrorMessage id={errorMsgId}>{error}</FormErrorMessage>
        )}
      </div>
    );
  },
);
