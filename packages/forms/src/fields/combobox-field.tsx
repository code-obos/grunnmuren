'use client';
import { Combobox, type ComboboxProps } from '@obosbbl/grunnmuren-react';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';

import { firstErrorMessage } from '../first-error-message';

export type ComboboxFieldProps = Omit<
  ComboboxProps<object>,
  'name' | 'selectedKey' | 'defaultSelectedKey' | 'onSelectionChange' | 'onBlur' | 'errorMessage'
>;

function ComboboxInput({
  field,
  ...props
}: ComboboxFieldProps & { field: FieldWithValue<string> }) {
  return (
    <Combobox
      {...props}
      validationBehavior="aria"
      name={field.name}
      // '' means nothing selected, React Aria wants null for that
      selectedKey={field.value === '' ? null : field.value}
      onSelectionChange={(key) => field.handleChange(key == null ? '' : String(key))}
      onBlur={field.handleBlur}
      errorMessage={firstErrorMessage(field)}
    />
  );
}

export const ComboboxField = getFormHookHelpers().fieldComponent.strict(ComboboxInput, 'field');
