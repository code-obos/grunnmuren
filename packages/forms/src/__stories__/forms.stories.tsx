import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { z } from 'zod';

import { createGrunnmurenFormHook } from '../create-grunnmuren-form-hook';
import { Radio, SelectItem } from '../index';
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
