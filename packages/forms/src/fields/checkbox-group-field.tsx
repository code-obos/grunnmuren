'use client';
import { CheckboxGroup } from '@obosbbl/grunnmuren-react';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';
import type { ComponentProps } from 'react';

import { firstErrorMessage } from '../first-error-message';

export type CheckboxGroupFieldProps = Omit<
  ComponentProps<typeof CheckboxGroup>,
  'name' | 'value' | 'onChange' | 'onBlur' | 'errorMessage'
>;

function CheckboxGroupInput({
  field,
  ...props
}: CheckboxGroupFieldProps & { field: FieldWithValue<string[]> }) {
  return (
    <CheckboxGroup
      {...props}
      validationBehavior="aria"
      name={field.name}
      value={field.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      errorMessage={firstErrorMessage(field)}
    />
  );
}

export const CheckboxGroupField = getFormHookHelpers().fieldComponent.strict(
  CheckboxGroupInput,
  'field',
);
