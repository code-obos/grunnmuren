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
    default: '"Fødselsdato" (NO) / "Födelsedatum" (SE)',
    description: 'Label for datofeltet',
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
    name: 'isRequired',
    type: 'boolean',
    default: 'true',
    description: 'Om feltet er pakrevd',
  },
];

export function BirthDateStep({ onNext, onPrevious, sampleData }: StepProps) {
  return (
    <div className="flex flex-col gap-9">
      <ComponentInfo
        name="Fødselsdato"
        description="Datofelt for fødselsdato. Bruker TextField med type='date' og size=10."
        props={PROPS}
      >
        <Code
          code={`import { TextField } from '@obosbbl/grunnmuren-react';
      
<TextField 
  name="birthDate" 
  label="Fødselsdato" 
  type="date"
  size={10}
  defaultValue="1980-06-15"
  isRequired
  errorMessage={form?.errorMessage?.birthDate}
/>`}
        />
      </ComponentInfo>

      <CountryDiffBox>
        <ul className="flex list-disc flex-col gap-1 pl-4">
          <li>
            <strong>Label:</strong> "Fødselsdato" (NO) / "Födelsedatum" (SE)
          </li>
        </ul>
      </CountryDiffBox>

      <div className="prose">
        <h3 className="heading-s">Validering</h3>
        <ul className="text-gray-dark flex list-disc flex-col gap-1 pl-4">
          <li>Format: yyyy-MM-dd</li>
          <li>Kan ikke være i fremtiden</li>
          <li>Kan ikke være før 1900</li>
        </ul>
      </div>

      <div className="prose">
        <h3 className="heading-s">Når bør du overstyre props?</h3>
        <ul className="text-gray-dark flex list-disc flex-col gap-2 pl-4">
          <li>
            <strong>label:</strong> Overstyr når feltet gjelder en annen person enn brukeren selv
            (f.eks. vitne, mottaker).
          </li>
          <li>
            <strong>description:</strong> Legg til hjelpetekst når det er spesielle krav - f.eks.
            "Vitne må være over 18 år".
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="heading-s">Eksempler</h3>

        <ExampleBlock label="Standard (påkrevd)" description="Grunnleggende bruk">
          <TextField
            name="birthDate"
            size={10}
            label="Fødselsdato"
            type="date"
            defaultValue={sampleData.birthdate}
          />
        </ExampleBlock>

        <ExampleBlock
          label="Med egendefinert label"
          description="Brukes for vitne i overføringsskjemaet"
        >
          <TextField
            name="witnessBirthDate"
            label="Fødselsdato (vitne)"
            type="date"
            size={10}
            defaultValue="1980-06-15"
          />
        </ExampleBlock>

        <ExampleBlock label="Med hjelpetekst" description="Brukes når det er alderskrav">
          <TextField
            name="adultBirthDate"
            label="Fødselsdato"
            description="Vitne må være over 18 år"
            type="date"
            size={10}
            defaultValue="1980-06-15"
          />
        </ExampleBlock>

        <ExampleBlock label="Med feilmelding" description="Viser feilstatus på feltet">
          <TextField
            name="invalidBirthDate"
            label="Fødselsdato"
            size={10}
            type="date"
            errorMessage="Du kan ikke velge en dato fram i tid."
          />
        </ExampleBlock>
      </div>

      <StepNavigation onNext={onNext} onPrevious={onPrevious} />
    </div>
  );
}
