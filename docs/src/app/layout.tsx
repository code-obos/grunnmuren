import { OBOSFont } from '@/fonts';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={OBOSFont.variable} lang="nb-NO">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Grunnmuren designsystem</title>
      </head>
      <body>
        <main className="bg-blue-dark">{children}</main>
      </body>
    </html>
  );
}
