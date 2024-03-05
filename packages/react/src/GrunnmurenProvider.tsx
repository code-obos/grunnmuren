import { I18nProvider, RouterProvider } from 'react-aria-components';

type GrunnmurenProviderProps = {
  children: React.ReactNode;
  /**
   *  The locale to apply to the children.
   *  @default nb
   */
  locale?: 'nb' | 'sv' | 'en';

  /** The router to use for navigation */
  navigate?: (path: string) => void;
};

function GrunnmurenProvider({
  children,
  locale = 'nb',
  navigate,
}: GrunnmurenProviderProps) {
  return (
    <I18nProvider locale={locale}>
      {navigate ? (
        <RouterProvider navigate={navigate}>{children}</RouterProvider>
      ) : (
        children
      )}
    </I18nProvider>
  );
}

export { type GrunnmurenProviderProps, GrunnmurenProvider };
