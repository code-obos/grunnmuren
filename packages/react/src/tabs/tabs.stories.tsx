import type { Meta, StoryObj } from '@storybook/react';
import { Tab, TabList, TabPanel, Tabs } from './tabs';

const meta: Meta<typeof Tabs> = {
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
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Boligtyper">
        <Tab id="leilighet">Leilighet</Tab>
        <Tab id="rekkehus">Rekkehus</Tab>
        <Tab id="enebolig">Enebolig</Tab>
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
    </Tabs>
  ),
};

export const WithDefaultSelection: Story = {
  args: {
    defaultSelectedKey: 'tilvalg',
  },
  render: (args) => (
    <Tabs {...args}>
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

export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Boliger i Norge">
        <Tab id="oslo">Oslo</Tab>
        <Tab id="bergen">Bergen</Tab>
        <Tab id="trondheim" isDisabled>
          Trondheim
        </Tab>
      </TabList>
      <TabPanel id="oslo">
        <h3 className="mb-4 font-semibold text-lg">Oslo</h3>
        <p>Se våre boliger i Oslo.</p>
      </TabPanel>
      <TabPanel id="bergen">
        <h3 className="mb-4 font-semibold text-lg">Bergen</h3>
        <p>Se våre boliger i Bergen.</p>
      </TabPanel>
      <TabPanel id="trondheim">
        <h3 className="mb-4 font-semibold text-lg">Trondheim</h3>
        <p>Se våre boliger i Trondheim.</p>
      </TabPanel>
    </Tabs>
  ),
};
