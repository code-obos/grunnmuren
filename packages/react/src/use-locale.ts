import { useLocale } from 'react-aria-components';

type Locale = 'nb' | 'sv' | 'en';

/**
 * Returns the locale set in `<GrunnmurenProvider />`
 */
function _useLocale(): Locale {
  // a small wrapper around react-arias useLocale with a simpler return type with only the locales that we actually support
  const locale = useLocale();

  return locale.locale as Locale;
}

export { _useLocale as useLocale, type Locale };
