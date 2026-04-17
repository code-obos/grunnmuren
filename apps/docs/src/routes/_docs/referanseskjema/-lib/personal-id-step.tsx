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
    default: '"Fodsels- og personnummer" (NO) / "Personnummer" (SE)',
    description: 'Label for feltet',
  },
  {
    name: 'description',
    type: 'ReactNode',
    default: '"11 siffer" (NO) / "AAAAMMDD-XXXX" (SE)',
    description: 'Hjelpetekst for format',
  },
  {
    name: 'size',
    type: 'number',
    default: '12 (NO) / 13 (SE)',
    description: 'Visuell bredde i antall tegn',
  },
  {
    name: 'inputMode',
    type: 'string',
    default: '"numeric" (NO) / "text" (SE)',
    description: '"numeric" for NO (kun siffer), "text" for SE (bindestrek i personnummer)',
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'Forhåndsutfylt verdi',
  },
  {
    name: 'errorMessage',
    type: 'ReactNode',
    description: 'Feilmelding',
  },
  {
    name: 'isRequired',
    type: 'boolean',
    description: 'Om feltet er påkrevd',
  },
  {
    name: '...rest',
    type: 'TextFieldProps',
    description: 'Alle andre props videresendes til TextField',
  },
];

export function PersonalIdStep({ onNext, onPrevious, sampleData }: StepProps) {
  return (
    <div className="flex flex-col gap-9">
      <ComponentInfo
        name="Fødsels- og personnummer"
        description="Felt for fødsels- og personnummer. Bruker TextField med size=12/13 og inputMode for å tilpasse for NO/SE."
        props={PROPS}
      >
        <Code
          code={`import { TextField } from '@obosbbl/grunnmuren-react';
      
<TextField 
  name="nationalIdNumber" 
  label="Fødsels- og personnummer" 
  size={12}
  isRequired
  errorMessage={form?.errorMessage?.birthDate}
/>`}
        />
      </ComponentInfo>

      <CountryDiffBox>
        <ul className="flex list-disc flex-col gap-1 pl-4">
          <li>
            <strong>Label:</strong> "Fødsels- og personnummer" (NO) / "Personnummer" (SE)
          </li>
          <li>
            <strong>Description:</strong> "11 siffer" (NO) / "YYYYMMDD-XXXX" (SE)
          </li>
          <li>
            <strong>Size:</strong> 12 (NO) / 13 (SE)
          </li>
          <li>
            <strong>InputMode:</strong> "numeric" (NO) / "text" (SE)
          </li>
          <li>
            <strong>NO-validering:</strong> @obosbbl/validation/no
          </li>
          <li>
            <strong>SE-validering:</strong> @obosbbl/validation/se
          </li>
        </ul>
      </CountryDiffBox>

      <div className="prose">
        <h3 className="heading-s">Validering</h3>
        <p>
          Bruk våre valideringsfunksjoner fra @obosbbl/validation/no og @obosbbl/validation/se for å
          sikre korrekt format.
        </p>
      </div>

      <div className="prose flex flex-col gap-2">
        <h3 className="heading-s">Når bør du overstyre props?</h3>
        <ul className="text-gray-dark flex flex-col gap-2">
          <li>
            <strong>label:</strong> Overstyr når feltet gjelder en annen person enn brukeren selv.
          </li>
          <li>
            <strong>description / size / inputMode:</strong> Sjelden nødvendig å overstyre.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="heading-s">Eksempler</h3>

        <ExampleBlock label="Standard" description="Typisk bruk med 11 siffer og numerisk tastatur">
          <TextField
            name="nationalId"
            label="Fødsels- og personnummer"
            description="11 siffer"
            defaultValue={sampleData.nationalId}
            inputMode="numeric"
            size={12}
          />
        </ExampleBlock>

        <ExampleBlock
          label="Egendefinert label"
          description="Brukes i dødsbo-skjemaet for avdødes personnummer"
        >
          <TextField
            name="deceasedNationalId"
            label="Avdødes personnummer"
            description="11 siffer"
            defaultValue={sampleData.nationalId}
            inputMode="numeric"
            size={12}
          />
        </ExampleBlock>

        <ExampleBlock label="Med feilmelding" description="Viser valideringsfeil pa feltet">
          <TextField
            name="invalidNationalId"
            label="Fødsels- og personnummer"
            description="11 siffer"
            errorMessage="Du må fylle ut et gyldig fødsels- og personnummer."
            inputMode="numeric"
            size={12}
          />
        </ExampleBlock>
      </div>

      <StepNavigation onNext={onNext} onPrevious={onPrevious} />
    </div>
  );
}
