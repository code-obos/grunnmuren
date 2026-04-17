import { TextField } from '@obosbbl/grunnmuren-react';

import { Code } from '@/ui/code';

import { ComponentInfo, CountryDiffBox, ExampleBlock, StepNavigation } from './shared';
import type { StepProps } from './types';

const PROPS = [
  {
    name: 'name',
    type: 'string',
    description: 'Feltnavn for skjemadata',
  },
  {
    name: 'label',
    type: 'ReactNode',
    default: '"Mobil"',
    description: 'Label for feltet',
  },
  {
    name: 'description',
    type: 'ReactNode',
    description: 'Hjelpetekst under feltet',
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'Forhåndsutfylt verdi',
  },
  {
    name: 'errorMessage',
    type: 'string',
    description: 'Feilmelding',
  },
  {
    name: 'isRequired',
    type: 'boolean',
    description: 'Om feltet er påkrevd',
  },
  {
    name: 'size',
    type: 'number',
    default: '11',
    description: 'Visuell bredde i antall tegn',
  },
  {
    name: 'autoComplete',
    type: 'string',
    description: 'HTML autocomplete-attributt',
  },
];

export function PhoneStep({ onNext, onPrevious, sampleData }: StepProps) {
  return (
    <div className="flex flex-col gap-9">
      <ComponentInfo
        name="Telefon"
        description="Telefonfelt med type='tel' og inputMode='tel'. NO viser +47 som leftAddon, SE skjuler prefikset."
        props={PROPS}
      >
        <Code
          code={`import { TextField } from '@obosbbl/grunnmuren-react';
            
<TextField 
  name="phone" 
  label="Mobil" 
  type="tel"
  inputMode="tel"
  leftAddon="+47"
  withAddonDivider
  defaultValue={form?.phoneNumber}
/>`}
        />
      </ComponentInfo>

      <CountryDiffBox>
        <ul className="flex list-disc flex-col gap-1 pl-4">
          <li>
            <strong>leftAddon:</strong> NO viser "+47" med skillelinje. SE har ingen leftAddon.
          </li>
          <li>
            <strong>Validering:</strong>
            <ul className="ml-4 list-disc">
              <li>NO: 8 siffer, starter med 4 eller 9</li>
              <li>SE: 10 siffer, starter med 07 (070, 072, 073, 076, 079)</li>
            </ul>
          </li>
        </ul>
      </CountryDiffBox>

      <div className="prose">
        <h3 className="heading-s">Validering</h3>
        <p>Bruk @obosbbl/validation for validering av telefonnummer.</p>
      </div>

      <div className="prose">
        <h3 className="heading-s">Når bør du overstyre props?</h3>
        <ul className="text-gray-dark flex flex-col gap-2">
          <li>
            <strong>label:</strong> Overstyr når feltet gjelder en annen person (f.eks. "Foresattes
            mobil", "Barns mobil").
          </li>
          <li>
            <strong>description:</strong> Legg til kontekst når det trengs.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="heading-s">Eksempler</h3>

        <ExampleBlock
          label="Standard"
          description="Grunnleggende bruk - NO viser +47 prefiks, SE viser feltet uten prefiks"
        >
          <TextField
            name="phone"
            label="Mobil"
            type="tel"
            inputMode="tel"
            leftAddon="+47"
            withAddonDivider
            defaultValue={sampleData.phone}
          />
        </ExampleBlock>

        <ExampleBlock label="Med hjelpetekst" description="Brukes i eget barn-skjemaet">
          <TextField
            name="childPhone"
            label="Mobil"
            description="Hvis barnet ikke har mobiltelefon, oppgi nummer til foresatt"
            type="tel"
            inputMode="tel"
            leftAddon="+47"
            withAddonDivider
            defaultValue={sampleData.childPhone}
          />
        </ExampleBlock>

        <ExampleBlock label="Egendefinert label" description="Brukes for foresatt-telefon">
          <TextField
            name="guardianPhone"
            label="Foresattes mobil"
            type="tel"
            inputMode="tel"
            leftAddon="+47"
            withAddonDivider
            defaultValue={sampleData.guardianPhone}
          />
        </ExampleBlock>

        <ExampleBlock label="Med feilmelding" description="Viser valideringsfeil pa feltet">
          <TextField
            name="invalidPhone"
            label="Mobil"
            type="tel"
            inputMode="tel"
            leftAddon="+47"
            withAddonDivider
            errorMessage="Du ma fylle ut et gyldig mobilnummer."
          />
        </ExampleBlock>
      </div>

      <StepNavigation onNext={onNext} onPrevious={onPrevious} />
    </div>
  );
}
