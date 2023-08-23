import { OBOSFont } from '@/fonts';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={OBOSFont.variable} lang="nb-NO">
      <body className="bg-sky">
        <main>{children}</main>
      </body>
    </html>
  );
}
