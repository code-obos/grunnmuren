import { TextField } from '@obosbbl/grunnmuren-react';

import { Code } from '@/ui/code';

import { ComponentInfo, CountryDiffBox, ExampleBlock, StepNavigation } from './shared';
import type { StepProps } from './types';

const PROPS = [
  {
    name: 'name',
    type: 'string',
    description: 'Feltnavn i skjemadata',
  },
  {
    name: 'label',
    type: 'ReactNode',
    default: '"E-post"',
    description: 'Label for e-postfeltet',
  },
  {
    name: 'description',
    type: 'ReactNode',
    description: 'Hjelpetekst under feltet',
  },
  {
    name: 'errorMessage',
    type: 'ReactNode',
    description: 'Feilmelding under feltet',
  },
  {
    name: 'type',
    type: 'string',
    default: '"email"',
    description: 'Input-type for browser-validering',
  },
];

export function EmailStep({ onNext, onPrevious, sampleData }: StepProps) {
  return (
    <div className="flex flex-col gap-9">
      <ComponentInfo
        name="E-post"
        description="Datofelt for e-post. Bruker TextField med type='email'."
        props={PROPS}
      >
        <Code
          code={`import { TextField } from '@obosbbl/grunnmuren-react';
      
<TextField 
  name="email" 
  label="E-post" 
  type="email"
  inputMode="email"
  defaultValue={form?.email}
  isRequired
  errorMessage={form?.errorMessage?.email}
/>`}
        />
      </ComponentInfo>

      <CountryDiffBox>
        <p>Ingen forskjeller - label, validering og oppforsel er identisk i begge land.</p>
      </CountryDiffBox>

      <div className="prose flex flex-col gap-2">
        <h3 className="heading-s">Validering</h3>
        <ul className="text-gray-dark flex list-disc flex-col gap-1 pl-4">
          <li>Automatisk trimmet og gjort til lowercase</li>
          <li>Maks 102 tegn (CRM-begrensning)</li>
          <li>Kan ikke inneholde "+" (CRM-begrensning)</li>
          <li>Brukes identisk i alle skjemaer</li>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="heading-s">Når bør du overstyre props?</h3>
        <ul className="text-gray-dark flex flex-col gap-2">
          <li>
            <strong>label:</strong> Sjelden nodvendig - "E-post" passer i de fleste tilfeller.
          </li>
          <li>
            <strong>description:</strong> Legg til hjelpetekst når det trengs kontekst om hva
            e-posten brukes til.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="heading-s">Eksempler</h3>

        <ExampleBlock label="Standard" description="Grunnleggende bruk">
          <TextField
            name="email"
            label="E-post"
            type="email"
            inputMode="email"
            defaultValue={sampleData.email}
          />
        </ExampleBlock>

        <ExampleBlock label="Med hjelpetekst" description="Forklarer hva e-posten brukes til">
          <TextField
            name="emailWithDescription"
            label="E-post"
            description="Medlemsbeviset sendes til denne adressen"
            type="email"
            inputMode="email"
            defaultValue={sampleData.email}
          />
        </ExampleBlock>

        <ExampleBlock
          label="Med feilmelding (+-tegn)"
          description="Viser CRM-begrensningen med + tegn"
        >
          <TextField
            name="invalidEmail"
            label="E-post"
            type="email"
            inputMode="email"
            errorMessage="E-postadressen kan ikke inneholde '+'."
          />
        </ExampleBlock>
      </div>

      <StepNavigation onNext={onNext} onPrevious={onPrevious} />
    </div>
  );
}
