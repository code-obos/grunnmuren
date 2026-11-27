# Address field (address autocomplete)

`@obosbbl/grunnmuren-forms` has no address field. The autocomplete is `@code-obos/grunnmuren-address-autocomplete`, a private package on GitHub Packages, and `grunnmuren-forms` is public on npm, so depending on it would break installs for everyone else. Each app wires it in as a custom field (see "Custom fields" in `SKILL.md`). Use this when a form needs a Norwegian or Swedish street address picked from OBOS' address search.

The component is experimental (0.x) and **uncontrolled**: it takes `defaultSelection` once and reports changes through `onSelectionChange`. Everything below works around that.

## 1. Install

`.npmrc` in the app repo (commit this line, never a token):

```ini
@code-obos:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

`NPM_TOKEN` is a GitHub token with `read:packages`, set in your shell locally and as a secret in CI and in the Docker/build step. Never write the token itself into `.npmrc`, a Dockerfile or the repo.

```sh
pnpm add @code-obos/grunnmuren-address-autocomplete
```

Peer deps (add the ones the app lacks): `@obosbbl/grunnmuren-react` (`^3.10.2`), `@obosbbl/grunnmuren-icons-react` (`^2`), `react-aria-components` (`^1.17`), `react` and `react-dom` 19. Tailwind v4 with `@obosbbl/grunnmuren-tailwind@^2.5`.

Tailwind does not scan `node_modules`, so add a `@source` for the package, next to the one for Grunnmuren. Without it the dropdown renders unstyled:

```css
@import '@obosbbl/grunnmuren-tailwind';

@source "../node_modules/@obosbbl/grunnmuren-react/dist";
@source "../node_modules/@code-obos/grunnmuren-address-autocomplete/dist";
```

Adjust the relative path to where the CSS file lives (in a pnpm workspace, the app's own `node_modules`). The app must be wrapped in `GrunnmurenProvider`: the component reads the locale from it (`sv` searches Swedish addresses, everything else Norwegian) and uses it for its messages.

## 2. The `AddressField` component

The value is `Address | null` (`null` = nothing selected). `Address` is exported by the package:

```ts
type Address = {
  streetAddress: string;
  houseNumber?: string;
  entranceNumber?: string;
  postalCode: string;
  postalDistrict: string;
  countryCodeAlpha2: string; // 'NO' | 'SE'
};
```

`AddressAutocompleteProps` = `defaultSelection?`, `locale?`, `onSelectionChange` (required) + all Grunnmuren `TextField` props except `onFocus`. It already has built-in validation: text that is not a selected address is invalid ("Velg en adresse fra listen"), shown without any form wiring. A `validate` prop runs before that check. `isRequired` only adds the required marker with `validationBehavior="aria"`; requiring a value is the schema's job.

Write the component in the app's forms module, following the package conventions:

```tsx
// src/lib/forms.tsx
'use client';
import {
  type Address,
  AddressAutocomplete,
  type AddressAutocompleteProps,
} from '@code-obos/grunnmuren-address-autocomplete';
import {
  createGrunnmurenFormHook,
  firstErrorMessage,
  useFormsLocale,
} from '@obosbbl/grunnmuren-forms';
import { type FieldWithValue, getFormHookHelpers } from '@tanstack/react-form';
import { useState } from 'react';

import { ManualAddressInputs } from './manual-address-inputs'; // section 5, optional

const ADDRESS_KEYS = [
  'streetAddress',
  'houseNumber',
  'entranceNumber',
  'postalCode',
  'postalDistrict',
  'countryCodeAlpha2',
] as const;

function sameAddress(a: Address | null, b: Address | null) {
  if (a === b) return true;
  if (!a || !b) return false;
  return ADDRESS_KEYS.every((key) => (a[key] || '') === (b[key] || ''));
}

const labels = { nb: 'Adresse', sv: 'Adress', en: 'Address' } as const;

export type AddressFieldProps = Omit<
  AddressAutocompleteProps,
  'name' | 'errorMessage' | 'validationBehavior' | 'defaultSelection'
> & {
  /** Swedish only: show the "fill in manually" link, see section 5. */
  allowManualEntry?: boolean;
  /** Called when the user switches to manual entry, e.g. for analytics. */
  onManualMode?: () => void;
};

