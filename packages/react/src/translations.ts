import type { Locale } from './use-locale';

type Translation = {
  [key in Locale]: string;
};

type Translations = {
  [x: string]: Translation;
};

const translations: Translations = {
  close: {
    nb: 'Lukk',
    sv: 'Stäng',
    en: 'Close',
  },
  pending: {
    nb: 'venter',
    sv: 'väntar',
    en: 'pending',
  },
  showMore: {
    nb: 'Les mer',
    sv: 'Läs mer',
    en: 'Read more',
  },
  showLess: {
    nb: 'Vis mindre',
    sv: 'Dölj',
    en: 'Show less',
  },
  previous: {
    nb: 'Forrige',
    sv: 'Föregående',
    en: 'Previous',
  },
  next: {
    nb: 'Neste',
    sv: 'Nästa',
    en: 'Next',
  },
  externalLink: {
    nb: '(ekstern lenke)',
    sv: '(extern länk)',
    en: '(external link)',
  },
  formSteps: {
    nb: 'Stegindikator',
    sv: 'Stegindikator',
    en: 'Form steps',
  },
  completed: {
    nb: 'Fullført',
    sv: 'Slutförd',
    en: 'Completed',
  },
  inProgress: {
    nb: 'Påbegynt',
    sv: 'Påbörjad',
    en: 'In progress',
  },
};

export { translations, type Translation, type Translations };
