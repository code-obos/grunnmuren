import { TextField } from '@obosbbl/grunnmuren-react';

import { Code } from '@/ui/code';

import { ComponentInfo, CountryDiffBox, ExampleBlock, StepNavigation } from './shared';
import type { StepProps } from './types';

const PROPS = [
  {
    name: 'name',
    type: 'string',
    description: 'Feltnavn  i skjemadata',
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'Forhåndsutfylt fornavn',
  },
  {
    name: 'errorMessage',
    type: 'string',
    description: 'Feilmelding',
  },
  {
    name: 'isRequired',
    type: 'boolean',
    default: 'true',
    description: 'Om feltet er påkrevd',
  },
  {
    name: 'label',
    type: 'ReactNode',
    default: '"Fornavn og mellomnavn" (NO) / "Förnamn" (SE)',
    description: 'Label for fornavn-feltet',
  },
  {
    name: 'description',
    type: 'ReactNode',
    description: 'Hjelpetekst under label',
  },
  {
    name: 'autoComplete',
    type: 'boolean',
    default: 'undefined → "given-name" / "family-name"',
    description:
      'true/undefined sender "given-name"/"family-name" til feltene. false deaktiverer autoComplete.',
  },
];

export function NameFieldsStep({ onNext, sampleData }: StepProps) {
  return (
    <div className="flex flex-col gap-9">
      <ComponentInfo
        name="Navn"
        description="Hvordan vise fornavn og etternavn i skjema"
        props={PROPS}
      >
        <Code
          code={`import { TextField } from '@obosbbl/grunnmuren-react';

<TextField 
  name="firstName" 
  label="Fornavn og mellomnavn" 
  defaultValue="John"
  isRequired
  errorMessage={form?.errorMessage?.firstName}
/>

<TextField 
  name="lastName"
  label="Etternavn" 
  defaultValue="Doe"
  isRequired
  errorMessage={form?.errorMessage?.lastName}
/>`}
        />
      </ComponentInfo>

      <div className="prose">
        <CountryDiffBox>
          <ul className="flex list-disc flex-col gap-1 pl-4">
            <li>
              <strong>Fornavn-label:</strong> &quot;Fornavn og mellomnavn&quot; (NO) /
              &quot;Förnamn&quot; (SE)
            </li>
            <li>
              <strong>Etternavn-label:</strong> &quot;Etternavn&quot; (NO) / &quot;Efternamn&quot;
              (SE)
            </li>
            <li>
              <strong>Validering:</strong> Identisk — maks 50 tegn for begge land
            </li>
          </ul>
        </CountryDiffBox>
        <h3 className="heading-s">Når bør du overstyre props?</h3>
        <ul className="text-gray-dark flex list-disc flex-col gap-2 pl-4">
          <li>
            <strong>label:</strong> Overstyr når feltene gjelder en annen person enn brukeren selv
            (f.eks. mottaker, giver, foresatt, vitne). Standard-labels ("Fornavn og mellomnavn" /
            "Etternavn") passer kun for brukerens egne opplysninger.
          </li>
          <li>
            <strong>autoComplete:</strong> Sett til false når feltene ikke gjelder brukeren selv.
            Browser autoComplete vil ellers fylle inn brukerens egne data i felt ment for en annen
            person.{' '}
          </li>
          <li>
            <strong>description:</strong> Legg til hjelpetekst når det er spesielle krav eller
            kontekst brukeren trenger — f.eks. "Navn som står i folkeregisteret".{' '}
          </li>
        </ul>
        <p className="text-gray-dark mt-1">
          Generelt: bruk standard-props når feltet gjelder brukerens egne opplysninger. Overstyr
          label og deaktiver autoComplete når feltet gjelder en annen person.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="heading-s">Eksempler</h3>

        <ExampleBlock
          label="Standard med autoComplete"
          description="Typisk bruk i innmeldingsskjema"
        >
          <TextField
            name="firstName"
            label="Fornavn og mellomnavn"
            defaultValue={sampleData.firstName}
          />
          <TextField name="lastName" label="Etternavn" defaultValue={sampleData.lastName} />
        </ExampleBlock>

        <ExampleBlock
          label="Egendefinerte labels"
          description="Brukes når feltet gjelder en annen person, f.eks. mottaker"
        >
          <TextField
            name="recipientFirstName"
            label="Mottakers fornavn"
            defaultValue={sampleData.firstName}
          />
          <TextField
            name="recipientLastName"
            label="Mottakers etternavn"
            defaultValue={sampleData.lastName}
          />
        </ExampleBlock>

        <ExampleBlock
          label="Uten autoComplete"
          description="For foresatt/mottaker-felt der browser autoComplete ville fylt inn feil person"
        >
          <TextField
            name="guardianFirstName"
            label="Fornavn og mellomnavn"
            defaultValue={sampleData.guardianFirstName}
          />
          <TextField
            name="guardianLastName"
            label="Etternavn"
            defaultValue={sampleData.guardianLastName}
          />
        </ExampleBlock>

        <ExampleBlock label="Med feilmeldinger" description="Viser feilstatus på begge feltene">
          <TextField
            name="errorFirstName"
            label="Fornavn og mellomnavn"
            errorMessage="Du må fylle ut fornavn og evt. mellomnavn."
          />
          <TextField
            name="errorLastName"
            label="Etternavn"
            errorMessage="Du må fylle ut etternavn."
          />
        </ExampleBlock>

        <ExampleBlock
          label="Individuelle felt"
          description="FirstNameField og LastNameField kan brukes hver for seg, f.eks. i overføringsskjemaet"
        >
          <TextField
            name="giverFirstName"
            label="Givers fornavn"
            defaultValue={sampleData.firstName}
          />
          <TextField
            name="giverLastName"
            label="Givers etternavn"
            defaultValue={sampleData.lastName}
          />
        </ExampleBlock>
      </div>

      <StepNavigation onNext={onNext} />
    </div>
  );
}
