import {
  Alertbox,
  Button,
  Card,
  UNSAFE_Link as Link,
  Content,
  Heading,
  Footer,
} from '@obosbbl/grunnmuren-react';
import { clsx } from 'clsx';

import { Code } from '@/ui/code';

import { ComponentInfo, ExampleBlock, StepNavigation } from './shared';
import type { StepProps } from './types';

const EDITABLE_CARD_PROPS = [
  {
    name: 'title',
    type: 'ReactNode',
    description: 'Overskrift i kortet',
  },
  {
    name: 'variant',
    type: '"default" | "muted"',
    default: '"default"',
    description: 'Visuell variant for redigerbar/ikke-redigerbar data',
  },
  {
    name: 'editAction',
    type: 'ReactNode',
    description: 'Handlingslenke eller knapp nederst i kortet',
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Innhold i kortet — typisk navn, personlig informasjon, foresatt-info',
  },
];

function DisplayList({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-light rounded-md p-4">
      <dl className="grid gap-2">{children}</dl>
    </div>
  );
}

function DisplayItem({ label, value }: { label: string; value?: string }) {
  if (!value) {
    return null;
  }

  return (
    <div className="grid gap-0.5 md:grid-cols-[10rem_1fr] md:gap-2">
      <dt className="font-medium">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

interface EditableCardProps {
  title?: string;
  children: React.ReactNode;
  editAction: React.ReactNode;
  variant?: 'default' | 'muted';
}

function EditableCard({ title, children, editAction, variant = 'default' }: EditableCardProps) {
  return (
    <div className="flex flex-col gap-4">
      {title && <h3 className="heading-s">{title}</h3>}
      <Card variant="outlined" className="max-w-md [&>div]:p-6">
        <div
          className={clsx(
            'flex flex-col gap-1',
            variant === 'muted' && 'rounded-lg bg-gray-lightest p-4',
          )}
        >
          {children}
        </div>
        <hr className="border-gray my-0" />
        {editAction}
      </Card>
    </div>
  );
}

export function DisplayStep({ onPrevious, sampleData }: StepProps) {
  return (
    <div className="flex flex-col gap-9">
      <section className="flex flex-col gap-2">
        <h2 className="heading-m">Visningskomponenter</h2>
        <p>Komponenter for a vise data - brukes i oppsummeringssteg og informasjonskort.</p>
      </section>

      <ComponentInfo
        name="EditableCard"
        description="Kort med endre-handling. Brukes i oppsummeringssteg for a vise utfylt informasjon med mulighet til a ga tilbake og endre."
        props={EDITABLE_CARD_PROPS}
      >
        <Code
          code={`<div className="flex flex-col gap-4">
  {title && <h3 className="heading-s">{title}</h3>}
  <Card variant="outlined" className="max-w-md [&>div]:p-6">
    <div
      className={clsx(
        'flex flex-col gap-1',
        variant === 'muted' && 'rounded-lg bg-gray-lightest p-4',
      )}
    >
      {children}
    </div>
    <hr className="border-gray my-0" />
    {editAction}
  </Card>
</div>`}
        />
      </ComponentInfo>

      <div className="prose flex flex-col gap-2">
        <h3 className="heading-s">Når bør du overstyre props?</h3>
        <ul className="text-gray-dark flex flex-col gap-2">
          <li>
            <strong>variant:</strong> Bruk "default" når informasjonen er fylt ut av brukeren. Bruk
            "muted" når informasjonen kommer fra innlogging/BIS og ikke kan endres her.
          </li>
          <li>
            <strong>title:</strong> Legg til når det er flere kort i oppsummeringen og brukeren
            trenger kontekst (f.eks. "Mottaker", "Fra", "Til").
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <ExampleBlock
          label="default - utfylt av bruker"
          description="Endre-knappen navigerer tilbake til steget der informasjonen ble fylt ut"
        >
          <EditableCard
            title="Mottaker"
            editAction={
              <Button variant="secondary" className="w-fit">
                Endre
              </Button>
            }
          >
            <p className="heading-xs">
              {sampleData.firstName} {sampleData.lastName}
            </p>
            <p>
              <span className="block font-semibold sm:inline">Født:</span> {sampleData.birthdate}
            </p>
            <p>
              <span className="block font-semibold sm:inline">Mobil:</span> {sampleData.phone}
            </p>
            <p>
              <span className="block font-semibold sm:inline">E-post:</span> {sampleData.email}
            </p>
            <p>
              <span className="block font-semibold sm:inline">Adresse:</span>{' '}
              {sampleData.address.streetAddress} {sampleData.address.houseNumber},{' '}
              {sampleData.address.postalCode}{' '}
            </p>
            <p>
              <span className="block font-semibold sm:inline">c/o:</span> {sampleData.careOfName}
            </p>
          </EditableCard>
        </ExampleBlock>

        <ExampleBlock
          label="muted - data fra innlogging"
          description="Gra bakgrunn signaliserer at innholdet ikke kan endres her."
        >
          <EditableCard
            title="Mottaker"
            variant="muted"
            editAction={
              <Link href="https://obos.no/minside/innstillinger/endre-kontaktinformasjon">
                Endre pa Min side
              </Link>
            }
          >
            <p className="heading-xs">
              {sampleData.firstName} {sampleData.lastName}
            </p>
            <p>
              <span className="block font-semibold sm:inline">Født:</span> {sampleData.birthdate}
            </p>
            <p>
              <span className="block font-semibold sm:inline">Mobil:</span> {sampleData.phone}
            </p>
            <p>
              <span className="block font-semibold sm:inline">E-post:</span> {sampleData.email}
            </p>
            <p>
              <span className="block font-semibold sm:inline">Adresse:</span>{' '}
              {sampleData.address.streetAddress} {sampleData.address.houseNumber},{' '}
              {sampleData.address.postalCode}{' '}
            </p>
            <p>
              <span className="block font-semibold sm:inline">c/o:</span> {sampleData.careOfName}
            </p>
          </EditableCard>
        </ExampleBlock>

        <ExampleBlock
          label="default - med foresatt"
          description="når mottaker er mindrearig, vises foresatt-info under mottakerens info i samme kort"
        >
          <EditableCard
            title="Til"
            editAction={
              <Button variant="secondary" className="w-fit">
                Endre
              </Button>
            }
          >
            <p className="heading-xs">
              {sampleData.firstName} {sampleData.lastName}
            </p>
            <p>
              <span className="block font-semibold sm:inline">Født:</span> {sampleData.birthdate}
            </p>
            <p>
              <span className="block font-semibold sm:inline">Mobil:</span> {sampleData.phone}
            </p>
            <div className="mt-4 flex flex-col gap-1">
              <p className="heading-xs">Foresatt</p>
              <p>
                <span className="block font-semibold sm:inline">Navn:</span>{' '}
                {sampleData.guardianFirstName} {sampleData.guardianLastName}
              </p>
              <p>
                <span className="block font-semibold sm:inline">Mobil:</span>{' '}
                {sampleData.guardianPhone}
              </p>
            </div>
          </EditableCard>
        </ExampleBlock>
      </div>

      <ComponentInfo
        name="Display personal information"
        description="Grå boks for visning av personinfo."
      >
        <Code
          code={`<div className="bg-gray-light rounded-md p-4">
  <dl className="grid gap-2">
    <div className="grid gap-0.5 md:grid-cols-[10rem_1fr] md:gap-2">
      <dt className="font-medium">{label}</dt>
      <dd>{value}</dd>
    </div>
  </dl>
</div>`}
        />
      </ComponentInfo>

      <div className="flex flex-col gap-6">
        <ExampleBlock
          label="PersonalInfoDisplay - alle felter"
          description="Viser personinfo i en grå boks"
        >
          <DisplayList>
            <DisplayItem label="Navn" value="Ola Nordmann" />
            <DisplayItem label="Fødselsdato" value="15.01.1990" />
            <DisplayItem label="Mobil" value="+47 123 45 678" />
            <DisplayItem label="E-post" value={sampleData.email} />
            <DisplayItem
              label="Adresse"
              value={`${sampleData.address.streetAddress} ${sampleData.address.houseNumber}, ${sampleData.address.postalCode} ${sampleData.address.postalDistrict}`}
            />
          </DisplayList>
        </ExampleBlock>

        <ExampleBlock
          label="PersonalInfoDisplay - med overskrift"
          description="Brukes i innmeldingsskjemaet for a vise data fra BankID"
        >
          <DisplayList>
            <h3 className="heading-s mb-3">Fra BankID:</h3>
            <DisplayItem label="Navn" value="Ola Nordmann" />
            <DisplayItem label="Fødselsnummer" value={sampleData.nationalId} />
            <DisplayItem label="Fødselsdato" value="15.01.1990" />
            <DisplayItem label="Mobil" value="+47 123 45 678" />
            <DisplayItem label="E-post" value={sampleData.email} />
            <DisplayItem
              label="Adresse"
              value={`${sampleData.address.streetAddress} ${sampleData.address.houseNumber}, ${sampleData.address.postalCode} ${sampleData.address.postalDistrict}`}
            />
          </DisplayList>
        </ExampleBlock>
      </div>

      <ComponentInfo
        name="FormError"
        description="Feilmelding ved innsending. Viser generell feilmelding og detaljer for feilen. Brukes i Alertbox med variant 'danger'."
      >
        <Code
          code={`<Alertbox role="alert" variant="danger" className="not-prose">
  <Heading level={3}>
    Vi kunne dessverre ikke behandle din forespørsel. Vennligst prøv igjen senere.
  </Heading>

  <Content>
    {content}
    <Footer>{timestamp}</Footer>
  </Content>
</Alertbox>`}
        />
      </ComponentInfo>

      <div className="flex flex-col gap-6">
        <ExampleBlock
          label="FormError - standard"
          description="Generell feilmelding med tidsstempel"
        >
          <Alertbox role="alert" variant="danger" className="not-prose">
            <Heading level={3}>
              Vi kunne dessverre ikke behandle din forespørsel. Vennligst prøv igjen senere.
            </Heading>

            <Content>
              <>
                <Link href="/medlem/medlemsservice/kontaktskjema?topic=Annet">
                  <span className="font-medium">Her kan du melde inn feilen.</span>
                </Link>{' '}
                <p className="mb-6">Feilkoden under vil brukes i henvendelsen din.</p>
                <p>
                  <span className="font-semibold">Feilkode:</span>
                  <code>101</code>
                </p>
              </>
              <Footer>{new Date().toISOString()}</Footer>
            </Content>
          </Alertbox>
        </ExampleBlock>
      </div>

      <StepNavigation onPrevious={onPrevious} />
    </div>
  );
}
