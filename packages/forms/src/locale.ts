export type Locale = 'nb' | 'sv' | 'en';
export type Market = 'no' | 'se';

/** Narrows a BCP 47 tag from react-aria (e.g. `nb-NO`) to a supported locale, defaulting to `nb`. */
export function toLocale(tag: string): Locale {
  const language = tag.toLowerCase().split('-')[0];
  if (language === 'sv') return 'sv';
  if (language === 'en') return 'en';
  return 'nb';
}

/** Swedish locale means the Swedish market (phone, personnummer); everything else is Norway. */
export function marketFor(locale: Locale): Market {
  return locale === 'sv' ? 'se' : 'no';
}
