# Field and schema reference

All fields are used as `<form.Field name="x">{(field) => <field.Key />}</form.Field>`. Every field accepts the props of the Grunnmuren component underneath, minus the ones it controls (`name`, value/change props, `onBlur`, `errorMessage`). All set `validationBehavior="aria"`, `name`, `onBlur`, and show the first error message.

The key must match the type of `defaultValues.x`.

## Generic fields

| Key                  | Grunnmuren              | Value type               | Empty value in `defaultValues` | Notes                                                                                         |
| -------------------- | ----------------------- | ------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------- |
| `TextField`          | `TextField`             | `string`                 | `''`                           | `label`, `description`, `type`, `leftAddon`, `size`, `inputMode`, `autoComplete` pass through |
| `TextAreaField`      | `TextArea`              | `string`                 | `''`                           |                                                                                               |
| `NumberField`        | `NumberField`           | `number \| null`         | `null as number \| null`       | NaN from React Aria becomes `null`                                                            |
| `CheckboxField`      | `Checkbox`              | `boolean`                | `false`                        | children = label; `isSelected` controlled                                                     |
| `CheckboxGroupField` | `CheckboxGroup`         | `string[]`               | `[]`                           | children: `Checkbox value="..."`                                                              |
| `RadioGroupField`    | `RadioGroup`            | `string`                 | `''` (none selected)           | children: `Radio value="..."`                                                                 |
| `SelectField`        | `Select`                | `string`                 | `''` (none selected)           | children: `SelectItem id="..."`; value = selected id                                          |
| `ComboboxField`      | `Combobox`              | `string`                 | `''` (none selected)           | children: `ComboboxItem id="..."`; value = selected id                                        |
| `DateField`          | `TextField type="date"` | `string` as `yyyy-MM-dd` | `''`                           | `type` cannot be overridden                                                                   |

Item components are exported from `@obosbbl/grunnmuren-forms`: `Radio`, `SelectItem`, `ComboboxItem`, `Checkbox`.

Select/Combobox props are Grunnmuren's `SelectProps<object>` / `ComboboxProps<object>` minus `selectedKey`, `defaultSelectedKey`, `onSelectionChange`.

## Domain fields

Built on `TextField` (value `string`, empty `''`). Labels and attributes follow the `GrunnmurenProvider` locale. All defaults go first, so any prop you pass overrides them (including `label`).

Market: `sv` is Sweden, `nb` and `en` are Norway.

| Key                     | Locale | label                      | Other defaults                                                                                                     |
| ----------------------- | ------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `PhoneField`            | nb     | `Mobil`                    | `type="tel"`, `inputMode="tel"`, `autoComplete="tel-national"`, `size={11}`, `leftAddon="+47"`, `withAddonDivider` |
|                         | en     | `Mobile number`            | same as nb                                                                                                         |
|                         | sv     | `Mobilnummer`              | same, but no addon and no divider                                                                                  |
| `EmailField`            | nb     | `E-post`                   | `type="email"`, `autoComplete="email"`                                                                             |
|                         | sv     | `E-post`                   | same                                                                                                               |
|                         | en     | `E-mail`                   | same                                                                                                               |
| `FirstNameField`        | nb     | `Fornavn og mellomnavn`    | `autoComplete="given-name"`                                                                                        |
|                         | sv     | `Förnamn`                  | same                                                                                                               |
|                         | en     | `First and middle name`    | same                                                                                                               |
| `LastNameField`         | nb     | `Etternavn`                | `autoComplete="family-name"`                                                                                       |
|                         | sv     | `Efternamn`                | same                                                                                                               |
|                         | en     | `Last name`                | same                                                                                                               |
| `NationalIdNumberField` | nb     | `Fødselsnummer`            | `description="11 siffer"`, `autoComplete="off"`, `size={12}`, `inputMode="numeric"`                                |
|                         | en     | `National identity number` | `description="11 digits"`, otherwise as nb                                                                         |
|                         | sv     | `Personnummer`             | `description="ÅÅÅÅMMDD-XXXX"`, `autoComplete="off"`, `size={13}`, no `inputMode`                                   |
| `BirthDateField`        | nb     | `Fødselsdato`              | native date input (`yyyy-MM-dd`), `autoComplete="bday"`                                                            |
|                         | sv     | `Födelsedatum`             | same                                                                                                               |
|                         | en     | `Date of birth`            | same                                                                                                               |

Pair them with the schema factories below, with the same locale as the provider.

## Form components

- `form.Form` (props `id?`, `className?`, `children`): `<form noValidate>`, prevent-default, `form.handleSubmit()`, children in a `grid gap-6 md:gap-8` div.
- `form.SubmitButton`: Grunnmuren `Button type="submit"`, pending while `isSubmitting`. Props: Button props minus `type`, `isPending`, `href`.

## Other exports

`@obosbbl/grunnmuren-forms`: `createGrunnmurenFormHook`, `showAfterBlurOrSubmit`, `firstErrorMessage(field)`, `useFormsLocale()`, `Checkbox`, `ComboboxItem`, `Radio`, `SelectItem`, types `Locale` (`'nb' | 'sv' | 'en'`), `Market` (`'no' | 'se'`), `CreateGrunnmurenFormHookOptions`, `FormProps`, `SubmitButtonProps`.

