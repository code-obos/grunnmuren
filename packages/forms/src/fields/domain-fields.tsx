'use client';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';
import { useId } from 'react';

import { marketFor } from '../locale';
import { fieldTranslations } from '../translations';
import { useFormsLocale } from '../use-forms-locale';
import { DateInput, type DateFieldProps } from './date-field';
import { TextInput, type TextFieldProps } from './text-field';

const { fieldComponent } = getFormHookHelpers();

type DomainProps = TextFieldProps & { field: FieldWithValue<string> };

// Defaults go first so every prop stays overridable by the consumer.
function PhoneInput({ field, ...props }: DomainProps) {
  const locale = useFormsLocale();
  const isNorwegian = marketFor(locale) === 'no';
  return (
    <TextInput
      label={fieldTranslations[locale].phone.label}
      type="tel"
      inputMode="tel"
      autoComplete="tel-national"
      size={11}
      leftAddon={isNorwegian ? '+47' : undefined}
      withAddonDivider={isNorwegian}
      {...props}
      field={field}
    />
  );
}

function EmailInput({ field, ...props }: DomainProps) {
  const locale = useFormsLocale();
  return (
    <TextInput
      label={fieldTranslations[locale].email.label}
      type="email"
      autoComplete="email"
      {...props}
      field={field}
    />
  );
}

export function FirstNameInput({ field, ...props }: DomainProps) {
  const locale = useFormsLocale();
  return (
    <TextInput
      label={fieldTranslations[locale].firstName.label}
      autoComplete="given-name"
      {...props}
      field={field}
    />
  );
}

export function LastNameInput({ field, ...props }: DomainProps) {
  const locale = useFormsLocale();
  return (
    <TextInput
      label={fieldTranslations[locale].lastName.label}
      autoComplete="family-name"
      {...props}
      field={field}
    />
  );
}

function NationalIdNumberInput({ field, ...props }: DomainProps) {
  const locale = useFormsLocale();
  const isNorwegian = marketFor(locale) === 'no';
  const { label, description } = fieldTranslations[locale].nationalIdNumber;
  return (
    <TextInput
      label={label}
      description={description}
      autoComplete="off"
      size={isNorwegian ? 12 : 13}
      inputMode={isNorwegian ? 'numeric' : undefined}
      {...props}
      field={field}
    />
  );
}

function BirthDateInput({
  field,
  className,
  ...props
}: DateFieldProps & { field: FieldWithValue<string> }) {
  const locale = useFormsLocale();
  const hintId = useId();
  return (
    <>
      <DateInput
        label={fieldTranslations[locale].birthDate.label}
        autoComplete="bday"
        size={10}
        // Tells screen reader users this is a date picker, not just a date to read out.
        aria-describedby={hintId}
        className={['[&>input]:w-fit [&>input]:min-w-32', className].filter(Boolean).join(' ')}
        {...props}
        field={field}
      />
      <span id={hintId} className="sr-only">
        {fieldTranslations[locale].birthDate.hint}
      </span>
    </>
  );
}

export const PhoneField = fieldComponent.strict(PhoneInput, 'field');
export const EmailField = fieldComponent.strict(EmailInput, 'field');
export const FirstNameField = fieldComponent.strict(FirstNameInput, 'field');
export const LastNameField = fieldComponent.strict(LastNameInput, 'field');
export const NationalIdNumberField = fieldComponent.strict(NationalIdNumberInput, 'field');
export const BirthDateField = fieldComponent.strict(BirthDateInput, 'field');
