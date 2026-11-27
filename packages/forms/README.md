# @obosbbl/grunnmuren-forms

[![npm version](https://img.shields.io/npm/v/@obosbbl%2Fgrunnmuren-forms.svg)](https://www.npmjs.com/package/@obosbbl/grunnmuren-forms)

Form fields, validation schemas and an agent skill for apps using Grunnmuren. Built on [TanStack Form](https://tanstack.com/form) v2 (engine), [`@obosbbl/grunnmuren-react`](../react/) (inputs) and zod. Supports Norwegian (`nb`), Swedish (`sv`) and English (`en`) defaults and market rules, so a phone or national id field works the same in every app.

## Install

```sh
# npm
npm install @obosbbl/grunnmuren-forms

# pnpm
pnpm add @obosbbl/grunnmuren-forms
```

Peer dependencies, add the ones your app lacks: `@obosbbl/grunnmuren-react` (`^3.11.0`), `@tanstack/react-form` (exactly `2.0.0-alpha.3`), `react` (`^19`) and `zod` (`^4`).

### Tailwind

Tailwind (v4) needs to scan the package to generate the classes it uses:

```css
@source '../node_modules/@obosbbl/grunnmuren-forms/dist';
```

Adjust the relative path to where your stylesheet lives. See [`@obosbbl/grunnmuren-react`](../react/) for the rest of the Tailwind setup.

### Locale

Labels, field attributes and market rules come from the `locale` of `GrunnmurenProvider` (`nb`, `sv` or `en`, default `nb`), so the app must wrap its forms in one. `sv` follows the Swedish market (no +47 addon, personnummer); `nb` and `en` follow the Norwegian market. Multi-tenant apps that already set the provider's locale per site need nothing else.

## Usage

Create the hook once per app, at module level:

```tsx
// forms.ts
'use client';
import { createGrunnmurenFormHook } from '@obosbbl/grunnmuren-forms';

export const { useAppForm } = createGrunnmurenFormHook();
```

```ts
// schema.ts (server-safe)
import { email, mobileNumber } from '@obosbbl/grunnmuren-forms/schemas';
import { z } from 'zod';

// Use the same locale as GrunnmurenProvider
export const schema = z.object({
  email: email({ locale: 'nb' }),
  phone: mobileNumber({ locale: 'nb' }),
});
```

```tsx
// form.tsx
'use client';
import { useAppForm } from './forms';
import { schema } from './schema';

export function SignupForm() {
  const form = useAppForm({
    defaultValues: { email: '', phone: '' },
    validators: [{ run: schema, triggers: ['change', 'blur'] }],
    onSubmit: ({ validatorOutputs }) => {
      const [parsed] = validatorOutputs;
      console.log(parsed);
    },
  });

  return (
    <form.AppForm>
      <form.Form>
        <form.Field name="email">{(field) => <field.EmailField isRequired />}</form.Field>
        <form.Field name="phone">{(field) => <field.PhoneField isRequired />}</form.Field>
        <form.SubmitButton>Send</form.SubmitButton>
      </form.Form>
    </form.AppForm>
  );
}
```

## Fields and schemas

- Fields: `TextField`, `TextAreaField`, `NumberField`, `CheckboxField`, `CheckboxGroupField`, `RadioGroupField`, `SelectField`, `ComboboxField`, `DateField`, `FileField`, plus the domain fields `PhoneField`, `EmailField`, `FirstNameField`, `LastNameField`, `NationalIdNumberField` and `BirthDateField`.
- `NameFields`: returned by `createGrunnmurenFormHook()`, renders first and last name together: `<NameFields form={form} fields={{ firstName: 'firstName', lastName: 'lastName' }} />`.
- Schemas: `email`, `mobileNumber`, `phonePrefix`, `memberNumber`, `nationalIdNumber`, `birthDate`, `requiredText` and `file`, plus the `ACCEPTED_FILE_TYPES`, `MAXIMUM_FILE_SIZE` and `MAXIMUM_NUMBER_OF_FILES` constants.
- `email` follows the medlem rules: trimmed, lowercased, max 102 characters, and no æøå or `+`, on purpose.

## Entry points

- `@obosbbl/grunnmuren-forms`: hook factory, fields, form components. Client code.
- `@obosbbl/grunnmuren-forms/schemas`: zod schema factories only. No React or Grunnmuren imports and no `'use client'`, so it is safe to import from server code such as API routes and server actions. Factories take `{ locale }` explicitly, use the same locale as the provider.

## Agent skill

The package ships the `grunnmuren-forms` skill (`skills/grunnmuren-forms`) that teaches coding agents how to build forms with it. With pnpm, run `pnpm approve @obosbbl/grunnmuren-forms` (and approve `@tanstack/react-form` for its skills) to link them into your project.
