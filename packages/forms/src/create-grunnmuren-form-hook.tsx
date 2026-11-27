'use client';
import {
  type AnyReactFormApi,
  createErrorVisibility,
  createFormHook,
  type DefaultFormOptions,
  type ReactComponentTree,
} from '@tanstack/react-form';

import { CheckboxField } from './fields/checkbox-field';
import { CheckboxGroupField } from './fields/checkbox-group-field';
import { ComboboxField } from './fields/combobox-field';
import { DateField } from './fields/date-field';
import {
  BirthDateField,
  EmailField,
  FirstNameField,
  LastNameField,
  NationalIdNumberField,
  PhoneField,
} from './fields/domain-fields';
import { NumberField } from './fields/number-field';
import { RadioGroupField } from './fields/radio-group-field';
import { SelectField } from './fields/select-field';
import { TextAreaField } from './fields/text-area-field';
import { TextField } from './fields/text-field';
import { createFormComponents } from './form-components';

/** Same as react-hook-form's `onTouched`: errors show after first blur or a submit attempt. */
export const showAfterBlurOrSubmit = createErrorVisibility(
  ({ fieldState, state }) => fieldState.meta.isBlurred || state.submissionAttempts > 0,
);

const defaultFieldComponents = {
  TextField,
  TextAreaField,
  NumberField,
  CheckboxField,
  CheckboxGroupField,
  RadioGroupField,
  SelectField,
  ComboboxField,
  DateField,
  PhoneField,
  EmailField,
  FirstNameField,
  LastNameField,
  NationalIdNumberField,
  BirthDateField,
};

type DefaultFieldComponents = typeof defaultFieldComponents;
type DefaultFormComponents = ReturnType<typeof createFormComponents>;
/** Consumer components replace same-named defaults and keep their own types. */
type Overridden<TDefaults, TExtra> = Omit<TDefaults, keyof TExtra> & TExtra;

export type CreateGrunnmurenFormHookOptions<
  TFormComponents extends ReactComponentTree,
  TFieldComponents extends ReactComponentTree,
> = {
  /** Extra form components, or replacements for `Form` and `SubmitButton`. */
  formComponents?: TFormComponents;
  /** Extra field components, or replacements for the built-in ones. */
  fieldComponents?: TFieldComponents;
  defaultFormOptions?: DefaultFormOptions;
};

/** Call once at module level, never inside a component. The locale comes from GrunnmurenProvider. */
export function createGrunnmurenFormHook<
  const TFormComponents extends ReactComponentTree = Record<never, never>,
  const TFieldComponents extends ReactComponentTree = Record<never, never>,
>(options: CreateGrunnmurenFormHookOptions<TFormComponents, TFieldComponents> = {}) {
  // Assigned after createFormHook; it is only read while rendering.
  let readFormContext: () => AnyReactFormApi = () => {
    throw new Error('createGrunnmurenFormHook: form context read before the hook was created');
  };

  const hook = createFormHook({
    fieldComponents: {
      ...defaultFieldComponents,
      ...options.fieldComponents,
    } as unknown as Overridden<DefaultFieldComponents, TFieldComponents>,
    formComponents: {
      ...createFormComponents(() => readFormContext()),
      ...options.formComponents,
    } as unknown as Overridden<DefaultFormComponents, TFormComponents>,
    defaultFormOptions: {
      errorVisibility: showAfterBlurOrSubmit,
      ...options.defaultFormOptions,
    },
  });

  readFormContext = hook.useFormContext;
  return hook;
}
