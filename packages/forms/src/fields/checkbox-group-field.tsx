'use client';
import { CheckboxGroup } from '@obosbbl/grunnmuren-react';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';
import type { ComponentProps } from 'react';

import { firstErrorMessage } from '../first-error-message';

export type CheckboxGroupFieldProps = Omit<
  ComponentProps<typeof CheckboxGroup>,
  'name' | 'value' | 'errorMessage' | 'validationBehavior'
>;

function CheckboxGroupInput({
  field,
  onChange,
  onBlur,
  ...props
}: CheckboxGroupFieldProps & { field: FieldWithValue<string[]> }) {
  return (
    <CheckboxGroup
      {...props}
      validationBehavior="aria"
      name={field.name}
      value={field.value}
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

export const CheckboxGroupField = getFormHookHelpers().fieldComponent.strict(
  CheckboxGroupInput,
  'field',
);
