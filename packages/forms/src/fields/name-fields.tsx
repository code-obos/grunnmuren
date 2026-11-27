'use client';
import type { DefineFieldGroupFn, ReactComponentTree } from '@tanstack/react-form';
import type { ComponentType } from 'react';

import type { TextFieldProps } from './text-field';

type NameFieldComponents = {
  FirstNameField: ComponentType<TextFieldProps>;
  LastNameField: ComponentType<TextFieldProps>;
};

export type NameFieldsProps = {
  /** Applies to both inputs. Defaults to `true`. */
  isRequired?: boolean;
  /** Set to `false` to drop the `given-name` / `family-name` autocomplete hints. */
  autoComplete?: boolean;
  firstNameProps?: TextFieldProps;
  lastNameProps?: TextFieldProps;
};

/**
 * Builds the `NameFields` field group from the hook's `defineAppFieldGroup`, so it renders
 * the hook's own (possibly overridden) `FirstNameField` and `LastNameField`.
 */
export function createNameFields<TFieldComponents extends ReactComponentTree>(
  defineAppFieldGroup: DefineFieldGroupFn<TFieldComponents>,
) {
  const nameFieldGroup = defineAppFieldGroup(({ strict }) => ({
    firstName: strict<string>(),
    lastName: strict<string>(),
  }));

  function NameFieldsImpl({
    fields,
    isRequired = true,
    autoComplete = true,
    firstNameProps,
    lastNameProps,
  }: NameFieldsProps & { fields: typeof nameFieldGroup.fields }) {
    return (
      <>
        <fields.Field name="firstName">
          {(field) => {
            const { FirstNameField } = field as unknown as NameFieldComponents;
            return (
              <FirstNameField
                isRequired={isRequired}
                autoComplete={autoComplete ? 'given-name' : undefined}
                {...firstNameProps}
              />
            );
          }}
        </fields.Field>
        <fields.Field name="lastName">
          {(field) => {
            const { LastNameField } = field as unknown as NameFieldComponents;
            return (
              <LastNameField
                isRequired={isRequired}
                autoComplete={autoComplete ? 'family-name' : undefined}
                {...lastNameProps}
              />
            );
          }}
        </fields.Field>
      </>
    );
  }

  return nameFieldGroup.bindComponent(NameFieldsImpl, 'fields');
}
