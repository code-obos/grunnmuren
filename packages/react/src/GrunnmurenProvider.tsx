import { I18nProvider, RouterProvider } from 'react-aria-components';
import type { Locale } from './use-locale';

type RouterProviderProps = React.ComponentProps<typeof RouterProvider>;

type GrunnmurenProviderProps = {
  children: React.ReactNode;
  /**
   *  The locale to apply to the children.
   *  @default nb
   */
  locale?: Locale;

  /** The router to use for client side navigation */
  navigate?: RouterProviderProps['navigate'];
  /** Converts a router-specific href to a native HTML href, e.g. prepending a base path */
  useHref?: RouterProviderProps['useHref'];
};

function GrunnmurenProvider({
  children,
  locale = 'nb',
  navigate,
  useHref,
}: GrunnmurenProviderProps) {
  return (
    <I18nProvider locale={locale}>
      {navigate ? (
        <RouterProvider navigate={navigate} useHref={useHref}>
          {children}
        </RouterProvider>
      ) : (
        children
      )}
    </I18nProvider>
  );
}

export { type GrunnmurenProviderProps, GrunnmurenProvider };
