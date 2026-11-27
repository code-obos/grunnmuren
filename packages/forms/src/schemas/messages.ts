import type { Locale } from '../locale';

function joinList(items: string[], conjunction: string) {
  return items.length < 2
    ? items.join('')
    : `${items.slice(0, -1).join(', ')} ${conjunction} ${items.at(-1)}`;
}

export type SchemaMessages = {
  mobileNumber: { required: string; invalid: string };
  email: {
    required: string;
    invalid: string;
    tooLong: string;
    specialCharacters: string;
    plusSign: string;
  };
  memberNumber: { required: string; invalid: string };
  phonePrefix: { required: string; tooLong: string };
  file: {
    invalidType: (extensions: string[]) => string;
    tooLarge: (maxSizeInMB: number) => string;
    tooMany: (maxFiles: number) => string;
  };
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
      tooLong: 'E-posten er for lang. Maks lengde er 102 tegn.',
      specialCharacters: 'E-postadressen kan ikke inneholde spesialtegn, Æ, Ø eller Å.',
      plusSign: 'E-postadressen kan ikke inneholde "+".',
    },
    memberNumber: {
      required: 'Du må fylle ut medlemsnummer.',
      invalid: 'Du må fylle ut et gyldig medlemsnummer.',
    },
    phonePrefix: {
      required: 'Du må fylle ut landskode for mobil.',
      tooLong: 'Landskoden for mobil er for lang. Maks lengde er 10 tegn.',
    },
    file: {
      invalidType: (extensions) => `Kun ${joinList(extensions, 'og')} er tillatt`,
      tooLarge: (maxSizeInMB) => `Maksimal filstørrelse per fil er ${maxSizeInMB}MB`,
      tooMany: (maxFiles) => `Du kan ikke laste opp mer enn ${maxFiles} filer`,
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
      required: 'Du måste fylla i din e-post.',
      invalid: 'Du måste ange en giltig e-postadress.',
      tooLong: 'E-postmeddelandet är för långt. Max längd är 102 tecken.',
      specialCharacters: 'E-postadressen får inte innehålla specialtecken, Å, Ä eller Ö.',
      plusSign: 'E-postadressen får inte innehålla "+".',
    },
    memberNumber: {
      required: 'Du måste fylla i medlemsnummer.',
      invalid: 'Du måste fylla i ett giltigt medlemsnummer.',
    },
    phonePrefix: {
      required: 'Du måste fylla i landskoden för mobil.',
      tooLong: 'Landskoden för mobil är för lång. Max längd är 10 tecken.',
    },
    file: {
      invalidType: (extensions) => `Endast ${joinList(extensions, 'och')} är tillåtna`,
      tooLarge: (maxSizeInMB) => `Maximal filstorlek är ${maxSizeInMB}MB`,
      tooMany: (maxFiles) => `Du kan inte ladda upp fler än ${maxFiles} filer`,
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
      tooLong: 'The email address is too long. The maximum length is 102 characters.',
      specialCharacters: 'The email address cannot contain special characters, Æ, Ø or Å.',
      plusSign: 'The email address cannot contain "+".',
    },
    memberNumber: {
      required: 'Please enter a member number.',
      invalid: 'Please enter a valid member number.',
    },
    phonePrefix: {
      required: 'Please enter the country code for the mobile number.',
      tooLong: 'The country code is too long. The maximum length is 10 characters.',
    },
    file: {
      invalidType: (extensions) => `Only ${joinList(extensions, 'and')} are allowed`,
      tooLarge: (maxSizeInMB) => `The maximum file size per file is ${maxSizeInMB}MB`,
      tooMany: (maxFiles) => `You cannot upload more than ${maxFiles} files`,
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
