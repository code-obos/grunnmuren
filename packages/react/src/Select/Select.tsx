import { forwardRef, useRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import { cx } from '@/utils';
import { useFallbackId } from '@/hooks';
import { FormLabel, FormHelperText, FormErrorMessage } from '..';
import { useFormControlValidity } from '../hooks';
import { SelectPlain } from './SelectPlain';

export interface SelectProps
  extends Omit<React.ComponentPropsWithoutRef<'select'>, 'size'> {
  /**
   * Collection of <option />-elements
   */
  children: React.ReactNode;

  /** Help text for the form control */
  description?: React.ReactNode;

  /** Disables the built in HTML5 validation. If using custom validation for an entire form, consider setting `noValidate` on the form element instead. @default false */
  disableValidation?: boolean;

  /** Error message for the form control */
  error?: string;

  /**  Label for the form control */
  label: string;

  /**
   * Changes font-size, padding and gaps
   * @default medium
   */
  size?: 'medium' | 'small';
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const {
      description,
      error,
      id: idProp,
      label,
      disableValidation = false,
      ...rest
    } = props;

    const ownRef = useRef(null);
    const multiRef = useMergedRef(ownRef, ref);

    const { validity, validationMessage } = useFormControlValidity(
      ownRef,
      !disableValidation,
    );

    const id = useFallbackId(idProp);
    const helpTextId = id + 'help';
    const errorMsgId = id + 'err';

    const errorMsg = error || validationMessage;

    return (
      <div className="grid gap-2">
        <FormLabel
          htmlFor={id}
          isRequired={props.required}
          isInvalid={!!error || validity === 'invalid'}
        >
          {label}
        </FormLabel>

        {description && (
          <FormHelperText id={helpTextId}>{description}</FormHelperText>
        )}

        <SelectPlain
          id={id}
          ref={multiRef}
          {...rest}
          // for accessibility reasons these cannot be overriden
          isInvalid={!!error || validity === 'invalid'}
          aria-describedby={
            cx({
              [errorMsgId]: errorMsg,
              [helpTextId]: description,
            }) || undefined
          }
        />

        {errorMsg && (
          <FormErrorMessage id={errorMsgId}>{errorMsg}</FormErrorMessage>
        )}
      </div>
    );
  },
);
