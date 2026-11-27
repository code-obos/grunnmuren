'use client';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';

import { TextInput, type TextFieldProps } from './text-field';

export type DateFieldProps = Omit<TextFieldProps, 'type'>;

/** The native date input, so the value is always a `yyyy-MM-dd` string. */
export function DateInput({ field, ...props }: DateFieldProps & { field: FieldWithValue<string> }) {
  return <TextInput {...props} type="date" field={field} />;
}

export const DateField = getFormHookHelpers().fieldComponent.strict(DateInput, 'field');
