'use client';
import { Checkbox } from '@obosbbl/grunnmuren-react';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';
import type { ComponentProps } from 'react';

import { firstErrorMessage } from '../first-error-message';

export type CheckboxFieldProps = Omit<
  ComponentProps<typeof Checkbox>,
  'name' | 'isSelected' | 'errorMessage' | 'validationBehavior'
>;

function CheckboxInput({
  field,
  onChange,
  onBlur,
  ...props
}: CheckboxFieldProps & { field: FieldWithValue<boolean> }) {
  return (
    <Checkbox
      {...props}
      validationBehavior="aria"
      name={field.name}
      isSelected={field.value}
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

export const CheckboxField = getFormHookHelpers().fieldComponent.strict(CheckboxInput, 'field');
