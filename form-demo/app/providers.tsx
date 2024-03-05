// app/providers.tsx
'use client';

import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';
import { useRouter } from 'next/navigation';

export function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: 'nb' | 'sv' | 'en';
}) {
  const router = useRouter();

  return (
    <GrunnmurenProvider locale={locale} navigate={router.push}>
      {children}
    </GrunnmurenProvider>
  );
}
