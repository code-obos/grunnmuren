import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';
import './globals.css';

export const metadata = {
  title: 'Grunnmuren form examples',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = 'nb';

  return (
    <GrunnmurenProvider locale={locale}>
      <html lang={locale}>
        <body>
          <main className="container-prose">{children}</main>
        </body>
      </html>
    </GrunnmurenProvider>
  );
}