function AddressInput({
  field,
  onSelectionChange,
  onBlur,
  allowManualEntry,
  onManualMode,
  ...props
}: AddressFieldProps & { field: FieldWithValue<Address | null> }) {
  const locale = useFormsLocale();
  const [isManual, setIsManual] = useState(false);

  // The autocomplete only reads defaultSelection on mount. When the form changes the value
  // from outside (reset, setFieldValue), remount it with a new key so it shows the new value.
  const [seen, setSeen] = useState(field.value);
  const [version, setVersion] = useState(0);
  if (!sameAddress(field.value, seen)) {
    setSeen(field.value);
    setVersion((v) => v + 1);
  }

  const errorMessage = firstErrorMessage(field);

  if (isManual) {
    return (
      <ManualAddressInputs
        key={version}
        field={field}
        errorMessage={errorMessage}
        isRequired={props.isRequired}
        onBack={() => {
          field.handleChange(null);
          setIsManual(false);
        }}
      />
    );
  }

  return (
    <>
      <AddressAutocomplete
        label={labels[locale]}
        autoComplete="street-address"
        {...props}
        key={version}
        defaultSelection={field.value}
        validationBehavior="aria"
        name={field.name}
        onSelectionChange={(address) => {
          // keep `seen` in sync so our own change does not remount the input
          setSeen(address);
          field.handleChange(address);
          onSelectionChange?.(address);
        }}
        onBlur={(event) => {
          field.handleBlur();
          onBlur?.(event);
        }}
        errorMessage={errorMessage}
      />
      {allowManualEntry && locale === 'sv' && (
        <button
          type="button"
          className="self-start text-sm underline hover:no-underline"
          onClick={() => {
            onManualMode?.();
            field.handleChange(null);
            setIsManual(true);
          }}
        >
          Hittar du inte din adress? Fyll i manuellt
        </button>
      )}
    </>
  );
}

const AddressField = getFormHookHelpers().fieldComponent.strict(AddressInput, 'field');

export const { useAppForm, useFormContext, NameFields } = createGrunnmurenFormHook({
  fieldComponents: { AddressField },
});
```

Notes:

- `name={field.name}` makes the input submit with the form's field name; it does not hold the address parts. Submit from form state, not from `FormData`.
- `key={version}` goes after `{...props}` so a caller cannot override it. The render-phase `setState` is the React-supported "adjust state when a prop changes" pattern.
- `onSelectionChange(null)` fires when the user edits the text after picking an address, or clears it. The form then holds `null` until a new address is picked.
- Leave out `allowManualEntry`/section 5 and the `isManual` branch if the app is Norwegian only.
- Wrapping in `getFormHookHelpers().fieldComponent.strict(..., 'field')` makes TanStack check `<field.AddressField>` against `defaultValues.address`, which must be `null as Address | null`.

Use it:

```tsx
import type { Address } from '@code-obos/grunnmuren-address-autocomplete';

const form = useAppForm({
  defaultValues: { address: null as Address | null },
  validators: [{ run: orderSchema, triggers: ['change', 'blur'] }],
  onSubmit: async ({ validatorOutputs }) => {
    const [order] = validatorOutputs; // order.address is Address, never null, if the schema requires it
  },
});

<form.Field name="address">
  {(field) => <field.AddressField isRequired allowManualEntry />}
</form.Field>;
```

Pre-filling an existing address: put it in `defaultValues` (`address: addressDtoToAddress(dto)`, section 7). To set it later, `form.setFieldValue('address', next)`: the field remounts the input with the new value. `form.reset()` restores the default the same way.

## 3. Schema

Server-safe module (no `'use client'`, no React). Port of medlem's `addressSchema`: street, postal code and postal district are required, house number must be numeric when present. The messages use the same locale pattern as the package's schema factories. All required checks report on the address itself (one message, like medlem), so the field shows it.

```ts
// src/lib/address-schema.ts
import type { Locale } from '@obosbbl/grunnmuren-forms/schemas';
import { z } from 'zod';

const messages = {
  nb: {
    required: 'Du må fylle ut adressen.',
    houseNumber: 'Husnummer må være et tall.',
  },
  sv: {
    required: 'Du måste fylla i adressen.',
    houseNumber: 'Husnumret måste vara ett nummer.',
  },
  en: {
    required: 'Enter an address.',
    houseNumber: 'The house number must be a number.',
  },
} satisfies Record<Locale, { required: string; houseNumber: string }>;

