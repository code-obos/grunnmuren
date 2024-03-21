import { useState, useReducer } from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { Accordion, AccordionItem, AccordionItemProps } from './Accordion';
import { Content, Heading } from '..';

const Template = (args: AccordionItemProps) => {
  return (
    <Accordion>
      <AccordionItem
        onOpenChange={args.onOpenChange}
        defaultOpen={args.defaultOpen}
      >
        <Heading level={2}>Hvordan betaler jeg ned på rammelånet?</Heading>
        <Content className="prose">
          Den største forskjellen mellom et vanlig boliglån og et rammelån er
          fleksibiliteten. Med et rammelån kan du velge å betale mindre ned på
          lånet i trangere tider, hvis du for eksempel i en periode opplever å
          få andre uforutsette utgifter. Med et rammelån kan det friste å bruke
          mer penger enn det du egentlig har behov for. Derfor er det viktig at
          du har god økonomisk disiplin, og vi anbefaler alltid å sette opp et
          fast månedlig trekk som minimum dekker dekker rentene. Du kan når som
          helst betale ned på rammelånet ditt. Det gjør du enkelt i mobilbanken
          eller nettbanken ved å overføre beløpet du ønsker fra en konto og inn
          til rammelånet.
        </Content>
      </AccordionItem>
      <AccordionItem
        onOpenChange={args.onOpenChange}
        defaultOpen={args.defaultOpen}
      >
        <Heading level={2}>Bør jeg velge rammelån eller boliglån?</Heading>
        <Content className="prose">
          <p>
            Om du bør velge rammelån eller boliglån avhenger av den økonomiske
            situasjonen din, preferansene dine og hvor mye fleksibilitet du
            ønsker knyttet til nedbetaling av lånet.
          </p>
          <p>
            De viktigste forskjellene på rammelån og boliglån som du bør være
            klar over før du tar et valg:
          </p>
          <ul>
            <li>
              Fleksibilitet: Rammelån gir deg større fleksibilitet til å låne og
              betale tilbake penger etter behov, mens et vanlig boliglån har en
              fast nedbetalingsplan.
            </li>
            <li>
              Nedbetaling av lånet: Et vanlig boliglån har en fastsatt
              nedbetalingsplan, mens rammelånet gir deg mer frihet til å velge
              når og hvor mye du ønsker å betale tilbake.
            </li>
            <li>
              Beregning av renter: Med et rammelån betaler du renter bare på det
              beløpet du faktisk har brukt, mens med et vanlig boliglån baserer
              renter seg på hele lånebeløpet.
            </li>
          </ul>
        </Content>
      </AccordionItem>
      <AccordionItem
        onOpenChange={args.onOpenChange}
        defaultOpen={args.defaultOpen}
      >
        <Heading level={2}>Overfør penger fra Boligspar Ung?</Heading>
        <Content className="prose">
          <p>
            Ønsker du å overføre penger fra Boligspar Ung til en av dine andre
            kontoer, er det en enkel sak. <a href="#">Logg inn i nettbanken</a>{' '}
            og velg &quot;Uttak Boligspar&quot; Ung i menyen. Slik som BSU, kan
            du ta ut det du har spart inneværende år. Om du vil ta ut mer vil
            kontoen avsluttes.
          </p>
        </Content>
      </AccordionItem>
    </Accordion>
  );
};

function controlledReducer(state: boolean[], indexToFlip: number) {
  state[indexToFlip] = !state[indexToFlip];
  return [...state];
}
const ControlledTemplate = (args: TextFieldProps) => {
  const [state, dispatch] = useReducer(controlledReducer, [
    false,
    false,
    false,
  ]);

  return (
    <Accordion>
      {state.map((isOpen, index) => {
        const accordionNumber = index + 1;
        return (
          <AccordionItem
            isOpen={isOpen}
            key={index}
            onOpenChange={() => dispatch(index)}
          >
            <Heading level={2}>Heading {accordionNumber}</Heading>
            <Content>Item {accordionNumber}</Content>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

const meta: Meta<typeof AccordionItem> = {
  title: 'Accordion',
  component: AccordionItem,
  argTypes: {
    onOpenChange: { action: 'open change' },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const defaultProps: AccordionItemProps = {
  defaultOpen: false,
};

export const Default: Story = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const Controlled = {
  render: ControlledTemplate,

  // args: {
  //   ...defaultProps,
  // },
};

// export const WithBackground = () => {
//   return (
//     <div className="bg-mint p-6">
//       <Accordion>
//         <AccordionItem>
//           <Heading level={2}>Hvordan betaler jeg ned på rammelånet?</Heading>
//           <Content>{rammelån}</Content>
//         </AccordionItem>
//         <AccordionItem>
//           <Heading level={2}>Bør jeg velge rammelån eller boliglån?</Heading>
//           <Content>
//             {rammelån2}
//             {list}
//           </Content>
//         </AccordionItem>
//         <AccordionItem>
//           <Heading level={2}>Overfør penger fra Boligspar Ung?</Heading>
//           <Content>{boligspar}</Content>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// };

// export const Single: Story = {
//   render: () => (
//     <Accordion>
//       <AccordionItem>
//         <Heading level={2}>Hvordan betaler jeg ned på rammelånet?</Heading>
//         <Content>{rammelån}</Content>
//       </AccordionItem>
//     </Accordion>
//   ),
// };
