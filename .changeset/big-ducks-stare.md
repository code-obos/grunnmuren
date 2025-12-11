---
"@obosbbl/grunnmuren-react": patch
---

New `<Stepper>` component in beta. Usage:

``` tsx
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
```