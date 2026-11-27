import type { Locale } from './locale';

/** Default labels and descriptions for the domain fields. Keep this file free of React imports. */
export type FieldTranslations = {
  phone: { label: string };
  email: { label: string };
  firstName: { label: string };
  lastName: { label: string };
  nationalIdNumber: { label: string; description: string };
  birthDate: { label: string };
};

export const fieldTranslations: Record<Locale, FieldTranslations> = {
  nb: {
    phone: { label: 'Mobil' },
    email: { label: 'E-post' },
    firstName: { label: 'Fornavn og mellomnavn' },
    lastName: { label: 'Etternavn' },
    nationalIdNumber: { label: 'Fødselsnummer', description: '11 siffer' },
    birthDate: { label: 'Fødselsdato' },
  },
  sv: {
    phone: { label: 'Mobilnummer' },
    email: { label: 'E-post' },
    firstName: { label: 'Förnamn' },
    lastName: { label: 'Efternamn' },
    nationalIdNumber: { label: 'Personnummer', description: 'ÅÅÅÅMMDD-XXXX' },
    birthDate: { label: 'Födelsedatum' },
  },
  en: {
    phone: { label: 'Mobile number' },
    email: { label: 'E-mail' },
    firstName: { label: 'First and middle name' },
    lastName: { label: 'Last name' },
    nationalIdNumber: { label: 'National identity number', description: '11 digits' },
    birthDate: { label: 'Date of birth' },
  },
};
