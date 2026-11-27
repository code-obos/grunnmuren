import type { Locale } from './locale';

/** Default labels and descriptions for the domain fields. Keep this file free of React imports. */
export type FieldTranslations = {
  phone: { label: string };
  email: { label: string };
  firstName: { label: string };
  lastName: { label: string };
  nationalIdNumber: { label: string; description: string };
  birthDate: { label: string; hint: string };
  file: { label: string; buttonText: string };
};

export const fieldTranslations: Record<Locale, FieldTranslations> = {
  nb: {
    phone: { label: 'Mobil' },
    email: { label: 'E-post' },
    firstName: { label: 'Fornavn og mellomnavn' },
    lastName: { label: 'Etternavn' },
    nationalIdNumber: { label: 'Fødsels- og personnummer', description: '11 siffer' },
    birthDate: { label: 'Fødselsdato', hint: 'Datovelger' },
    file: { label: 'Vedlegg', buttonText: 'Last opp' },
  },
  sv: {
    phone: { label: 'Mobil' },
    email: { label: 'E-post' },
    firstName: { label: 'Förnamn' },
    lastName: { label: 'Efternamn' },
    nationalIdNumber: { label: 'Personnummer', description: 'ÅÅÅÅMMDD-XXXX' },
    birthDate: { label: 'Födelsedatum', hint: 'Datumväljare' },
    file: { label: 'Bilagor', buttonText: 'Ladda upp' },
  },
  en: {
    phone: { label: 'Mobile number' },
    email: { label: 'E-mail' },
    firstName: { label: 'First and middle name' },
    lastName: { label: 'Last name' },
    nationalIdNumber: { label: 'National identity number', description: '11 digits' },
    birthDate: { label: 'Date of birth', hint: 'Date picker' },
    file: { label: 'Attachments', buttonText: 'Upload' },
  },
};

/** Default texts for the stepper, step navigation and summary components. */
export type StepTranslations = {
  stepperLabel: string;
  previousStep: string;
  nextStep: string;
  edit: string;
};

export const stepTranslations: Record<Locale, StepTranslations> = {
  nb: {
    stepperLabel: 'Progressindikator',
    previousStep: 'Forrige steg',
    nextStep: 'Neste steg',
    edit: 'Endre',
  },
  sv: {
    stepperLabel: 'Framstegsindikator',
    previousStep: 'Föregående steg',
    nextStep: 'Nästa steg',
    edit: 'Ändra',
  },
  en: {
    stepperLabel: 'Progress',
    previousStep: 'Previous step',
    nextStep: 'Next step',
    edit: 'Edit',
  },
};
