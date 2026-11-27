'use client';
import { Button, Description, Label, UNSAFE_FileUpload } from '@obosbbl/grunnmuren-react';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';
import type { ComponentProps, ReactNode } from 'react';

import { firstErrorMessage } from '../first-error-message';
import { fieldTranslations } from '../translations';
import { useFormsLocale } from '../use-forms-locale';

type FileUploadProps = ComponentProps<typeof UNSAFE_FileUpload>;

export type FileFieldProps = Pick<
  FileUploadProps,
  'acceptedFileTypes' | 'allowsMultiple' | 'isRequired' | 'validate'
> & {
  label?: ReactNode;
  description?: ReactNode;
  /** Text on the upload button. */
  buttonText?: ReactNode;
};

export function FileInput({
  field,
  label,
  description,
  buttonText,
  ...props
}: FileFieldProps & { field: FieldWithValue<File[]> }) {
  const locale = useFormsLocale();
  const translations = fieldTranslations[locale].file;
  return (
    <UNSAFE_FileUpload
      {...props}
      validationBehavior="aria"
      name={field.name}
      files={field.value}
      onChange={(next) => {
        field.handleChange(typeof next === 'function' ? next(field.value) : next);
        // FileUpload has no onBlur, so mark the field as touched on every change.
        field.handleBlur();
      }}
      errorMessage={firstErrorMessage(field) ?? undefined}
    >
      <Label>{label ?? translations.label}</Label>
      {description && <Description>{description}</Description>}
      <Button className="w-fit" variant="secondary">
        {buttonText ?? translations.buttonText}
      </Button>
    </UNSAFE_FileUpload>
  );
}

export const FileField = getFormHookHelpers().fieldComponent.strict(FileInput, 'field');
