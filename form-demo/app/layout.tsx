import './globals.css';

export const metadata = {
  title: 'Grunnmuren form examples',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>
        <main className="container-prose">{children}</main>
      </body>
    </html>
  );
}
