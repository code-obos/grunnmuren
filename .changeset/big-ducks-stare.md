---
"@obosbbl/grunnmuren-react": patch
---

New `<Stepper>` component in beta. Usage:

``` tsx
import { UNSAFE_Step as Step, UNSAFE_Stepper as Stepper } from './stepper';

const MySteps = () => (
    <Stepper currentStep={1}>
      <Step>
        <Link href="/skjema-steg-1">Personalia</Link>
        <ProgressBar value={100} />
      </Step>
      <Step>
        <Link href="/skjema-steg-1">Kontaktinformasjon</Link>
        <ProgressBar value={0} />
      </Step>
      <Step>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={0} />
      </Step>
      <Step>
        <Text>Oppsummering</Text>
      </Step>
    </Stepper>
);
```

Note that you have to calculate the progress yourself and pass the completed percentage to the <ProgressBar> component.