'use client';
import { TextArea } from '@obosbbl/grunnmuren-react';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';
import type { ComponentProps } from 'react';

import { firstErrorMessage } from '../first-error-message';

export type TextAreaFieldProps = Omit<
  ComponentProps<typeof TextArea>,
  'name' | 'value' | 'errorMessage' | 'validationBehavior'
>;

function TextAreaInput({
  field,
  onChange,
  onBlur,
  ...props
}: TextAreaFieldProps & { field: FieldWithValue<string> }) {
  return (
    <TextArea
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

export const TextAreaField = getFormHookHelpers().fieldComponent.strict(TextAreaInput, 'field');
