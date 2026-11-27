import {
  ArrowRight,
  ArrowUpRight,
  Download,
  InfoCircle,
  Search,
} from '@obosbbl/grunnmuren-icons-react';
import {
  Accordion,
  AccordionItem,
  Alertbox,
  Backlink,
  Badge,
  Breadcrumb,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Combobox,
  ComboboxItem,
  Content,
  Dialog,
  DialogTrigger,
  Footer,
  Header,
  Heading,
  Label,
  Link,
  Modal,
  NumberField,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tag,
  TagGroup,
  TagList,
  TextArea,
  TextField,
  UNSAFE_Pagination as Pagination,
  UNSAFE_Step as Step,
  UNSAFE_Stepper as Stepper,
  UNSAFE_Table as Table,
  UNSAFE_TableBody as TableBody,
  UNSAFE_TableCell as TableCell,
  UNSAFE_TableColumn as TableColumn,
  UNSAFE_TableHeader as TableHeader,
  UNSAFE_TableRow as TableRow,
  UNSAFE_Toggletip as Toggletip,
  UNSAFE_ToggletipContent as ToggletipContent,
  UNSAFE_ToggletipTrigger as ToggletipTrigger,
} from '@obosbbl/grunnmuren-react';
import { type ReactNode, useState } from 'react';
import { UNSAFE_PortalProvider as PortalProvider } from 'react-aria';

import { SpacingExample } from './spacing-example';
import {
  BRAND_ROLES,
  type BrandRole,
  PREVIEW_THEME,
  ROLE_LABELS,
  type ThemeBuilder,
} from './theme-state';

const Section = ({
  title,
  components,
  children,
}: {
  title: string;
  components: string;
  children: ReactNode;
}) => (
  <section className="grid gap-6">
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-black/15 pb-2">
      <h3 className="heading-xs">{title}</h3>
      <p className="description font-mono">{components}</p>
    </div>
    {children}
  </section>
);

const Row = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap items-center gap-4">{children}</div>
);

const ALERTS = [
  ['info', 'Visning lørdag', 'Leilighetene i blokk B kan sees lørdag kl. 12–14.'],
  ['success', 'Søknaden er sendt', 'Du får svar på e-post innen fem virkedager.'],
  ['warning', 'Fristen nærmer seg', 'Forkjøpsretten må benyttes innen fredag kl. 12.'],
  ['danger', 'Noe gikk galt', 'Vi fikk ikke lagret endringene. Prøv igjen om litt.'],
] as const;

const MUNICIPALITIES = ['Oslo', 'Bærum', 'Lillestrøm', 'Asker', 'Nordre Follo'];
const PROJECTS = ['Fornebu Nord', 'Ulven', 'Kaldnes Brygge', 'Lervig Brygge'];

const APARTMENTS = [
  ['402', '72 m²', '4', 'green-dark', 'Ledig'],
  ['403', '54 m²', '4', 'blue-dark', 'Solgt'],
  ['501', '98 m²', '5', 'gray-dark', 'Reservert'],
] as const;

/**
 * A Modal opens in a portal at the end of the page, outside the preview's `data-theme`, and
 * would get Grunnmuren's own scrim, radius and colours. The PortalProvider opens it inside
 * the preview instead, so it shows the theme.
 */
const ModalExample = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  return (
    <>
      <div ref={setContainer} />
      {container && (
        <PortalProvider getContainer={() => container}>
          <DialogTrigger>
            <Button variant="secondary">Åpne dialog</Button>
            <Modal>
              <Dialog>
                <Header>
                  <Heading level={2}>Reserver leilighet 402</Heading>
                  <Button slot="close" />
                </Header>
                <p>
                  Vi holder av leiligheten til deg i 48 timer. Du kan angre helt frem til da, uten
                  at det koster noe.
                </p>
                <Footer>
                  <Button slot="close" variant="secondary">
                    Avbryt
                  </Button>
                  <Button slot="close">Reserver</Button>
                </Footer>
              </Dialog>
            </Modal>
          </DialogTrigger>
        </PortalProvider>
      )}
    </>
  );
};

