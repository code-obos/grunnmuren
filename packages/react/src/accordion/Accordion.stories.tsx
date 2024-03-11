import { StoryObj, Meta } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion';
import { Content, Heading } from '..';

const rammelån =
  'Den største forskjellen mellom et vanlig boliglån og et rammelån er fleksibiliteten. Med et rammelån kan du velge å betale mindre ned på lånet i trangere tider, hvis du for eksempel i en periode opplever å få andre uforutsette utgifter. Med et rammelån kan det friste å bruke mer penger enn det du egentlig har behov for. Derfor er det viktig at du har god økonomisk disiplin, og vi anbefaler alltid å sette opp et fast månedlig trekk som minimum dekker dekker rentene. Du kan når som helst betale ned på rammelånet ditt. Det gjør du enkelt i mobilbanken eller nettbanken ved å overføre beløpet du ønsker fra en konto og inn til rammelånet.';
const rammelån2 = (
  <p>
    Om du bør velge rammelån eller boliglån avhenger av den økonomiske
    situasjonen din, preferansene dine og hvor mye fleksibilitet du ønsker
    knyttet til nedbetaling av lånet. <br />
    <br /> De viktigste forskjellene på rammelån og boliglån som du bør være
    klar over før du tar et valg:
    <br />
  </p>
);
const list = (
  <ul className="list-inside list-disc p-2">
    <li>
      Fleksibilitet: Rammelån gir deg større fleksibilitet til å låne og betale
      tilbake penger etter behov, mens et vanlig boliglån har en fast
      nedbetalingsplan.
    </li>
    <li>
      Nedbetaling av lånet: Et vanlig boliglån har en fastsatt nedbetalingsplan,
      mens rammelånet gir deg mer frihet til å velge når og hvor mye du ønsker å
      betale tilbake.
    </li>
    <li>
      Beregning av renter: Med et rammelån betaler du renter bare på det beløpet
      du faktisk har brukt, mens med et vanlig boliglån baserer renter seg på
      hele lånebeløpet.
    </li>
  </ul>
);
const boligspar = (
  <Content>
    Ønsker du å overføre penger fra Boligspar Ung til en av dine andre kontoer,
    er det en enkel sak. <a href="#">Logg inn i nettbanken</a> og velg
    &quot;Uttak Boligspar&quot; Ung i menyen. Slik som BSU, kan du ta ut det du
    har spart inneværende år. Om du vil ta ut mer vil kontoen avsluttes.{' '}
  </Content>
);

const meta: Meta<typeof Accordion> = {
  title: 'Accordion',
  component: Accordion,
  parameters: {
    // disable built in padding in story, because we provide our own
    layout: 'fullscreen',
  },
  render: () => {
    return (
      <Accordion>
        <AccordionItem>
          <Heading level={2}>Hvordan betaler jeg ned på rammelånet?</Heading>
          <Content>{rammelån}</Content>
        </AccordionItem>
        <AccordionItem>
          <Heading level={2}>Bør jeg velge rammelån eller boliglån?</Heading>
          <Content>
            {rammelån2}
            {list}
          </Content>
        </AccordionItem>
        <AccordionItem>
          <Heading level={2}>Overfør penger fra Boligspar Ung?</Heading>
          {boligspar}
        </AccordionItem>
      </Accordion>
    );
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem>
        <Heading level={2}>Hvordan betaler jeg ned på rammelånet?</Heading>
        <Content>{rammelån}</Content>
      </AccordionItem>
      <AccordionItem>
        <Heading level={2}>Bør jeg velge rammelån eller boliglån?</Heading>
        <Content>
          {rammelån2}
          {list}
        </Content>
      </AccordionItem>
      <AccordionItem>
        <Heading level={2}>Overfør penger fra Boligspar Ung?</Heading>
        {boligspar}
      </AccordionItem>
    </Accordion>
  ),
};

export const WithBackground = () => {
  return (
    <div className="bg-mint p-6">
      <Accordion>
        <AccordionItem>
          <Heading level={2}>Hvordan betaler jeg ned på rammelånet?</Heading>
          <Content>{rammelån}</Content>
        </AccordionItem>
        <AccordionItem>
          <Heading level={2}>Bør jeg velge rammelån eller boliglån?</Heading>
          <Content>
            {rammelån2}
            {list}
          </Content>
        </AccordionItem>
        <AccordionItem>
          <Heading level={2}>Overfør penger fra Boligspar Ung?</Heading>
          {boligspar}
        </AccordionItem>
      </Accordion>
    </div>
  );
};
