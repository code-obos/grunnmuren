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

function RouteComponent() {
  const builder = useThemeBuilder();

  return (
    <>
      <div className="mt-12 mb-6 flex items-start justify-between gap-4">
        <h1 className="heading-l">Temabygger</h1>
        <SettingsPopover builder={builder} />
      </div>
      <p className="mb-12 max-w-prose">
        Lag et tema basert på Grunnmuren. Legg inn merkevarefargene, så genereres hele
        fargesystemet. Har du en designmanual fra et designbyrå, kan du legge inn verdiene derfra og
        se med en gang om kontrasten holder.
      </p>

      <div className="mb-12">
        <Tabs>
          <TabList aria-label="Temabygger">
            <Tab id="farger">Fargesystem</Tab>
            <Tab id="komponenter">Komponenter</Tab>
            <Tab id="eksport">Eksport</Tab>
          </TabList>
          <TabPanel id="farger" className="pt-6">
            <ColorMatrix builder={builder} />
          </TabPanel>
          <TabPanel id="komponenter" className="pt-6">
            <ComponentsPreview builder={builder} />
          </TabPanel>
          <TabPanel id="eksport" className="pt-6">
            <ExportPanel builder={builder} />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}
