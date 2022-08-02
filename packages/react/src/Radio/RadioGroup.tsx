import { useMemo, useId, useCallback } from 'react';
import classNames from 'clsx';
import { RadioContext } from './RadioContext';
import { FormHelperText, FormLabel } from '../';

export interface RadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** The value of the radio button to be initially selected. For uncontrolled usage */
  defaultValue?: string;
  /** Help text for the radio group. */
  description?: string;
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

export const RadioGroup = (props: RadioGroupProps) => {
  const isControlled = 'value' in props;

  const {
    className,
    defaultValue,
    description,
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
    }),
    [defaultValue, isControlled, name, onChange, required, value],
  );

  const groupId = useId();
  const labelId = `${groupId}:label`;
  const helpId = `${groupId}:help`;

  return (
    <RadioContext.Provider value={group}>
      <div
        aria-describedby={description ? helpId : undefined}
        aria-labelledby={label ? labelId : undefined}
        className={classNames(className, 'flex flex-col gap-4')}
        role="radiogroup"
        {...rest}
      >
        {label && (
          <FormLabel id={labelId} isRequired={required}>
            {label}
          </FormLabel>
        )}
        {children}
        <FormHelperText id={helpId}>{description}</FormHelperText>
      </div>
    </RadioContext.Provider>
  );
};
