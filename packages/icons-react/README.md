# @obosbbl/grunnmuren-icons-react

[![npm canary version](https://img.shields.io/npm/v/@obosbbl%2Fgrunnmuren-icons-react/canary.svg)](https://www.npmjs.com/package/@obosbbl/grunnmuren-icons-react)

Grunnmuren's icon set as React components.

If you want the raw SVG files for the icons, see [`@obosbbl/grunnmuren-icons-svg`](../@obosbbl/grunnmuren-icons-svg) instead.

## Install

```sh
# npm
npm install @obosbbl/grunnmuren-icons-react@canary

# pnpm
pnpm add @obosbbl/grunnmuren-icons-react@canary
```

## Usage

```jsx
import { House } from '@obosbbl/grunnmuren-icons-react';

export function Page() {
  return <House />;
}
```

## Accessibility

The SVG markup has `role="img"` set to indicate to screen readers that the element should be interpreted as an image.

Since icons mostly are used as a visual decoration, they will also render with `aria-hidden="true"` by default, unless you specify an accessible label using `aria-label`.

```jsx
<House />
// <svg role="img" aria-hidden="true">...</svg>

<House aria-label="Ikon som illustrerer et hus" />
// <svg role="img" aria-label="Hus">...</svg>
```
