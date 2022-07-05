import { forwardRef } from 'react';
import classNames from 'clsx';
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
          className={classNames(
            className,
            'inline-flex cursor-pointer items-center',
          )}
        >
          <input
            id={id}
            className={classNames(
              'checkbox checked:bg-green checked:border-green bg-whit mr-3 grid h-[1.25em] w-[1.25em] cursor-pointer appearance-none place-content-center rounded border-2 border-solid text-white focus:outline-none focus:ring-2',
              {
                'border-gray-dark focus:ring-black': !error,
                'border-red focus:ring-red': !!error,
              },
            )}
            ref={ref}
            type="checkbox"
            {...rest}
            aria-describedby={classNames({
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
