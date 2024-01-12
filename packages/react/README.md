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

## Localization configuration

Grunnmuren uses [React Aria Components](https://react-spectrum.adobe.com/react-aria/) under the hood. RAC has built in translation strings for non visible content (for accessibility reasons). It also automatically detects the language based on the browser or system language.

To ensure that the language of the page content matches the accessibility strings you should wrap your application in a `I18nProvider`. This will override RAC's automatic locale selection.

In [Next.js](https://nextjs.org/) you can do this in the root [root layout](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required).

Valid locales for Norwegian are `nb-NO` or `nb`, Swedish is `sv-SE` or `sv`.

```js
// app/layout.tsx
import { I18nProvider } from '@obosbbl/grunnmuren-react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // Either 'nb' or 'sv'
  const locale = 'nb';

  return (
    <I18nProvider locale={locale}>
      <html lang={locale}>
        <body>{children}</body>
      </html>
    </I18nProvider>
  )
}
```

See the [RAC internationalization docs](https://react-spectrum.adobe.com/react-aria/internationalization.html) for more information.

## Usage

Before you start using the components you need to configure the [Tailwind preset](../tailwind/). Remember to add this package to the content scan.

```js
import { Button } from '@obosbbl/grunnmuren-react';

export default function () {
  return <Button>Click me</Button>;
}
```
