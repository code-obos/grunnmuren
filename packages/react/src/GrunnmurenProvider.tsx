'use client';
import { I18nProvider } from 'react-aria-components';

type GrunnmurenProviderProps = {
  children: React.ReactNode;
  /**
   *  The locale to apply to the children.
   *  @default nb
   */
  locale?: 'nb' | 'sv' | 'en';
};

function GrunnmurenProvider({
  children,
  locale = 'nb',
}: GrunnmurenProviderProps) {
  return <I18nProvider locale={locale}>{children}</I18nProvider>;
}

export { type GrunnmurenProviderProps, GrunnmurenProvider };
