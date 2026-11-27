'use client';
import { TextField as GrunnmurenTextField } from '@obosbbl/grunnmuren-react';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';
import type { ComponentProps } from 'react';

import { firstErrorMessage } from '../first-error-message';

export type TextFieldProps = Omit<
  ComponentProps<typeof GrunnmurenTextField>,
  'name' | 'value' | 'onChange' | 'onBlur' | 'errorMessage'
>;

export function TextInput({ field, ...props }: TextFieldProps & { field: FieldWithValue<string> }) {
  return (
    <GrunnmurenTextField
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

export const TextField = getFormHookHelpers().fieldComponent.strict(TextInput, 'field');
