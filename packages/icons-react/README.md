# @obosbbl/grunnmuren-icons-react

Grunnmuren's icon set as React components.

To reduce the package installation size, this

If you want the raw SVG files for the icons, see [`@obosbbl/grunnmuren-icons-svg`](../@obosbbl/grunnmuren-icons-svg) instead.

## Install

```sh
npm install @obosbbl/grunnmuren-icons-react

pnpm add @obosbbl/grunnmuren-icons-react
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

<House aria-label="Hus" />
// <svg role="img" aria-label="Hus">...</svg>
```
