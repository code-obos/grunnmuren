# Multi-step forms

One `useAppForm` for the whole flow, one TanStack **form group** per step. Next validates and submits that step's group only (`group.handleSubmit()`), the group's `onSubmit` moves on, and the summary step submits the whole form. Verified against `@tanstack/react-form` `2.0.0-alpha.3`: `form.FormGroup` takes `name`, `validators`, `onSubmit`, `onSubmitInvalid`; `group.handleSubmit()` validates only that group's fields and counts `submissionAttempts` per group, so errors on the other steps stay hidden.

## Pieces (all from `@obosbbl/grunnmuren-forms`)

| Export                                    | Use                                                                                                                                                                                                                                                                                       |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useFormSteps({ steps, initialStepId? })` | State: `steps`, `activeStep`, `activeIndex`, `isFirst`, `isLast`, `isCompleted(id)`, `goTo(id)`, `goToNext()` (marks the active step completed), `goToPrevious()`, `markCompleted(id)`, `headingRef`. Scrolls to top and focuses `headingRef` on every step change (not on first render). |
| `FormStepper`                             | Step indicator. `<FormStepper {...stepper} />`. Later steps are disabled until completed. `disableNavigation` disables all. Extra props go on the `<nav>` (localized `aria-label`).                                                                                                       |
| `StepForm`                                | A step's `<form noValidate>`: `group` + `steps` + fields as children. Renders Back/Next, Next is `type="submit"` with pending state from the group, and submits only the group.                                                                                                           |
| `StepNavigation`                          | Back + Next on its own (`onPrevious`, `isPending`, `previousLabel`, `nextLabel`, `showPrevious`, `isNextDisabled`). Use it when you do not use `StepForm`.                                                                                                                                |
| `SummaryCard`, `SummaryItem`              | Summary step: card with title, content and "Endre" button (`onEdit`, or `editAction` to replace it).                                                                                                                                                                                      |

Data is nested by step (`{ contact: {...}, details: {...} }`) because a group's `name` is a key of the form data and its fields are named relative to the group.

## Complete example

```tsx
'use client';
import {
  FormStepper,
  StepForm,
  SummaryCard,
  SummaryItem,
  useFormSteps,
} from '@obosbbl/grunnmuren-forms';
import { useState } from 'react';

import { useAppForm } from '@/lib/forms';

import { contactSchema, detailsSchema, flowSchema } from './schema';

const STEPS = [
  { id: 'contact', label: 'Kontakt' },
  { id: 'details', label: 'Detaljer' },
  { id: 'summary', label: 'Oppsummering' },
];

