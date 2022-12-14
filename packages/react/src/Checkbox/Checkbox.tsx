import { forwardRef, useRef } from 'react';
import { cx } from '@/utils';
import { useFallbackId, useFormControlValidity } from '@/hooks';

import { FormErrorMessage } from '..';

/**
 * CSS inspired by https://moderncss.dev/pure-css-custom-checkbox-style/
 */

export interface CheckboxProps extends React.ComponentPropsWithRef<'input'> {
  children: React.ReactNode;
  className?: string;
  /** Error message for the form control */
  error?: string;

  /** Disables the built in HTML5 validation. If using custom validation for an entire form, consider setting `noValidate` on the form element instead. @default false */
  disableValidation?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      children,
      className,
      error,
      id: idProp,
      disableValidation = false,
      ...rest
    } = props;

    const ownRef = useRef(null);

    const { validity, validationMessage } = useFormControlValidity(
      ownRef,
      !disableValidation,
    );

    const id = useFallbackId(idProp);
    const errorMsgId = id + 'err';

    const errorMsg = error || validationMessage;

    return (
      <div className="grid gap-2">
        <label className={cx(className, 'flex cursor-pointer gap-2.5')}>
          <input
            id={id}
            className={cx(
              'checkbox checked:bg-green checked:border-green grid h-[1.25em] w-[1.25em] flex-none translate-y-[0.1em] cursor-pointer appearance-none place-content-center rounded border-2 border-solid bg-white text-white focus:outline-none focus:ring-2',
              {
                'border-gray-dark focus:ring-black': !error,
                'border-red focus:ring-red': !!error,
              },
            )}
            ref={ref}
            type="checkbox"
            {...rest}
            aria-describedby={errorMsg ? errorMsgId : undefined}
            aria-invalid={!!error || validity === 'invalid'}
          />
          {children}
        </label>
        {errorMsg && (
          <FormErrorMessage id={errorMsgId}>{errorMsg}</FormErrorMessage>
        )}
      </div>
    );
  },
);
