---
name: grunnmuren-forms
description: Use whenever you build, change or review a form, a form field (text, textarea, number, phone, email, first/last name, member number, file upload, fødselsnummer/personnummer, address/adresse autocomplete with c/o, date, birth date, select, combobox, checkbox, checkbox group, radio group) or form validation, or a multi-step form (stepper, steg, wizard, summary/oppsummering, progress indicator) in a React app that uses Grunnmuren (obos.no, obos.se, medlem-frontend and similar). Use @obosbbl/grunnmuren-forms, which wraps TanStack Form v2 and Grunnmuren with shared fields, zod schemas and nb/sv/en messages, instead of hand-wiring Grunnmuren inputs with useState, react-hook-form or plain TanStack fields. Covers install, GrunnmurenProvider locale, hook setup, complete forms with validation, submit and server errors, custom fields and common mistakes.
---

# Grunnmuren forms (`@obosbbl/grunnmuren-forms`)

Shared form layer for apps using Grunnmuren: TanStack Form v2 (engine) + Grunnmuren (inputs) + zod schema factories. The same field behaves and validates the same way in every app.

## When to use

- Any new or changed form, field or form validation in a React app that uses Grunnmuren.
- Reviewing a form that hand-wires Grunnmuren `TextField` with `useState`, or uses another form library: migrate it.
- Field catalog and schema signatures: `references/fields.md`. Read it before picking fields.

Address autocomplete is not in the package (private `@code-obos` dependency): see "Address fields".

## Install

```sh
pnpm add @obosbbl/grunnmuren-forms
```

Peer deps (add the ones the app lacks): `@tanstack/react-form` (exact `2.0.0-alpha.3`), `@obosbbl/grunnmuren-react` (`^3.11.0`), `react` 19, `zod` 4.

Then run `pnpm approve @obosbbl/grunnmuren-forms` (and approve `@tanstack/react-form` for its skills) so pnpm links the skills into the project. Tailwind must scan the package for class names, see the README.

## Locale

Labels, field attributes and market rules follow the `locale` of `GrunnmurenProvider` (`'nb' | 'sv' | 'en'`, default `'nb'`). The provider is required: the app must wrap forms in `GrunnmurenProvider` with the right locale.

- `sv` is the Swedish market (no +47 addon, personnummer, Swedish labels). `nb` and `en` are the Norwegian market (+47, fødselsnummer), with Norwegian or English labels.
- Multi-tenant apps (obos.no + obos.se) need nothing extra: they already set the provider's locale per site.
- `useFormsLocale()` (exported) returns the narrowed locale if a custom component needs it.
- Schema factories run outside React, so they take `{ locale }` explicitly. It must be the same locale as the provider, or labels and validation disagree.

## One-time setup

Create the hook once per app, at module level, in a client module. There is no locale option:

```tsx
// src/lib/forms.ts
'use client';
import { createGrunnmurenFormHook } from '@obosbbl/grunnmuren-forms';

export const { useAppForm, useFormContext, NameFields } = createGrunnmurenFormHook();
```

- Never call `createGrunnmurenFormHook` inside a component or render: it creates new component types every render and remounts all fields.
- Extra or replaced components go in options. Consumer entries win over same-named built-ins and keep their own types:

```tsx
import { createGrunnmurenFormHook } from '@obosbbl/grunnmuren-forms';
import type { ReactNode } from 'react';

// A Form that adds reCAPTCHA around submit
function Form({ children }: { children: ReactNode }) {
  const form = useFormContext();
  return (
    <form
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        await verifyRecaptcha();
        void form.handleSubmit();
      }}
    >
      <div className="grid max-w-[500px] gap-6">{children}</div>
    </form>
  );
}

export const { useAppForm, useFormContext } = createGrunnmurenFormHook({
  formComponents: { Form },
  // fieldComponents: { MyField },
});
```

`useFormContext` is only valid inside `form.AppForm`, and `Form` is rendered there, so reading it in a form component is fine. (The `useFormContext` above is the one exported from the same module; `Form` only runs at render time.)

By default errors show after a field's first blur or after a submit attempt (`showAfterBlurOrSubmit`, also exported). Override with `defaultFormOptions: { errorVisibility }` (see the `error-visibility-workflows` skill). Fields never contain visibility logic.

## Build a complete form