/**
 * A page with an open dialog, drawn in place. The real Modal only shows the scrim while it's
 * open, so this is what changes as you drag Bakgrunnsdemping.
 */
const ScrimExample = () => (
  <div
    aria-hidden
    className="bg-background-default relative grid h-56 gap-3 overflow-hidden rounded-lg border border-black/15 p-6"
  >
    <p className="heading-s">Leiligheter i Fornebu Nord</p>
    <p className="description max-w-sm">
      Tre ledige leiligheter fra 54 til 98 m², med balkong og parkering i kjeller.
    </p>
    <div className="flex gap-3">
      <span className="bg-base-default h-10 w-28 rounded-lg" />
      <span className="border-base-default h-10 w-28 rounded-lg border-2" />
    </div>
    <div className="bg-scrim absolute inset-0 grid place-items-center backdrop-blur-sm">
      <div className="bg-neutral-surface-default grid w-64 gap-2 rounded-2xl p-5 shadow-xl">
        <p className="paragraph font-medium">Reserver leilighet 402</p>
        <p className="description">Vi holder av leiligheten til deg i 48 timer.</p>
      </div>
    </div>
  </div>
);

const Gallery = ({ role }: { role: BrandRole }) => {
  const [step, setStep] = useState(1);
  const [page, setPage] = useState(3);

  return (
    <div className="grid gap-12">
      <Section title="Knapper" components="Button">
        <Row>
          <Button color={role}>Primær</Button>
          <Button color={role} variant="secondary">
            Sekundær
          </Button>
          <Button color={role} variant="tertiary">
            Tertiær
          </Button>
        </Row>
        <Row>
          <Button color={role} variant="secondary">
            Se ledige boliger <ArrowRight />
          </Button>
          <Button color={role} isPending>
            Lagrer
          </Button>
          <Button color={role} variant="secondary" isIconOnly aria-label="Søk">
            <Search />
          </Button>
        </Row>
        <div className="bg-primary-base-default flex flex-wrap gap-4 rounded-lg p-4">
          <Button color="contrast">På mørk flate</Button>
          <Button color="contrast" variant="secondary">
            Sekundær på mørk
          </Button>
        </div>
      </Section>

      <Section title="Lenker og navigasjon" components="Link · Backlink · Breadcrumbs">
        <Breadcrumbs>
          <Breadcrumb href="#">Min side</Breadcrumb>
          <Breadcrumb href="#">Innstillinger</Breadcrumb>
          <Breadcrumb>Kontaktinformasjon</Breadcrumb>
        </Breadcrumbs>
        <Row>
          <Link href="#">
            Les mer <ArrowRight />
          </Link>
          <Link href="#">
            obos.no <ArrowUpRight />
          </Link>
          <Link href="#">
            Last ned prospekt <Download />
          </Link>
          <Backlink href="#">Tilbake</Backlink>
        </Row>
      </Section>

      <Section title="Merkelapper" components="Badge">
        <Row>
          <Badge color="blue-dark">Solgt</Badge>
          <Badge color="green-dark">Ledig</Badge>
          <Badge color="sky">3 rom</Badge>
          <Badge color="mint">2 soverom</Badge>
          <Badge color="gray-dark">Reservert</Badge>
          <Badge color="white">72 m²</Badge>
        </Row>
      </Section>

      <Section title="Varsler" components="Alertbox">
        {ALERTS.map(([variant, heading, text]) => (
          <Alertbox key={variant} variant={variant} role="none" isDismissable={variant === 'info'}>
            <Heading level={4}>{heading}</Heading>
            <Content>
              <p>{text}</p>
            </Content>
          </Alertbox>
        ))}
      </Section>

      <Section
        title="Skjema"
        components="TextField · TextArea · NumberField · Select · Combobox · Checkbox · RadioGroup"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <TextField label="Navn" defaultValue="Kari Nordmann" />
          <TextField
            label="E-post"
            errorMessage="Skriv en gyldig e-postadresse"
            defaultValue="kari@"
          />
          <NumberField label="Antall rom" defaultValue={3} />
          <Select label="Kommune" placeholder="Velg kommune">
            {MUNICIPALITIES.map((name) => (
              <SelectItem key={name} id={name}>
                {name}
              </SelectItem>
            ))}
          </Select>
          <Combobox label="Boligprosjekt" placeholder="Søk etter prosjekt">
            {PROJECTS.map((name) => (
              <ComboboxItem key={name} id={name}>
                {name}
              </ComboboxItem>
            ))}
          </Combobox>
          <TextArea label="Melding" description="Maks 500 tegn" className="md:col-span-2" />
          <CheckboxGroup label="Interesser" defaultValue={['nyhetsbrev']}>
            <Checkbox value="nyhetsbrev">Nyhetsbrev</Checkbox>
            <Checkbox value="visning">Varsel om visning</Checkbox>
            <Checkbox value="sms">SMS-varsler</Checkbox>
          </CheckboxGroup>
          <RadioGroup label="Prismodell" defaultValue="ordinary">
            <Radio value="ordinary">Ordinær pris</Radio>
            <Radio value="bostart" description="Kjøp en ny bolig til lavere pris enn markedspris.">
              OBOS Bostart
            </Radio>
            <Radio value="deleie">OBOS Deleie</Radio>
          </RadioGroup>
          <Checkbox isInvalid errorMessage="Du må godta vilkårene for å fortsette">
            Jeg godtar medlemsvilkårene
          </Checkbox>
        </div>
      </Section>

      <Section title="Filtrering" components="TagGroup">
        <TagGroup selectionMode="multiple" defaultSelectedKeys={['2', '3']}>
          <Label>Antall rom</Label>
          <TagList className="mt-2">
            <Tag id="1">1 rom</Tag>
            <Tag id="2">2 rom</Tag>
            <Tag id="3">3 rom</Tag>
            <Tag id="4">4+ rom</Tag>
          </TagList>
        </TagGroup>
      </Section>

      <Section title="Faner, steg og sider" components="Tabs · Stepper* · Pagination*">
        <Tabs defaultSelectedKey="leilighet">
          <TabList aria-label="Boligtyper">
            <Tab id="leilighet">Leilighet</Tab>
            <Tab id="rekkehus">Rekkehus</Tab>
            <Tab id="enebolig">Enebolig</Tab>
          </TabList>
          <TabPanel id="leilighet">
            <p className="pt-4">Leiligheter fra 1 til 5 rom i hele landet.</p>
          </TabPanel>
          <TabPanel id="rekkehus">
            <p className="pt-4">Egen uteplass uten vedlikeholdet til en enebolig.</p>
          </TabPanel>
          <TabPanel id="enebolig">
            <p className="pt-4">Egen tomt og hage i rolige strøk.</p>
          </TabPanel>
        </Tabs>
        <Tabs variant="primary" defaultSelectedKey="leilighet">
          <TabList aria-label="Boligtyper">
            <Tab id="leilighet">Leilighet</Tab>
            <Tab id="rekkehus">Rekkehus</Tab>
            <Tab id="enebolig">Enebolig</Tab>
          </TabList>
          <TabPanel id="leilighet">
            <p className="pt-4">Leiligheter fra 1 til 5 rom i hele landet.</p>
          </TabPanel>
          <TabPanel id="rekkehus">
            <p className="pt-4">Egen uteplass uten vedlikeholdet til en enebolig.</p>
          </TabPanel>
          <TabPanel id="enebolig">
            <p className="pt-4">Egen tomt og hage i rolige strøk.</p>
          </TabPanel>
        </Tabs>
        <Stepper activeStep={step} onStepChange={setStep}>
          {['Personalia', 'Kontaktinformasjon', 'Samtykke', 'Oppsummering'].map((label) => (
            <Step key={label}>
              <Link>{label}</Link>
            </Step>
          ))}
        </Stepper>
        <div className="overflow-x-auto">
          <Pagination count={10} page={page} onChange={setPage} getItemHref={(n) => `#side-${n}`} />
        </div>
      </Section>

      <Section title="Kort" components="Card">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-primary-surface-tinted">
            <Content>
              <Heading level={4}>Boligsparing for ungdom</Heading>
              <p>Spar inntil 27 500 kroner i året og få skattefradrag.</p>
            </Content>
          </Card>
          <Card className="bg-accent-surface-tinted">
            <Content>
              <Heading level={4}>Medlemsfordeler</Heading>
              <p>Rabatter hos over 40 samarbeidspartnere.</p>
            </Content>
          </Card>
        </div>
      </Section>

      <Section title="Innhold" components="Accordion · Toggletip*">
        <Accordion>
          <AccordionItem>
            <Heading level={4}>Hva er forkjøpsrett?</Heading>
            <Content className="prose">
              <p>
                Som medlem kan du kjøpe bolig før den legges ut for salg til andre. Ansiennitet
                avgjør hvem som får tilslag.
              </p>
            </Content>
          </AccordionItem>
          <AccordionItem>
            <Heading level={4}>Hvordan blir jeg medlem?</Heading>
            <Content className="prose">
              <p>Du melder deg inn på obos.no. Medlemskapet koster 300 kroner i året.</p>
            </Content>
          </AccordionItem>
        </Accordion>
        <p className="flex max-w-prose items-center gap-1">
          Felleskostnader
          <Toggletip>
            <ToggletipTrigger aria-label="Mer om felleskostnader" variant="info">
              <InfoCircle />
            </ToggletipTrigger>
            <ToggletipContent aria-label="Mer om felleskostnader">
              Dekker vedlikehold, forsikring, renovasjon og felles gjeld.
            </ToggletipContent>
          </Toggletip>
        </p>
      </Section>

      <Section title="Dialog" components="Modal">
        <ScrimExample />
        <Row>
          <ModalExample />
        </Row>
      </Section>

      <Section title="Tabell" components="Table*">
        <div className="overflow-x-auto">
          <Table aria-label="Ledige boliger">
            <TableHeader>
              <TableColumn isRowHeader>Bolig</TableColumn>
              <TableColumn>Størrelse</TableColumn>
              <TableColumn>Etasje</TableColumn>
              <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
              {APARTMENTS.map(([number, size, floor, color, status]) => (
                <TableRow key={number}>
                  <TableCell>Leilighet {number}</TableCell>
                  <TableCell>{size}</TableCell>
                  <TableCell>{floor}</TableCell>
                  <TableCell>
                    <Badge color={color} size="small">
                      {status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      <Section title="Avstand" components="--gm-space-base">
        <SpacingExample />
      </Section>
    </div>
  );
};

export const ComponentsPreview = ({ builder }: { builder: ThemeBuilder }) => {
  const [role, setRole] = useState<BrandRole>('primary');

  return (
    <div className="grid gap-6">
      <TagGroup
        selectedKeys={[role]}
        disallowEmptySelection
        onSelectionChange={(keys) => {
          const [key] = keys;
          if (key) {
            setRole(key as BrandRole);
          }
        }}
      >
        <Label>Forhåndsvis med fargerolle</Label>
        <TagList className="mt-2">
          {BRAND_ROLES.map((brandRole) => (
            <Tag key={brandRole} id={brandRole}>
              {ROLE_LABELS[brandRole]}
            </Tag>
          ))}
        </TagList>
      </TagGroup>
      <div
        data-theme={PREVIEW_THEME}
        data-color={role}
        className="bg-background-default text-text-default"
      >
        <style>{builder.previewCss}</style>
        <Gallery role={role} />
      </div>
      <p className="description">
        Ekte komponenter fra <code>@obosbbl/grunnmuren-react</code>. * Eksportert som{' '}
        <code>UNSAFE_</code>, API-et kan endres.
      </p>
    </div>
  );
};
