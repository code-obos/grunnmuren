import type { Locale } from '../locale';

export type SchemaMessages = {
  mobileNumber: { required: string; invalid: string };
  email: { required: string; invalid: string; tooLong: string };
  nationalIdNumber: { required: string; invalid: string; invalidWithDNumber: string };
  requiredText: { required: string; tooLong: (max: number) => string };
  birthDate: {
    required: string;
    invalid: string;
    inFuture: string;
    before1900: string;
    tooYoung: (minimumAge: number) => string;
  };
};

export const schemaMessages: Record<Locale, SchemaMessages> = {
  nb: {
    mobileNumber: {
      required: 'Du må fylle ut mobilnummer.',
      invalid: 'Du må fylle ut et gyldig mobilnummer.',
    },
    email: {
      required: 'Du må fylle ut e-post.',
      invalid: 'Du må fylle ut en gyldig e-post.',
      tooLong: 'E-posten er for lang. Maks lengde er 254 tegn.',
    },
    nationalIdNumber: {
      required: 'Du må fylle ut fødselsnummer.',
      invalid: 'Du må fylle ut et gyldig fødselsnummer.',
      invalidWithDNumber: 'Du må fylle ut et gyldig fødselsnummer eller d-nummer.',
    },
    requiredText: {
      required: 'Du må fylle ut dette feltet.',
      tooLong: (max) => `Maks lengde er ${max} tegn.`,
    },
    birthDate: {
      required: 'Du må fylle ut en dato.',
      invalid: 'Du må fylle ut en gyldig dato.',
      inFuture: 'Du kan ikke velge en dato fram i tid.',
      before1900: 'Du kan ikke velge en dato før 1900.',
      tooYoung: (minimumAge) => `Du må være minst ${minimumAge} år.`,
    },
  },
  sv: {
    mobileNumber: {
      required: 'Du måste fylla i mobilnummer.',
      invalid: 'Du måste fylla i ett giltigt mobilnummer.',
    },
    email: {
      required: 'Du måste fylla i e-post.',
      invalid: 'Du måste fylla i en giltig e-postadress.',
      tooLong: 'E-postadressen är för lång. Max längd är 254 tecken.',
    },
    nationalIdNumber: {
      required: 'Du måste fylla i personnummer.',
      invalid: 'Du måste fylla i ett giltigt personnummer.',
      invalidWithDNumber: 'Du måste fylla i ett giltigt personnummer.',
    },
    requiredText: {
      required: 'Du måste fylla i det här fältet.',
      tooLong: (max) => `Max ${max} tecken.`,
    },
    birthDate: {
      required: 'Du måste fylla i ett datum.',
      invalid: 'Du måste ange ett giltigt datum.',
      inFuture: 'Du kan inte välja ett datum i framtiden.',
      before1900: 'Du kan inte välja ett datum före 1900.',
      tooYoung: (minimumAge) => `Du måste vara minst ${minimumAge} år.`,
    },
  },
  en: {
    mobileNumber: {
      required: 'Please enter a mobile number.',
      invalid: 'Please enter a valid mobile number.',
    },
    email: {
      required: 'Please enter an email address.',
      invalid: 'Please enter a valid email address.',
      tooLong: 'The email address is too long. The maximum length is 254 characters.',
    },
    nationalIdNumber: {
      required: 'Please enter a national identity number.',
      invalid: 'Please enter a valid national identity number.',
      invalidWithDNumber: 'Please enter a valid national identity number or D number.',
    },
    requiredText: {
      required: 'Please fill in this field.',
      tooLong: (max) => `The maximum length is ${max} characters.`,
    },
    birthDate: {
      required: 'Please enter a date.',
      invalid: 'Please enter a valid date.',
      inFuture: 'You cannot choose a date in the future.',
      before1900: 'You cannot choose a date before 1900.',
      tooYoung: (minimumAge) => `You must be at least ${minimumAge} years old.`,
    },
  },
};