Schema in a server-safe module (can be imported by API routes). Use factories from `@obosbbl/grunnmuren-forms/schemas` for the typed fields and plain zod for the rest:

```ts
// src/app/no/kontakt/schema.ts  (no 'use client', no React)
import {
  email,
  file,
  memberNumber,
  mobileNumber,
  requiredText,
} from '@obosbbl/grunnmuren-forms/schemas';
import { z } from 'zod';

export const contactSchema = z.object({
  firstName: requiredText({ locale: 'nb', max: 50 }),
  lastName: requiredText({ locale: 'nb', max: 50 }),
  email: email({ locale: 'nb' }),
  phone: mobileNumber({ locale: 'nb' }),
  memberNumber: memberNumber({ locale: 'nb' }),
  attachments: file({ locale: 'nb' }),
  message: z.string().min(1, 'Du må skrive en melding.'),
  acceptTerms: z.literal(true, { error: 'Du må godta vilkårene.' }),
});
```

Form component:

```tsx
'use client';
import { NameFields, useAppForm } from '@/lib/forms';

import { contactSchema } from './schema';

export function ContactForm() {
  const form = useAppForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      memberNumber: '',
      attachments: [] as File[],
      message: '',
      acceptTerms: false,
    },
    validators: [{ run: contactSchema, triggers: ['change', 'blur'] }],
    onSubmit: async ({ validatorOutputs, createValidationError }) => {
      // Parsed output: trimmed, lowercased e-mail, whitespace-free phone
      const [contact] = validatorOutputs;
      const result = await sendContact(contact);
      if (result.kind === 'emailTaken') {
        return createValidationError({ fields: { email: 'E-posten er allerede i bruk.' } });
      }
    },
  });

  return (
    <form.AppForm>
      <form.Form>
        <NameFields form={form} />
        <form.Field name="email">{(field) => <field.EmailField isRequired />}</form.Field>
        <form.Field name="phone">{(field) => <field.PhoneField isRequired />}</form.Field>
        <form.Field name="memberNumber">
          {(field) => <field.TextField label="Medlemsnummer" inputMode="numeric" isRequired />}
        </form.Field>
        <form.Field name="attachments">{(field) => <field.FileField allowsMultiple />}</form.Field>
        <form.Field name="message">
          {(field) => <field.TextAreaField label="Melding" isRequired />}
        </form.Field>
        <form.Field name="acceptTerms">
          {(field) => <field.CheckboxField>Jeg godtar vilkårene</field.CheckboxField>}
        </form.Field>
        <form.SubmitButton>Send</form.SubmitButton>
      </form.Form>
    </form.AppForm>
  );
}
```

Rules:

- Fields are rendered as `<form.Field name="x">{(field) => <field.XxxField />}</form.Field>`. The field component name is checked against the type of `defaultValues.x`: `field.PhoneField` on a boolean is a type error.
- Wrap everything in `form.AppForm` (provides the form context for `form.Form` and `form.SubmitButton`).
- `form.Form` renders `<form noValidate>` with prevent-default + `form.handleSubmit()` and a `grid max-w-[500px] gap-6` wrapper. Props: `id`, `className` (replaces the grid class), `children`.
- `form.SubmitButton` is a Grunnmuren `Button type="submit"` that shows pending while submitting. Props are the Button props minus `type`, `isPending`, `href`.
- Validation: pass the whole zod object as one validator. Field errors are routed by issue path to the matching field. `triggers` lists when it runs (`'change'`, `'blur'`, ...).
- Submit with `validatorOutputs[0]` (parsed output, in validator order), never `value`: `value` is the raw editable state, so it still has spaces and original casing.
- Server errors: return `createValidationError({ fields: { name: 'message' } })` from `onSubmit`. Throw only for transient failures. For schema-shaped issues use `parseIssues`.
- `NameFields` (from the hook, see setup) renders first and last name together: `<NameFields form={form} fields={{ firstName: 'guardian.given', lastName: 'guardian.family' }} />`. `fields` is optional when the form has top-level `firstName` and `lastName`. Props: `isRequired` (default `true`), `autoComplete` (`false` drops `given-name`/`family-name`), `firstNameProps`, `lastNameProps`. Both values must be `string`.
- `FileField` has value `File[]` (`[] as File[]`) and wraps Grunnmuren `UNSAFE_FileUpload`. Pass `acceptedFileTypes`, `allowsMultiple`, `label`, `description`, `buttonText`. Validate with the `file({ locale })` schema (max 3 files, 5 MB each, jpg/png/pdf by default; `maxFiles`, `maxSize`, `acceptedTypes` override). Keep `acceptedFileTypes` in sync with `acceptedTypes`. Actually uploading is up to the app.
- `email` uses the medlem rules and rejects æøå and `+` on purpose, so addresses work in the member systems. Do not loosen it in the app. It also lowercases and trims, max 102 characters.
- Empty values per field type are in `references/fields.md`; `defaultValues` must use them.
- Every field takes the Grunnmuren props (`label`, `description`, `isRequired`, `isDisabled`, `className`, ...). Domain fields have a locale default for `label` and others; any prop you pass overrides it.
- Select, Combobox, RadioGroup and CheckboxGroup take children: `SelectItem`, `ComboboxItem`, `Radio` and `Checkbox`, all re-exported from `@obosbbl/grunnmuren-forms`.

