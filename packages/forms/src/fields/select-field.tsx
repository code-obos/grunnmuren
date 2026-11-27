'use client';
import { Select, type SelectProps } from '@obosbbl/grunnmuren-react';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';

import { firstErrorMessage } from '../first-error-message';

export type SelectFieldProps = Omit<
  SelectProps<object>,
  'name' | 'selectedKey' | 'defaultSelectedKey' | 'onSelectionChange' | 'onBlur' | 'errorMessage'
>;

function SelectInput({ field, ...props }: SelectFieldProps & { field: FieldWithValue<string> }) {
  return (
    <Select
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

export const SelectField = getFormHookHelpers().fieldComponent.strict(SelectInput, 'field');