`createGrunnmurenFormHook({ formComponents?, fieldComponents?, defaultFormOptions? })` returns TanStack's `createFormHook` result (`useAppForm`, `useFormContext`, `withForm`, ...). There is no locale option: it comes from `GrunnmurenProvider`. Defaults: `errorVisibility: showAfterBlurOrSubmit` (errors after first blur or a submit attempt).

## Schema factories (`@obosbbl/grunnmuren-forms/schemas`)

Server-safe, zod 4, Standard Schema compatible. Each takes `locale: 'nb' | 'sv' | 'en'` (the same as the provider) and returns a zod schema from `string` input to `string` output. Also exports the `Locale` type. Missing, empty or whitespace-only input gives the `required` message. Validation aborts after the first failing rule, so one message at a time. Output is the transformed value: read it from `validatorOutputs`.

| Factory            | Signature                     | Transform             | Rules                                                                                                                                                                                                         |
| ------------------ | ----------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mobileNumber`     | `({ locale })`                | strips all whitespace | nb, en: `/^[49]\d{7}$/` (8 digits, starts with 4 or 9, no `+47`). sv: `/^07[02369]\d{7}$/`                                                                                                                    |
| `email`            | `({ locale })`                | trim + lowercase      | `z.email()`, max 254 chars                                                                                                                                                                                    |
| `nationalIdNumber` | `({ locale, allowDNumber? })` | strips all whitespace | nb, en: valid fødselsnummer (`@navikt/fnrvalidator`), d-nummer only with `allowDNumber: true` (also changes the message to mention d-nummer). sv: valid personnummer (`personnummer`), `allowDNumber` ignored |
| `requiredText`     | `({ locale, max? })`          | trim                  | min 1, optional max on the trimmed value                                                                                                                                                                      |
| `birthDate`        | `({ locale, minimumAge? })`   | trim                  | `yyyy-MM-dd`, a real date, not in the future (local date), not before 1900, optionally at least `minimumAge` years ago                                                                                        |

Messages (nb / sv / en):

- `mobileNumber`: `Du må fylle ut mobilnummer.` / `Du må fylle ut et gyldig mobilnummer.` | `Du måste fylla i mobilnummer.` / `Du måste fylla i ett giltigt mobilnummer.` | `Please enter a mobile number.` / `Please enter a valid mobile number.`
- `email`: `Du må fylle ut e-post.` / `Du må fylle ut en gyldig e-post.` / `E-posten er for lang. Maks lengde er 254 tegn.` | `Du måste fylla i e-post.` / `Du måste fylla i en giltig e-postadress.` / `E-postadressen är för lång. Max längd är 254 tecken.` | `Please enter an email address.` / `Please enter a valid email address.` / `The email address is too long. The maximum length is 254 characters.`
- `nationalIdNumber`: `Du må fylle ut fødselsnummer.` / `Du må fylle ut et gyldig fødselsnummer.` (or `... fødselsnummer eller d-nummer.`) | `Du måste fylla i personnummer.` / `Du måste fylla i ett giltigt personnummer.` | `Please enter a national identity number.` / `Please enter a valid national identity number.` (or `... number or D number.`)
- `requiredText`: `Du må fylle ut dette feltet.` / `Maks lengde er {max} tegn.` | `Du måste fylla i det här fältet.` / `Max {max} tecken.` | `Please fill in this field.` / `The maximum length is {max} characters.`
- `birthDate`: nb required `Du må fylle ut en dato.`, invalid `Du må fylle ut en gyldig dato.`, future `Du kan ikke velge en dato fram i tid.`, before 1900 `Du kan ikke velge en dato før 1900.`, too young `Du må være minst {n} år.` | sv: `Du måste fylla i ett datum.`, `Du måste ange ett giltigt datum.`, `Du kan inte välja ett datum i framtiden.`, `Du kan inte välja ett datum före 1900.`, `Du måste vara minst {n} år.` | en: `Please enter a date.`, `Please enter a valid date.`, `You cannot choose a date in the future.`, `You cannot choose a date before 1900.`, `You must be at least {n} years old.`

Optional fields: there is no `optional` option. Wrap with zod, e.g. `z.union([z.literal(''), email({ locale: 'nb' })])`, so an empty string passes.

```ts
import {
  birthDate,
  email,
  mobileNumber,
  nationalIdNumber,
  requiredText,
} from '@obosbbl/grunnmuren-forms/schemas';
import { z } from 'zod';

const memberSchema = z.object({
  firstName: requiredText({ locale: 'nb', max: 50 }),
  lastName: requiredText({ locale: 'nb', max: 50 }),
  email: email({ locale: 'nb' }),
  phone: mobileNumber({ locale: 'nb' }),
  nationalId: nationalIdNumber({ locale: 'nb', allowDNumber: true }),
  birthDate: birthDate({ locale: 'nb', minimumAge: 18 }),
});
```
