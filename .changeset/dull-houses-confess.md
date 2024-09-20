---
'@obosbbl/grunnmuren-react': minor
---

add `useHref` to GrunnmurenProvider to simplify usage with routers such as Next when using a basepath.

Example with a Next app and the [basePath](https://nextjs.org/docs/app/api-reference/next-config-js/basePath) setting set to `/medlem`.

__Before__
```tsx
import Link from 'next/link';
import { Button } from '@obosbbl/grunnmuren-react';

// Notice how you have to handle the basepath yourself with Grunnmuren's component, but not with Next's.

<Link href="/bli-medlem">Bli medlem</Link>
<Button href="/medlem/bli-medlem">Bli medlem</Button>
```

**After**

```js
// app/providers.tsx
'use client'
import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';
import { useRouter } from 'next/navigation';

export function Providers({children, locale}: { children: React.ReactNode, locale: string}) {
  const router = useRouter();
  const useHref = (href: string) => '/medlem' + href;

  return (
    <GrunnmurenProvider locale={locale} navigate={router.push} useHref={useHref}>
      {children}
    </GrunnmurenProvider>
  )
}
```

```tsx
import Link from 'next/link';
import { Button } from '@obosbbl/grunnmuren-react';

// The hrefs are the same, as basepath is handled by the useHref hook in the provider.

<Link href="/bli-medlem">Bli medlem</Link>
<Button href="/bli-medlem">Bli medlem</Button>
```
