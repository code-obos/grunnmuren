---
"@obosbbl/grunnmuren-react": patch
---

New `<ProgressBar>` component in beta, usage:

``` tsx
import {
  UNSAFE_ProgressBar as ProgressBar,
} from '@obosbbl/grunnmuren-react';

const MyProgressBar = () => <ProgressBar value={30} classsName="w-96" aria-label="Laster..."/>
```

``` tsx
import {
  UNSAFE_ProgressBar as ProgressBar,
  UNSAFE_ProgressBarValueText as ProgressBarValueText,
} from '@obosbbl/grunnmuren-react';

const MyProgressBar = () => (
    <ProgressBar value={50}  classsName="w-96">
        <Label>Laster:</Label>
      <ProgressBarValueText />
    </ProgressBar>
)
```

Note that the `<ProgressBar>` does not have a natural width, so you might have to give it an explicit `width` using the `className` prop. It does however have a `max-width`, set to `100%`.
