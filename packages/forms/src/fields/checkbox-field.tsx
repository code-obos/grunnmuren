'use client';
import { Checkbox } from '@obosbbl/grunnmuren-react';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';
import type { ComponentProps } from 'react';

import { firstErrorMessage } from '../first-error-message';

export type CheckboxFieldProps = Omit<
  ComponentProps<typeof Checkbox>,
  'name' | 'isSelected' | 'onChange' | 'onBlur' | 'errorMessage'
>;

function CheckboxInput({
  field,
  ...props
}: CheckboxFieldProps & { field: FieldWithValue<boolean> }) {
  return (
    <Checkbox
      {...props}
      validationBehavior="aria"
      name={field.name}
      isSelected={field.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      errorMessage={firstErrorMessage(field)}
    />
  );
}

export const CheckboxField = getFormHookHelpers().fieldComponent.strict(CheckboxInput, 'field');
