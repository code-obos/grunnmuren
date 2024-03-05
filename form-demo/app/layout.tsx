import './globals.css';
import { Providers } from './providers';

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
    <Providers locale={locale}>
      <html lang={locale}>
        <body>
          <main className="container-prose">{children}</main>
        </body>
      </html>
    </Providers>
  );
}
