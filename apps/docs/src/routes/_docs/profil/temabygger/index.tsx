import { Tab, TabList, TabPanel, Tabs } from '@obosbbl/grunnmuren-react';
import { createFileRoute } from '@tanstack/react-router';

import { ColorMatrix } from './-lib/color-matrix';
import { ComponentsPreview } from './-lib/components-preview';
import { ExportPanel } from './-lib/export-panel';
import { SettingsPopover } from './-lib/settings-panel';
import { useThemeBuilder } from './-lib/theme-state';

export const Route = createFileRoute('/_docs/profil/temabygger/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Temabygger | Grunnmuren' },
      {
        name: 'description',
        content: 'Lag et tema basert på Grunnmuren fra merkevarefargene dine',
      },
    ],
  }),
});

// The frame every tab sits in, square under the first tab so the tab and frame read as one
const PANEL = 'rounded-b-xl rounded-tr-xl border border-black/15 bg-white p-5 sm:p-8';

function RouteComponent() {
  const builder = useThemeBuilder();

  return (
    <>
      {/* No height, so it floats over the page and stays in reach while you scroll */}
      <div className="sticky top-6 z-20 mt-12 flex h-0 justify-end">
        <SettingsPopover builder={builder} />
      </div>
      <h1 className="heading-l mb-6">Temabygger</h1>
      <p className="mb-12 max-w-prose">
        Lag et tema basert på Grunnmuren. Legg inn merkevarefargene, så genereres hele
        fargesystemet. Har du en designmanual fra et designbyrå, kan du legge inn verdiene derfra og
        se med en gang om kontrasten holder. Radius, avstand og bakgrunnsdemping setter du i samme
        panel.
      </p>

      <div className="mb-12">
        <Tabs variant="primary" className="gap-y-0">
          <TabList aria-label="Temabygger">
            <Tab id="farger">Fargesystem</Tab>
            <Tab id="komponenter">Komponenter</Tab>
            <Tab id="eksport">Eksport</Tab>
          </TabList>
          <TabPanel id="farger" className={PANEL}>
            <ColorMatrix builder={builder} />
          </TabPanel>
          <TabPanel id="komponenter" className={PANEL}>
            <ComponentsPreview builder={builder} />
          </TabPanel>
          <TabPanel id="eksport" className={PANEL}>
            <ExportPanel builder={builder} />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}
