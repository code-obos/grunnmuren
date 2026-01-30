---
"@obosbbl/grunnmuren-tailwind": patch
"@obosbbl/grunnmuren-react": patch
---

add new (beta) component: `<Stepper>`. 

A stepper can be used to indicate progress through a predefined process.
It makes it possible for the user to perceive how much is completed, how much that remains and what the current step is.
It is commononly used as a form wizard.

``` tsx
import { UNSAFE_Step as Step, UNSAFE_Stepper as Stepper, UNSAFE_Link as Link } from '@obosbbl/grunnmuren-react';

const MySteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  return (
    <Stepper activeStep={activeStep} onStepChange={setActiveStep}>
      <Step state="completed">
        <Link href="/skjema-steg-1">Personalia</Link>
      </Step>
      <Step progress={50}>
        <Link>Kontaktinformasjon</Link>
      </Step>
      <Step isDisabled>
        <Link>Fakturainformasjon</Text>
      </Step>
      <Step isDisabled>
        <Link>Oppsummering</Text>
      </Step>
    </Stepper>
  );
}
```
