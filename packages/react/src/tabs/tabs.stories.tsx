import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  UNSAFE_Tab as Tab,
  UNSAFE_TabList as TabList,
  UNSAFE_TabPanel as TabPanel,
  UNSAFE_Tabs as Tabs,
} from './tabs';

const meta = {
  title: 'Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    selectedKey: {
      control: 'text',
      description: 'The currently selected tab key',
    },
    defaultSelectedKey: {
      control: 'text',
      description: 'The default selected tab key',
    },
    onSelectionChange: {
      action: 'selectionChange',
      description: 'Callback fired when selection changes',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Boligtyper">
        <Tab id="leilighet">Leilighet</Tab>
        <Tab id="rekkehus">Rekkehus</Tab>
        <Tab id="enebolig">Enebolig</Tab>
        <Tab id="villa">Villa</Tab>
        <Tab id="hytte">Hytte</Tab>
      </TabList>
      <TabPanel id="leilighet">
        <h3 className="mb-4 font-semibold text-lg">Leilighet</h3>
        <p>
          Leiligheter er den mest populære boligtypen blant våre medlemmer. Vi
          tilbyr alt fra små 1-roms til store familieboligter i attraktive
          områder rundt om i landet.
        </p>
      </TabPanel>
      <TabPanel id="rekkehus">
        <h3 className="mb-4 font-semibold text-lg">Rekkehus</h3>
        <p>
          Rekkehus gir deg det beste fra to verdener - egen uteplass og hage,
          samtidig som du slipper alt vedlikeholdet som følger med en enebolig.
          Perfekt for barnefamilier.
        </p>
      </TabPanel>
      <TabPanel id="enebolig">
        <h3 className="mb-4 font-semibold text-lg">Enebolig</h3>
        <p>
          Drømmer du om egen enebolig med stor hage? Vi har flotte eneboliger i
          rolige strøk, både nybygg og etablerte hus i gode bomiljø.
        </p>
      </TabPanel>
      <TabPanel id="villa">
        <h3 className="mb-4 font-semibold text-lg">Villa</h3>
        <p>
          Våre villaer kombinerer stil og komfort med moderne løsninger. Her får
          du romslige boliger med høy standard og gode kvaliteter.
        </p>
      </TabPanel>
      <TabPanel id="hytte">
        <h3 className="mb-4 font-semibold text-lg">Hytte</h3>
        <p>
          Våre hytter ligger i naturskjønne omgivelser og tilbyr en perfekt
          tilflukt fra hverdagens stress. Her kan du nyte roen og stillheten i
          vakre omgivelser.
        </p>
      </TabPanel>
    </Tabs>
  ),
};

export const WithDefaultSelection: Story = {
  args: {
    defaultSelectedKey: 'tilvalg',
    orientation: 'vertical',
  },
  render: (args) => (
    <Tabs {...args} orientation="vertical">
      <TabList aria-label="Boligkjøp">
        <Tab id="grunnpris">Grunnpris</Tab>
        <Tab id="tilvalg">Tilvalg</Tab>
        <Tab id="finansiering">Finansiering</Tab>
      </TabList>
      <TabPanel id="grunnpris">
        <h3 className="mb-4 font-semibold text-lg">Grunnpris</h3>
        <p>
          Grunnprisen inkluderer alle standardspesifikasjoner som er definert
          for boligen. Dette omfatter kjøkken, bad, gulv og andre grunnutstyr.
        </p>
      </TabPanel>
      <TabPanel id="tilvalg">
        <h3 className="mb-4 font-semibold text-lg">Tilvalg</h3>
        <p>
          Her kan du velge oppgraderinger som hvitevarer, gulvtyper, fliser og
          andre tilpasningsmuligheter for å skape ditt drømmehjem.
        </p>
      </TabPanel>
      <TabPanel id="finansiering">
        <h3 className="mb-4 font-semibold text-lg">Finansiering</h3>
        <p>
          OBOS Bank tilbyr konkurransedyktige boliglån med gunstige vilkår for
          våre medlemmer. Få hjelp til å finansiere ditt boligkjøp.
        </p>
      </TabPanel>
    </Tabs>
  ),
};

export const WithVerticalOrientation: Story = {
  render: (args) => (
    <Tabs {...args} orientation="vertical">
      <TabList aria-label="Boliger i Norge">
        <Tab id="oslo">Oslo</Tab>
        <Tab id="bergen">Bergen</Tab>
        <Tab id="trondheim">Trondheim</Tab>
        <Tab id="stavanger">Stavanger</Tab>
        <Tab id="tromsø">Tromsø</Tab>
      </TabList>
      <TabPanel id="oslo">
        <h3 className="mb-4 font-semibold text-lg">Oslo</h3>
        <p>
          Opplev hovedstadens pulserende byliv med moderne leiligheter i
          sentrale strøk. Fra trendy Grünerløkka til elegante Frogner - finn
          ditt urbane hjem midt i kulturens og næringslivets hjerte.
        </p>
      </TabPanel>
      <TabPanel id="bergen">
        <h3 className="mb-4 font-semibold text-lg">Bergen</h3>
        <p>
          Mellom de syv fjell finner du sjarmerende boliger med unik karakter.
          Våre bergenske hjem kombinerer historisk sjel med moderne komfort,
          omgitt av spektakulær natur og vestlandsk hygge.
        </p>
      </TabPanel>
      <TabPanel id="trondheim">
        <h3 className="mb-4 font-semibold text-lg">Trondheim</h3>
        <p>
          Studentbyen ved Nidelva byr på rike tradisjoner og innovativ
          arkitektur. Våre boliger ligger perfekt plassert for å nyte både byens
          akademiske atmosfære og den vakre trondheimsfjorden.
        </p>
      </TabPanel>
      <TabPanel id="stavanger">
        <h3 className="mb-4 font-semibold text-lg">Stavanger</h3>
        <p>
          Energihovedstaden kombinerer internasjonalt miljø med norsk
          kystkultur. Utforsk våre boliger fra den pittoreske gamlebyen til
          moderne boligområder med kort vei til både jobb og fantastiske
          strender.
        </p>
      </TabPanel>
      <TabPanel id="tromsø">
        <h3 className="mb-4 font-semibold text-lg">Tromsø</h3>
        <p>
          Under nordlyset og midnattssola ligger vår nordligste storby. Her
          tilbyr vi unike boliger med arktisk sjarm, hvor du kan nyte
          spektakulær natur og en livlig kulturscene året rundt.
        </p>
      </TabPanel>
    </Tabs>
  ),
};
