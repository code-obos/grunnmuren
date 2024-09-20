# @obosbbl/grunnmuren-react

[![npm canary version](https://img.shields.io/npm/v/@obosbbl%2Fgrunnmuren-react/canary.svg)](https://www.npmjs.com/package/@obosbbl/grunnmuren-react)

Grunnmuren React components.

## Install

```sh
# npm
npm install @obosbbl/grunnmuren-react@canary

# pnpm
pnpm add @obosbbl/grunnmuren-react@canary
```

## Setup

### Internationalization

Grunnmuren uses [React Aria Components](https://react-spectrum.adobe.com/react-aria/) under the hood. RAC has built in translation strings for non visible content (for accessibility reasons). It also automatically detects the language based on the browser or system language.

To ensure that the language of the page content matches the accessibility strings you must wrap your application in a `GrunnmurenProvider` with a `locale` prop. This will override RAC's automatic locale selection.

In [Next.js](https://nextjs.org/) you can do this in the root [root layout](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required). In order to avoid making `RootLayout` a client component, you should import `GrunnmurenProvider` in a providers-file, that uses `"use client"`

Valid locales are `nb`, `sv` or `en`. The provider defaults to `nb` if unspecified.

```js
// app/providers.tsx
'use client'
import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';

export function Providers({children, locale}: { children: React.ReactNode, locale: 'nb' | 'sv' | 'en'}) {

  return (
    <GrunnmurenProvider locale={locale}>
      {children}
    </GrunnmurenProvider>
  )
}
```

```js
// app/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // Either 'nb', 'sv' or 'en'
  const locale = 'nb';

  return (
    <Providers locale={locale}>
      <html lang={locale}>
        <body>{children}</body>
      </html>
    </Providers>
  )
}
```

See the [RAC internationalization docs](https://react-spectrum.adobe.com/react-aria/internationalization.html) for more information.

### Routing

When using compontents that include links from RAC (For example `Breadcrumbs`), the links will always treat the hrefs as external.

In order to avoid hard refreshing, you need to prop your router navigation-function
through `GrunnmurenProvider`. See the [RAC routing docs](https://react-spectrum.adobe.com/react-aria/routing.html)

In [Next.js](https://nextjs.org/) this is also done in the root [root layout](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required). In order to avoid making `RootLayout` a client component, you should import `GrunnmurenProvider` in a providers-file, that uses `"use client"`

```js
// app/providers.tsx
'use client'
import { GrunnmurenProvider } from '@obosbbl/grunnmuren-react';
import { useRouter } from 'next/navigation';

export function Providers({children, locale}: { children: React.ReactNode, locale: string}) {
  const router = useRouter();

  return (
    <GrunnmurenProvider locale={locale} navigate={router.push}>
      {children}
    </GrunnmurenProvider>
  )
}
```

The `RootLayout` file then looks exactly like it does in the previous step:

```js
// app/layout.tsx
import {Providers} from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // Either 'nb', 'sv' or 'en'
  const locale = 'nb';

  return (
    <Providers locale={locale}>
      <html lang={locale}>
        <body>{children}</body>
      </html>
    </Providers>
  )
}
```

#### Basepath

If you're using a router such as Next's, then you can use the `useHref` prop to convert router-specific hrefs into native HTML hrefs. This is very useful for instance when using Next's [basepath](https://nextjs.org/docs/app/api-reference/next-config-js/basePath) setting, as you can use this to prepend the basepath to all links, similar to Next's `<Link>`.

**Before**

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

### Optimize bundle size by removing unused locales

React Aria Components has built in support for over 30 languages, most of which will be unused in your application. To optimize your applications bundle size, it is recommended to use React Aria's build plugin to remove all the unused locales. Here is a quick example for Next.js:

#### Install

```sh
# npm
npm install @react-aria/optimize-locales-plugin --save-dev

# pnpm
pnpm add -D @react-aria/optimize-locales-plugin
```

#### Configuration

```js
// next.config.js
const optimizeLocales = require('@react-aria/optimize-locales-plugin');

module.exports = {
  webpack(config) {
    config.plugins.push(
      optimizeLocales.webpack({
        // If you have a multitenant app, include both Norwegian and Swedish
        // If your app only serves one language, adjust accordingly
        locales: ['nb', 'sv'],
      }),
    );
    return config;
  },
};
```

The plugin works with several different bundlers. See [React Aria's bundle size optimization docs](https://react-spectrum.adobe.com/react-aria/internationalization.html#optimizing-bundle-size) for more information.

## Usage

Before you start using the components you need to configure the [Tailwind preset](../tailwind/). Remember to add this package to the content scan.

```js
import { Button } from '@obosbbl/grunnmuren-react';

export default function () {
  return <Button>Click me</Button>;
}
```