/** `Address | null` from the autocomplete. Output is `Address`, `null` fails when `required`. */
export function address({ locale, required = true }: { locale: Locale; required?: boolean }) {
  const m = messages[locale];

  return z
    .object({
      streetAddress: z.string(),
      houseNumber: z.string().optional(),
      entranceNumber: z.string().optional(),
      postalCode: z.string(),
      postalDistrict: z.string(),
      countryCodeAlpha2: z.string(),
    })
    .superRefine((value, ctx) => {
      if (!value.streetAddress.trim() || !value.postalCode.trim() || !value.postalDistrict.trim()) {
        ctx.issues.push({ code: 'custom', message: m.required, input: value });
      }
      if (value.houseNumber && Number.isNaN(Number(value.houseNumber))) {
        ctx.issues.push({ code: 'custom', message: m.houseNumber, input: value });
      }
    })
    .nullable()
    .transform((value, ctx) => {
      if (value === null && required) {
        ctx.issues.push({ code: 'custom', message: m.required, input: value });
        return z.NEVER;
      }
      return value;
    });
}
```

Use it as one property of the form schema, with the same locale as `GrunnmurenProvider`:

```ts
export const orderSchema = z.object({
  address: address({ locale: 'nb' }), // required
  // optional address: address({ locale: 'nb', required: false })
});
```

Required comes from the schema: the autocomplete's own check only rejects free text, an untouched empty field is valid there. A required address with nothing picked fails on blur (after the first blur) and on submit with `m.required`; free text also shows the component's own "Velg en adresse fra listen".

## 4. c/o address

Existing package fields only: `CheckboxField` toggles, `TextField` takes the name. The name field is rendered inside the checkbox's `form.Field` render, so it only exists when checked.

```tsx
<form.Field name="useCareOf">
  {(field) => (
    <>
      <field.CheckboxField>Bruk c/o adresse</field.CheckboxField>
      {field.state.value && (
        <form.Field name="careOfName">
          {(careOf) => <careOf.TextField label="c/o (navn på person)" isRequired />}
        </form.Field>
      )}
    </>
  )}
</form.Field>
```

with `defaultValues: { address: null as Address | null, useCareOf: false, careOfName: '' }`. Swedish: label `c/o (namn på person)`, `Använd c/o-adress`.

The reference form (grunnmuren docs, `referanseskjema`) also shows the picked address under the combobox, so the user sees what will be submitted (`nb` label `Adressen du har valgt`, translate for other locales). Show it only when `address` is set. The c/o checkbox starts unchecked.

```tsx
<div>
  <p className="font-semibold">Adressen du har valgt</p>
  <div className="bg-gray-lightest flex flex-col rounded-lg p-4">
    <span>
      {address.streetAddress} {address.houseNumber}
      {address.entranceNumber}
    </span>
    <span>
      {address.postalCode} {address.postalDistrict}
    </span>
  </div>
</div>
```

Schema, max 150 characters, required only when checked:

```ts
const careOfMessages = {
  nb: {
    required: 'Du må fylle ut c/o-navn.',
    tooLong: (max: number) => `Maks lengde er ${max} tegn.`,
  },
  sv: {
    required: 'Du måste fylla i c/o-namn.',
    tooLong: (max: number) => `Max längd är ${max} tecken.`,
  },
  en: {
    required: 'Enter a c/o name.',
    tooLong: (max: number) => `Maximum length is ${max} characters.`,
  },
} satisfies Record<Locale, { required: string; tooLong: (max: number) => string }>;

export function orderSchemaFor(locale: Locale) {
  const m = careOfMessages[locale];

  return z
    .object({
      address: address({ locale }),
      useCareOf: z.boolean(),
      careOfName: z.string().max(150, { error: m.tooLong(150) }),
    })
    .refine((value) => !value.useCareOf || value.careOfName.trim() !== '', {
      path: ['careOfName'],
      error: m.required,
    });
}
```

`path: ['careOfName']` routes the error to the c/o field. The value stays in the form when unchecked, so on submit send `useCareOf ? careOfName.trim() : undefined`.

## 5. Swedish manual entry

Optional, for Swedish forms ("Hittar du inte din adress? Fyll i manuellt"). The autocomplete cannot hold addresses outside the search, so `allowManualEntry` (section 2) swaps it for three `TextField`s that write the same `Address` value, with `countryCodeAlpha2: 'SE'`. The schema is unchanged: it validates the same shape. `onManualMode` is where analytics goes:

```tsx
<field.AddressField allowManualEntry onManualMode={() => track('manual_address_input_clicked')} />
```

```tsx
// src/lib/manual-address-inputs.tsx
'use client';
import type { Address } from '@code-obos/grunnmuren-address-autocomplete';
import { TextField } from '@obosbbl/grunnmuren-react';
import type { FieldWithValue } from '@tanstack/react-form';
import { useState } from 'react';

type Props = {
  field: FieldWithValue<Address | null>;
  errorMessage: string | null;
  isRequired?: boolean;
  onBack: () => void;
};