Example: `<field.RadioGroupField label="Kontakt meg på"><Radio value="email">E-post</Radio>...</field.RadioGroupField>`, `<field.SelectField label="Fylke"><SelectItem id="oslo">Oslo</SelectItem>...`. Defaults: `contactBy: ''`, `county: ''`, `seats: null as number | null`.

For engine details (form options modes, `validatorOutputs`, error visibility, field groups, arrays, type errors) load the upstream skills instead of guessing: `react-form-composition-setup`, `schema-driven-forms`, `choosing-form-options-modes`, `error-visibility-workflows`, `reusable-form-policies`, `type-error-debugging`.

## Custom fields

First check `references/fields.md`: a field that more than one app needs belongs in the package (open a PR in `packages/forms` in the grunnmuren repo with the field, a test and a changeset), not in an app.

For an app-specific field, follow the package conventions exactly:

```tsx
'use client';
import { createGrunnmurenFormHook, firstErrorMessage } from '@obosbbl/grunnmuren-forms';
import { TextField } from '@obosbbl/grunnmuren-react';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';
import type { ComponentProps } from 'react';

type PostalCodeFieldProps = Omit<
  ComponentProps<typeof TextField>,
  'name' | 'value' | 'errorMessage' | 'validationBehavior'
>;

function PostalCodeInput({
  field,
  onChange,
  onBlur,
  ...props
}: PostalCodeFieldProps & { field: FieldWithValue<string> }) {
  return (
    <TextField
      label="Postnummer"
      inputMode="numeric"
      autoComplete="postal-code"
      size={4}
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

const PostalCodeField = getFormHookHelpers().fieldComponent.strict(PostalCodeInput, 'field');

export const { useAppForm } = createGrunnmurenFormHook({
  fieldComponents: { PostalCodeField },
});
```

Conventions:

- `fieldComponent.strict(Component, 'field')`: the second argument is the prop that receives the field; the value type of `FieldWithValue<T>` is what TanStack matches against `defaultValues`.
- Always `validationBehavior="aria"` (no native browser validation bubbles), `name={field.name}`, `errorMessage={firstErrorMessage(field)}`.
- `Omit` the props the field controls from the Grunnmuren props, so everything else passes through. Call the form's `handleChange`/`handleBlur` first, then the consumer's `onChange`/`onBlur`.
- Map between the form state and what React Aria wants in the field (`'' <-> null`, `null <-> NaN`), not in the form.
- No error-visibility logic: `field.errors` is already filtered by the form's `errorVisibility`.
- Register it via `fieldComponents` in `createGrunnmurenFormHook`, so it is typed like the built-ins.

## Multi-step forms

Stepper, wizard or steg flows use one `useAppForm` with one TanStack form group per step: `useFormSteps`, `FormStepper`, `StepForm` (Back/Next), `SummaryCard` and `SummaryItem`. Each Next validates only its own step and the summary submits everything. Read `references/stepper.md` for the complete 3-step example, per-step validation, edit from the summary, server errors, analytics hook points and receipt options. Do not use `form.Form` inside a step: it submits the whole form.

## Address fields

The package has no address field. The autocomplete is `@code-obos/grunnmuren-address-autocomplete`, private on GitHub Packages, so each app wires it in itself as a custom field with a zod schema, Swedish manual entry and c/o. Read `references/address-field.md` for the install (`.npmrc`, token, Tailwind `@source`), a complete `AddressField`, and the `key` remount that the uncontrolled component needs. Do not hand-roll it from the README.

