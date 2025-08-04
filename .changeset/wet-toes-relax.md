---
"@obosbbl/grunnmuren-react": patch
---

New `<Tab>` component in alpha, usage:

``` tsx
import {
  UNSAFE_Tab as Tab,
  UNSAFE_TabList as TabList,
  UNSAFE_TabPanel as TabPanel,
  UNSAFE_Tabs as Tabs,
} from './tabs';

const MyTabs = () => (
  <Tabs>
    <TabList aria-label="Boligkjøp">
      <Tab id="grunnpris">Grunnpris</Tab>
      <Tab id="tilvalg">Tilvalg</Tab>
      <Tab id="finansiering">Finansiering</Tab>
    </TabList>
    <TabPanel id="grunnpris">
      <h3 className="mb-4 font-semibold text-lg">Grunnpris</h3>
      <p>
        Grunnprisen inkluderer alle standardspesifikasjoner som er definert for
        boligen. Dette omfatter kjøkken, bad, gulv og andre grunnutstyr.
      </p>
    </TabPanel>
    <TabPanel id="tilvalg">
      <p>
        <h3 className="mb-4 font-semibold text-lg">Tilvalg</h3>
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
);
```

Note that the `id` of each `<Tab>` must correspond to the `id` of a `<Tabpanel>`. The order of the `<Tab>` components determines the order, and the order of the `<TabPanel>` components is insignificant. 

The component supports both horizontal and vertical orientation:

``` tsx
const MyVerticalTabs = () => (
  <Tabs orientation="vertical">
    <TabList aria-label="Boligkjøp">
      <Tab id="grunnpris">Grunnpris</Tab>
      <Tab id="tilvalg">Tilvalg</Tab>
      <Tab id="finansiering">Finansiering</Tab>
    </TabList>
    <TabPanel id="grunnpris">
      <h3 className="mb-4 font-semibold text-lg">Grunnpris</h3>
      <p>
        Grunnprisen inkluderer alle standardspesifikasjoner som er definert for
        boligen. Dette omfatter kjøkken, bad, gulv og andre grunnutstyr.
      </p>
    </TabPanel>
    <TabPanel id="tilvalg">
      <p>
        <h3 className="mb-4 font-semibold text-lg">Tilvalg</h3>
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
);
```

Horizontal tabs will be scrollable if the `<Tabs>` overflows it's container.
