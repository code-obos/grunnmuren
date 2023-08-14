import { useMemo, useCallback, forwardRef } from 'react';
import { cx } from '@/utils';
import { useFallbackId } from '@/hooks';
import { FormHelperText, FormLabel, FormErrorMessage } from '../';
import { RadioContext } from './RadioContext';

export interface RadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** The value of the radio button to be initially selected. For uncontrolled usage */
  defaultValue?: string;

  /** Help text for the radio group. */
  description?: React.ReactNode;

  /** Error message for the form control */
  error?: string;

  /** The `name` attribute for the radio buttons. */
  name: string;

  /** The label for the radio group. */
  label?: string;

  /** Event handler called when the value changes. */
  onChange?(value: string): void;

  /** Whether a value selection is required. */
  required?: boolean;

  /** The value of the selected radio button. For controlled usage */
  value?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (props, ref) => {
    const isControlled = 'value' in props;

    const {
      className,
      defaultValue,
      description,
      error,
      id: idProp,
      children,
      label,
      name,
      onChange: onChangeProp,
      required,
      value,
      ...rest
    } = props;

    const onChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.value;
        onChangeProp?.(nextValue);
      },
      [onChangeProp],
    );

    const group = useMemo(
      () => ({
        defaultValue,
        isControlled,
        name,
        onChange,
        required,
        value,
        error: Boolean(error),
      }),
      [defaultValue, isControlled, name, onChange, required, value, error],
    );

    const groupId = useFallbackId(idProp);
    const labelId = `${groupId}:label`;
    const helpTextId = `${groupId}:help`;
    const errorMsgId = groupId + 'err';

    const errorMsg = error;

    return (
      <RadioContext.Provider value={group}>
        <div
          aria-describedby={
            cx({
              [errorMsgId]: errorMsg,
              [helpTextId]: description,
            }) || undefined
          }
          aria-invalid={!!error}
          aria-labelledby={label ? labelId : undefined}
          className={cx(className, 'flex flex-col gap-4')}
          role="radiogroup"
          ref={ref}
          {...rest}
        >
          {label && (
            <FormLabel id={labelId} isRequired={required} isInvalid={!!error}>
              {label}
            </FormLabel>
          )}

          {description && (
            <FormHelperText id={helpTextId}>{description}</FormHelperText>
          )}

          {children}

          {errorMsg && (
            <FormErrorMessage id={errorMsgId}>{errorMsg}</FormErrorMessage>
          )}
        </div>
      </RadioContext.Provider>
    );
  },
);