export function SignupFlow() {
  const stepper = useFormSteps({ steps: STEPS });
  const [serverError, setServerError] = useState<string>();

  const form = useAppForm({
    defaultValues: {
      contact: { firstName: '', lastName: '', email: '' },
      details: { phone: '', birthDate: '' },
    },
    // The whole flow, on the final submit only (triggers: [])
    validators: [{ run: flowSchema, triggers: [] }],
    onSubmit: async ({ validatorOutputs }) => {
      setServerError(undefined);
      const [flow] = validatorOutputs; // parsed output, not `value`
      const result = await sendSignup(flow);
      if (!result.ok) {
        setServerError('Noe gikk galt. Prøv igjen om litt.');
        return;
      }
      trackSubmitted();
      // Receipt: see "Receipt" below
    },
  });

  return (
    <form.AppForm>
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="shrink-0 lg:w-64">
          <FormStepper {...stepper} />
        </aside>

        <div className="max-w-2xl flex-1">
          <h2 ref={stepper.headingRef} tabIndex={-1} className="heading-m mb-6 outline-none">
            {stepper.activeStep.label}
          </h2>

          {stepper.activeStep.id === 'contact' && (
            <form.FormGroup
              name="contact"
              validators={[{ run: contactSchema, triggers: ['change', 'blur'] }]}
              onSubmit={() => {
                trackNextStepWhenValid('contact');
                stepper.goToNext();
              }}
              onSubmitInvalid={() => trackNextStepWhenInvalid('contact')}
            >
              {(group) => (
                <StepForm group={group} steps={stepper}>
                  <group.Field name="firstName">
                    {(field) => <field.FirstNameField isRequired />}
                  </group.Field>
                  <group.Field name="lastName">
                    {(field) => <field.LastNameField isRequired />}
                  </group.Field>
                  <group.Field name="email">
                    {(field) => <field.EmailField isRequired />}
                  </group.Field>
                </StepForm>
              )}
            </form.FormGroup>
          )}

          {stepper.activeStep.id === 'details' && (
            <form.FormGroup
              name="details"
              validators={[{ run: detailsSchema, triggers: ['change', 'blur'] }]}
              onSubmit={stepper.goToNext}
            >
              {(group) => (
                <StepForm
                  group={group}
                  steps={stepper}
                  navigation={{ nextLabel: 'Til oppsummering' }}
                >
                  <group.Field name="phone">
                    {(field) => <field.PhoneField isRequired />}
                  </group.Field>
                  <group.Field name="birthDate">
                    {(field) => <field.BirthDateField isRequired />}
                  </group.Field>
                </StepForm>
              )}
            </form.FormGroup>
          )}

          {stepper.activeStep.id === 'summary' && (
            <form.Subscribe selector={(state) => state.values}>
              {(values) => (
                <form.Form className="grid gap-6">
                  <SummaryCard title="Kontakt" onEdit={() => stepper.goTo('contact')}>
                    <SummaryItem
                      label="Navn"
                      value={`${values.contact.firstName} ${values.contact.lastName}`}
                    />
                    <SummaryItem label="E-post" value={values.contact.email} />
                  </SummaryCard>
                  <SummaryCard title="Detaljer" onEdit={() => stepper.goTo('details')}>
                    <SummaryItem label="Mobil" value={values.details.phone} />
                    <SummaryItem label="Fødselsdato" value={values.details.birthDate} />
                  </SummaryCard>
                  {serverError && (
                    <p role="alert" className="text-red">
                      {serverError}
                    </p>
                  )}
                  <div className="flex flex-col gap-3 md:flex-row md:gap-4">
                    <form.SubmitButton>Send inn</form.SubmitButton>
                  </div>
                </form.Form>
              )}
            </form.Subscribe>
          )}
        </div>
      </div>
    </form.AppForm>
  );
}
```

Schemas live in the server-safe module (`flowSchema = z.object({ contact: contactSchema, details: detailsSchema })`), so the API route can validate the same shape.

## How it works

- Only the active step's `FormGroup` is mounted. Values live in the form, so they survive going back and forth.
- Next (`type="submit"`) -> `StepForm` calls `group.handleSubmit()` -> the group's schema validates -> invalid: `onSubmitInvalid`, errors show on that step's fields (group-scoped `submissionAttempts`, so `showAfterBlurOrSubmit` works per step) -> valid: group `onSubmit`, usually `stepper.goToNext`.
- `StepForm` replaces `form.Form` inside steps, because `form.Form` calls `form.handleSubmit()` (the whole form). Use `form.Form` and `form.SubmitButton` only on the final step.
- Fields in a group are `<group.Field name="email">` (relative name). They still get the `field.XxxField` components.
- Keep the form-level validator on `triggers: []`, so the unmounted steps do not validate on every keystroke.
- Back never validates (`type="button"`).
- No `aria-live` wrapper is needed: focus moves to the step heading on every change. Put `tabIndex={-1}` and `outline-none` on it.
- `useFormSteps` ignores `goTo` for later steps that are not completed. `goTo` from the summary to a completed step is how "Endre" works. After editing, Next walks through the following steps again.

## Analytics

Hook points that match medlem's `trackNextStepWhenValid` / `trackNextStepWhenInvalid`: the group's `onSubmit` (valid) and `onSubmitInvalid` (invalid), as in the contact step above. Final submit tracking goes in the form's `onSubmit`. Keep tracking calls out of the fields.

## Receipt

Pick one:

- **Same page, receipt step**: `useState<Receipt>()`, set it in the form `onSubmit`, and render `<Receipt />` instead of the whole flow (stepper included) when it is set. Simplest, nothing survives a reload.
- **Own route**: `router.push('/skjema/kvittering')` after a successful send. Pass what the receipt needs through the response or a short-lived server session, never through the URL.
- **Extra last step**: add `{ id: 'receipt', label: 'Kvittering' }` to `STEPS` and call `stepper.goToNext()` after a successful send. That completes the summary and opens the receipt. Do not use `goTo('receipt')`: later steps that are not completed are unreachable.

Disable the stepper links after submit with `<FormStepper {...stepper} disableNavigation />` so nobody edits a sent form.

## Layout

Stepper on the left from `lg` up (`aside className="shrink-0 lg:w-64"`), content `max-w-2xl flex-1`. Back and Next stack on mobile with Back below Next (`StepNavigation` does this).