## Form design rules

From the Grunnmuren reference form (`referanseskjema` in the docs) and grunnmuren.obos.no/skjemadesign. Follow them unless the design says otherwise.

- Single column, max 500px (`form.Form` does this). Related short fields may share a row (postal code + city). Width follows the expected input: phone `size={11}`, postal code `size={4}`, birth date `size={10}`.
- Label above the field, 1-3 words, normal capitalization, no colon. Never use `placeholder` as label or hint: put format hints in `description`.
- Mark optional fields with the label text `(valgfri)`, not asterisks. Required fields get `isRequired`.
- Errors show next to the field, on submit or when the user leaves the field, say what to fix ("E-postadressen mangler @"), never just "Ugyldig", and vanish when fixed. Do not rely on a banner at the top.
- Use the domain fields for phone (`type="tel"`, `+47` addon on nb), email, names, fødselsnummer (numeric keypad), birth date (native `type="date"`, value `yyyy-MM-dd`).
- When the data is about someone else (guardian, deceased, recipient), override `label` ("Foresattes mobil") and turn `autoComplete` off, so the browser does not fill in the user's own data.
- 2-6 options: `RadioGroupField` or `CheckboxGroupField`. `SelectField` only for many options.
- Consent checkboxes start unchecked (`false`), opt-in only.
- Submit button: an action verb ("Send inn", "Meld inn"), never "OK", "Ferdig" or "Klikk her". `form.SubmitButton` is `w-fit`. Multi-step forms use "Forrige" / "Neste" and an action verb on the last step.
- Ask only for data with a clear purpose, and pre-fill what you already know.
- Validation messages come from the factories in the right locale. Plain zod rules need your own messages in the same language.

## Overriding props

Every Grunnmuren prop passes through the fields and wins over the field's defaults (`<f.PhoneField label="Telefon" size={8} />`). `onChange`/`onBlur` (`onSelectionChange` on Select and Combobox) run after the form's own handlers, and get the raw Grunnmuren value (`NaN` for an empty NumberField, `null` for a cleared Select). `name`, `value`/`selectedKey`, `errorMessage` and `validationBehavior` are owned by the form: passing them is a type error. `form.Form` takes all `<form>` attributes; `onSubmit` runs before `handleSubmit`, and `className` styles the inner grid div.

## Common mistakes

- Wrong `defaultValues` type: `NumberField` needs `null as number | null` (not `0` or `''`), `SelectField`/`ComboboxField`/`RadioGroupField` need `''` for "none" (not `null`/`undefined`), `CheckboxGroupField` needs `string[]`, `CheckboxField` needs `boolean`, `FileField` needs `File[]`, `DateField`/`BirthDateField` need `''` or `yyyy-MM-dd`.
- No `GrunnmurenProvider` above the form: react-aria then uses the browser's language, so labels can come out in English, and in Swedish for `sv` browsers on a Norwegian site. Always wrap the app in `GrunnmurenProvider` with the site's locale.
- Calling `createGrunnmurenFormHook` inside a component or per render. Create it at module level, once.
- Importing the schema from a `'use client'` module or from `@obosbbl/grunnmuren-forms` in a server route. Schemas live in a plain module and come from `@obosbbl/grunnmuren-forms/schemas`, which has no React or Grunnmuren imports.
- Mixing locales: `mobileNumber({ locale: 'sv' })` under a `locale="nb"` provider gives Norwegian labels and Swedish rules. Use the provider's locale for the schema factories.
- Reading `value` in `onSubmit` instead of `validatorOutputs[0]`.
- Writing "show error after blur" logic in a field or checking `field.state.meta` yourself: use `errorVisibility`.
- Hand-wiring Grunnmuren `TextField` with `useState`, an `onBlur` flag and a validator function. Use the matching field plus a schema.
- Omitting `noValidate` by rendering your own `<form>`: native validation then competes with the form's messages. Use `form.Form`, or copy its `noValidate` + prevent-default when overriding it.
- Putting messages in the schema in one language and field labels in another. Factories and fields share the locale, plain zod rules need messages in the right language by hand.
- Adding `aria-hidden` or manual error `<p>` elements: Grunnmuren renders the message from `errorMessage`.
