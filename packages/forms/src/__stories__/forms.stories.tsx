import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { z } from 'zod';

import { createGrunnmurenFormHook } from '../create-grunnmuren-form-hook';
import {
  FormStepper,
  Radio,
  SelectItem,
  StepForm,
  SummaryCard,
  SummaryItem,
  useFormSteps,
} from '../index';
import {
  birthDate,
  email,
  file,
  memberNumber,
  mobileNumber,
  nationalIdNumber,
  requiredText,
} from '../schemas';

const meta: Meta = {
  title: 'Forms',
};

export default meta;
type Story = StoryObj;

// Module level on purpose: the hook must not be recreated on every render
const { useAppForm, NameFields } = createGrunnmurenFormHook();

const contactSchema = z.object({
  firstName: requiredText({ locale: 'nb', max: 100 }),
  lastName: requiredText({ locale: 'nb', max: 100 }),
  email: email({ locale: 'nb' }),
  phone: mobileNumber({ locale: 'nb' }),
  nationalIdNumber: nationalIdNumber({ locale: 'nb' }),
  birthDate: birthDate({ locale: 'nb' }),
  memberNumber: memberNumber({ locale: 'nb' }),
  attachments: file({ locale: 'nb' }),
  message: requiredText({ locale: 'nb', max: 1000 }),
  topic: z.string().min(1, 'Velg et tema'),
  contactMethod: z.string().min(1, 'Velg hvordan du vil bli kontaktet'),
  acceptTerms: z.literal(true, { error: 'Du må godta vilkårene' }),
});

function ContactFormExample() {
  const form = useAppForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      nationalIdNumber: '',
      birthDate: '',
      memberNumber: '',
      attachments: [] as File[],
      message: '',
      topic: '',
      contactMethod: '',
      acceptTerms: false,
    },
    validators: [{ run: contactSchema, triggers: ['change', 'blur'] }],
    onSubmit: ({ validatorOutputs }) => {
      const [contact] = validatorOutputs;
      alert(JSON.stringify(contact));
    },
  });

  return (
    <form.AppForm>
      <form.Form className="container-prose grid gap-6">
        <NameFields form={form} fields={{ firstName: 'firstName', lastName: 'lastName' }} />
        <form.Field name="email">{(field) => <field.EmailField isRequired />}</form.Field>
        <form.Field name="phone">{(field) => <field.PhoneField isRequired />}</form.Field>
        <form.Field name="nationalIdNumber">
          {(field) => <field.NationalIdNumberField isRequired />}
        </form.Field>
        <form.Field name="birthDate">{(field) => <field.BirthDateField isRequired />}</form.Field>
        <form.Field name="memberNumber">
          {(field) => (
            <field.TextField label="Medlemsnummer" inputMode="numeric" size={8} isRequired />
          )}
        </form.Field>
        <form.Field name="topic">
          {(field) => (
            <field.SelectField label="Tema" placeholder="Velg tema" isRequired>
              <SelectItem id="membership">Medlemskap</SelectItem>
              <SelectItem id="housing">Bolig</SelectItem>
              <SelectItem id="other">Annet</SelectItem>
            </field.SelectField>
          )}
        </form.Field>
        <form.Field name="contactMethod">
          {(field) => (
            <field.RadioGroupField label="Hvordan vil du bli kontaktet?" isRequired>
              <Radio value="email">E-post</Radio>
              <Radio value="phone">Telefon</Radio>
            </field.RadioGroupField>
          )}
        </form.Field>
        <form.Field name="message">
          {(field) => <field.TextAreaField label="Melding" isRequired />}
        </form.Field>
        <form.Field name="attachments">
          {(field) => (
            <field.FileField description="PDF, JPG eller PNG, maks 5 MB" allowsMultiple />
          )}
        </form.Field>
        <form.Field name="acceptTerms">
          {(field) => <field.CheckboxField>Jeg godtar vilkårene</field.CheckboxField>}
        </form.Field>
        <form.SubmitButton>Send inn</form.SubmitButton>
      </form.Form>
    </form.AppForm>
  );
}

function SwedishExample() {
  const form = useAppForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      nationalIdNumber: '',
      birthDate: '',
    },
  });

  return (
    // The domain fields read the locale from GrunnmurenProvider
    <GrunnmurenProvider locale="sv">
      <form.AppForm>
        <form.Form className="container-prose grid gap-6">
          <form.Field name="firstName">{(field) => <field.FirstNameField />}</form.Field>
          <form.Field name="lastName">{(field) => <field.LastNameField />}</form.Field>
          <form.Field name="email">{(field) => <field.EmailField />}</form.Field>
          <form.Field name="phone">{(field) => <field.PhoneField />}</form.Field>
          <form.Field name="nationalIdNumber">
            {(field) => <field.NationalIdNumberField />}
          </form.Field>
          <form.Field name="birthDate">{(field) => <field.BirthDateField />}</form.Field>
        </form.Form>
      </form.AppForm>
    </GrunnmurenProvider>
  );
}

export const ContactForm: Story = {
  render: () => <ContactFormExample />,
};

export const Swedish: Story = {
  render: () => <SwedishExample />,
};

const steps = [
  { id: 'contact', label: 'Kontakt' },
  { id: 'details', label: 'Detaljer' },
  { id: 'summary', label: 'Oppsummering' },
];

const stepContactSchema = z.object({
  firstName: requiredText({ locale: 'nb', max: 100 }),
  lastName: requiredText({ locale: 'nb', max: 100 }),
  email: email({ locale: 'nb' }),
});
const stepDetailsSchema = z.object({
  phone: mobileNumber({ locale: 'nb' }),
  birthDate: birthDate({ locale: 'nb' }),
});
const stepFlowSchema = z.object({ contact: stepContactSchema, details: stepDetailsSchema });

function MultiStepExample() {
  const stepper = useFormSteps({ steps });
  const [sent, setSent] = useState(false);
  const form = useAppForm({
    defaultValues: {
      contact: { firstName: '', lastName: '', email: '' },
      details: { phone: '', birthDate: '' },
    },
    // Whole form, runs on the final submit only. Each step validates its own group.
    validators: [{ run: stepFlowSchema, triggers: [] }],
    onSubmit: () => setSent(true),
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
              validators={[{ run: stepContactSchema, triggers: ['change', 'blur'] }]}
              onSubmit={stepper.goToNext}
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
              validators={[{ run: stepDetailsSchema, triggers: ['change', 'blur'] }]}
              onSubmit={stepper.goToNext}
            >
              {(group) => (
                <StepForm group={group} steps={stepper}>
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
                  <form.SubmitButton>Send inn</form.SubmitButton>
                  {sent && <output>Takk, skjemaet er sendt inn.</output>}
                </form.Form>
              )}
            </form.Subscribe>
          )}
        </div>
      </div>
    </form.AppForm>
  );
}

export const MultiStep: Story = {
  render: () => <MultiStepExample />,
};
