'use client';
import { RadioGroup } from '@obosbbl/grunnmuren-react';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';
import type { ComponentProps } from 'react';

import { firstErrorMessage } from '../first-error-message';

export type RadioGroupFieldProps = Omit<
  ComponentProps<typeof RadioGroup>,
  'name' | 'value' | 'errorMessage' | 'validationBehavior'
>;

function RadioGroupInput({
  field,
  onChange,
  onBlur,
  ...props
}: RadioGroupFieldProps & { field: FieldWithValue<string> }) {
  return (
    <RadioGroup
      {...props}
      validationBehavior="aria"
      name={field.name}
      // '' means nothing selected, React Aria wants null for that
      value={field.value === '' ? null : field.value}
      onChange={(value) => {
        field.handleChange(value);
        onChange?.(value);
      }}
      onBlur={(event) => {
        field.handleBlur();
        onBlur?.(event);
      }}
      errorMessage={firstErrorMessage(field)}
    />
  );
}

export const RadioGroupField = getFormHookHelpers().fieldComponent.strict(RadioGroupInput, 'field');
