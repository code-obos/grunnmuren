import { Settings } from '@obosbbl/grunnmuren-icons-react';
import {
  Accordion,
  AccordionItem,
  Badge,
  Content,
  Heading,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TextField,
  UNSAFE_ToggleButton as ToggleButton,
  UNSAFE_ToggleButtonGroup as ToggleButtonGroup,
} from '@obosbbl/grunnmuren-react';
import { useState } from 'react';
import { Button as RACButton, Dialog, DialogTrigger, Popover } from 'react-aria-components';

import { ColorField } from './color-field';
import { RadiusSlider } from './radius-slider';
import {
  BRAND_ROLES,
  GROUPS,
  type Mode,
  ROLE_LABELS,
  ROLES,
  type Role,
  type ThemeBuilder,
} from './theme-state';

const linkButton =
  'focus-visible:outline-focus cursor-pointer text-sm underline underline-offset-2 hover:no-underline';

const GenerateFields = ({ builder }: { builder: ThemeBuilder }) => (
  <div className="grid gap-6">
    {BRAND_ROLES.map((role) => {
      const generatedBase = builder.generated[role]['base-default'];
      const description =
        builder.isDefaultBrand(role) || generatedBase === builder.brand[role]
          ? 'base-default'
          : `base-default blir ${generatedBase}, lysheten er justert til rollens mål så kontrastkravet holder.`;
      return (
        <ColorField
          key={role}
          label={ROLE_LABELS[role]}
          value={builder.brand[role]}
          onChange={(color) => builder.setBrand(role, color)}
          description={description}
        />
      );
    })}
  </div>
);

const ManualFields = ({ builder }: { builder: ThemeBuilder }) => {
  // One open at a time, since each role is long, but all of them can be closed too
  const [expanded, setExpanded] = useState<Role | null>('primary');
  const changedCount = (role: Role) => Object.keys(builder.overrides[role] ?? {}).length;
  const hasOverrides = ROLES.some((role) => changedCount(role) > 0);

  return (
    <div className="grid gap-4">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="heading-xs">Fargeroller</h3>
        {hasOverrides && (
          <button type="button" className={linkButton} onClick={builder.resetOverrides}>
            Tilbakestill alle
          </button>
        )}
      </div>
      <Accordion>
        {ROLES.map((role) => (
          <AccordionItem
            key={role}
            isExpanded={expanded === role}
            onExpandedChange={(isExpanded) => setExpanded(isExpanded ? role : null)}
          >
            <Heading level={4}>
              <span className="flex items-center gap-3">
                <span
                  className="size-4 flex-none rounded-sm border border-black/15"
                  style={{ background: builder.final[role]['base-default'] }}
                />
                {ROLE_LABELS[role]}
                {changedCount(role) > 0 && (
                  <Badge size="small" color="sky">
                    {changedCount(role)} endret
                  </Badge>
                )}
              </span>
            </Heading>
            <Content className="grid grid-cols-1 gap-6">
              {GROUPS.map(({ group, variants }) => (
                <fieldset key={group} className="grid min-w-0 grid-cols-1 gap-4">
                  <legend className="description mb-2 font-medium capitalize">{group}</legend>
                  {variants.map((variant) => {
                    const isChanged = builder.overrides[role]?.[variant] != null;
                    return (
                      <div key={variant} className="grid grid-cols-1 gap-1">
                        {/* The role is in the accordion heading, so the label is just the variant */}
                        <ColorField
                          label={variant}
                          value={builder.final[role][variant]}
                          onChange={(color) => builder.setOverride(role, variant, color)}
                        />
                        {isChanged && (
                          <button
                            type="button"
                            className={`${linkButton} justify-self-start`}
                            onClick={() => builder.setOverride(role, variant, undefined)}
                          >
                            Tilbakestill til {builder.generated[role][variant]}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </fieldset>
              ))}
            </Content>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export const SettingsPopover = ({ builder }: { builder: ThemeBuilder }) => {
  const overrideCount = Object.values(builder.overrides).reduce(
    (sum, colors) => sum + Object.keys(colors ?? {}).length,
    0,
  );
  // Kept here rather than in the Tabs, so the popover remembers it between openings
  const [tab, setTab] = useState<SettingsTab>('farger');

  return (
    <DialogTrigger>
      <RACButton
        aria-label="Temainnstillinger"
        className="bg-primary-background-tinted border-primary-base-default focus-visible:outline-focus-offset hover:bg-primary-surface-hover pressed:bg-primary-surface-active grid size-11 flex-none cursor-pointer place-items-center rounded-full border shadow-md"
      >
        <Settings className="size-6" />
      </RACButton>
      <Popover
        placement="bottom end"
        offset={8}
        className="bg-neutral-background-default border-primary-base-default max-h-(--visual-viewport-height) w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-lg border outline-none"
      >
        <Dialog aria-labelledby="tema-innstillinger" className="grid gap-6 p-4.5 outline-none">
          <>
            <Heading slot="title" id="tema-innstillinger" level={2} className="heading-m">
              Tema
            </Heading>
            <Tabs selectedKey={tab} onSelectionChange={(key) => setTab(key as SettingsTab)}>
              <TabList aria-label="Temainnstillinger">
                <Tab id="farger">Farger</Tab>
                <Tab id="form">Form</Tab>
              </TabList>
              <TabPanel id="farger" className="grid gap-6 pt-6">
                <ColorSettings builder={builder} overrideCount={overrideCount} />
              </TabPanel>
              <TabPanel id="form" className="grid gap-6 pt-6">
                <RadiusSlider value={builder.radius} onChange={builder.setRadius} />
              </TabPanel>
            </Tabs>
          </>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};

type SettingsTab = 'farger' | 'form';

const ColorSettings = ({
  builder,
  overrideCount,
}: {
  builder: ThemeBuilder;
  overrideCount: number;
}) => (
  <>
    <TextField
      label="Navn"
      placeholder="Grunnmuren"
      value={builder.name}
      onChange={builder.setName}
    />
    <div className="grid gap-2">
      <h3 className="paragraph font-medium">Merkevarefarger</h3>
      <p className="description" id="merkevarefarger">
        Hvordan skal rollene settes?
      </p>
      <ToggleButtonGroup
        aria-labelledby="merkevarefarger"
        className="justify-self-start"
        selectedKeys={[builder.mode]}
        disallowEmptySelection
        onSelectionChange={(keys) => {
          const [mode] = keys;
          if (mode) {
            builder.setMode(mode as Mode);
          }
        }}
      >
        <ToggleButton id="generate">Generer</ToggleButton>
        <ToggleButton id="manual">Sett hver verdi</ToggleButton>
      </ToggleButtonGroup>
      <p className="description">
        {builder.mode === 'generate'
          ? `Skalaen utledes fra én hex per rolle, kalibrert mot OBOS-rollene.${overrideCount > 0 ? ` Du har ${overrideCount} egne verdier lagret, de brukes når «Sett hver verdi» er valgt.` : ''}`
          : 'Start fra de genererte verdiene og endre de du har fra designmanualen. Resten beholder generert verdi.'}
      </p>
    </div>
    {builder.mode === 'generate' ? (
      <GenerateFields builder={builder} />
    ) : (
      <ManualFields builder={builder} />
    )}
  </>
);