export function ManualAddressInputs({ field, errorMessage, isRequired, onBack }: Props) {
  // Local state: a half-filled address is not a valid Address, but must not be lost while typing
  const [parts, setParts] = useState({
    streetAddress: field.value?.streetAddress ?? '',
    postalCode: field.value?.postalCode ?? '',
    postalDistrict: field.value?.postalDistrict ?? '',
  });

  function update(key: keyof typeof parts, value: string) {
    const next = { ...parts, [key]: value };
    setParts(next);
    // Everything empty is "no address", like the autocomplete
    field.handleChange(
      next.streetAddress || next.postalCode || next.postalDistrict
        ? { ...next, countryCodeAlpha2: 'SE' }
        : null,
    );
  }

  // the schema reports one message on the address; mark empty inputs as invalid
  const isInvalid = (value: string) => !!errorMessage && !value.trim();

  return (
    <div className="flex flex-col gap-4">
      <TextField
        label="Adress"
        autoComplete="street-address"
        isRequired={isRequired}
        validationBehavior="aria"
        name={`${field.name}.streetAddress`}
        value={parts.streetAddress}
        onChange={(value) => update('streetAddress', value)}
        onBlur={() => field.handleBlur()}
        errorMessage={errorMessage}
      />
      <div className="flex gap-4">
        <TextField
          label="Postnummer"
          autoComplete="postal-code"
          inputMode="numeric"
          isRequired={isRequired}
          validationBehavior="aria"
          className="w-32"
          name={`${field.name}.postalCode`}
          value={parts.postalCode}
          onChange={(value) => update('postalCode', value)}
          onBlur={() => field.handleBlur()}
          isInvalid={isInvalid(parts.postalCode)}
        />
        <TextField
          label="Postort"
          autoComplete="address-level2"
          isRequired={isRequired}
          validationBehavior="aria"
          className="flex-1"
          name={`${field.name}.postalDistrict`}
          value={parts.postalDistrict}
          onChange={(value) => update('postalDistrict', value)}
          onBlur={() => field.handleBlur()}
          isInvalid={isInvalid(parts.postalDistrict)}
        />
      </div>
      <button
        type="button"
        className="self-start text-sm underline hover:no-underline"
        onClick={onBack}
      >
        Sök efter adress
      </button>
    </div>
  );
}
```

`isInvalid` is passed as `false` (not `undefined`) when valid, which is fine here: the inputs have no validation of their own. Manual mode is Swedish only, so its strings are Swedish.

## 6. Submit

`Address` already matches the DTP `AddressDto` OBOS services use (`streetAddress`, `houseNumber`, `entranceNumber`, `postalCode`, `postalDistrict`, `countryCodeAlpha2`). Send `validatorOutputs[0].address` as is, unless the API wants `null` instead of missing keys, or you pre-fill from a DTO. Medlem's mapping, with the country default taken from the locale instead of `isSweden`:

```ts
import type { Address } from '@code-obos/grunnmuren-address-autocomplete';
import { type Locale, marketFor } from '@obosbbl/grunnmuren-forms/schemas';

type AddressDto = {
  streetAddress?: string | null;
  houseNumber?: string | null;
  entranceNumber?: string | null;
  postalCode?: string | null;
  postalDistrict?: string | null;
  countryCodeAlpha2?: string | null;
};

export function addressDtoToAddress(
  dto: AddressDto | null | undefined,
  locale: Locale,
): Address | null {
  if (!dto?.streetAddress) return null;
  return {
    streetAddress: dto.streetAddress,
    houseNumber: dto.houseNumber ?? undefined,
    entranceNumber: dto.entranceNumber ?? undefined,
    postalCode: dto.postalCode ?? '',
    postalDistrict: dto.postalDistrict ?? '',
    countryCodeAlpha2: dto.countryCodeAlpha2 ?? (marketFor(locale) === 'se' ? 'SE' : 'NO'),
  };
}

export function addressToDto(address: Address): AddressDto {
  return {
    ...address,
    houseNumber: address.houseNumber ?? null,
    entranceNumber: address.entranceNumber ?? null,
  };
}
```

## Common mistakes

- Expecting a controlled input. Passing `defaultSelection` again does nothing after mount, and `setFieldValue` or `form.reset()` do not change the visible text by themselves. `AddressField` above remounts with `key`; if you write your own wrapper without it, the form value and the input disagree.
- Resetting to `null` while the user has typed text but not picked an address: the form value was already `null`, so nothing changes and the typed text stays. Bump a `key` on `form.Field` or the field yourself in that case.
- Forgetting the `@source` for `@code-obos/grunnmuren-address-autocomplete/dist`: the dropdown shows but is unstyled.
- No `GrunnmurenProvider` (or the wrong locale): the search uses Norwegian addresses and messages for everything except `sv`.
- Committing the GitHub token in `.npmrc`, or forgetting `NPM_TOKEN` in CI and Docker builds: install fails with 401/404 for `@code-obos`.
- Passing `name`, `errorMessage` or `validationBehavior` to `AddressField`: type error, the form owns them. `onSelectionChange`, `onBlur` and the rest pass through and run after the form's handlers.
- Reading the address from `FormData` or the input text. Use `validatorOutputs[0]`.
- Putting the schema in the `'use client'` forms module: keep `address-schema.ts` server-safe and import it from both.
- Using `defaultValues: { address: undefined }` or `''`. It must be `null as Address | null`.
