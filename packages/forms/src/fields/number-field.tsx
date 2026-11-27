'use client';
import { NumberField as GrunnmurenNumberField } from '@obosbbl/grunnmuren-react';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';
import type { ComponentProps } from 'react';

import { firstErrorMessage } from '../first-error-message';

export type NumberFieldProps = Omit<
  ComponentProps<typeof GrunnmurenNumberField>,
  'name' | 'value' | 'errorMessage' | 'validationBehavior'
>;

function NumberInput({
  field,
  onChange,
  onBlur,
  ...props
}: NumberFieldProps & { field: FieldWithValue<number | null> }) {
  return (
    <GrunnmurenNumberField
      {...props}
      validationBehavior="aria"
      name={field.name}
      // React Aria uses NaN for "empty", the form state uses null
      value={field.value ?? Number.NaN}
      onChange={(value) => {
        field.handleChange(Number.isNaN(value) ? null : value);
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

export const NumberField = getFormHookHelpers().fieldComponent.strict(NumberInput, 'field');
