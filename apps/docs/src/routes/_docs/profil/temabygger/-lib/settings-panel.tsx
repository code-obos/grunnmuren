import { Settings } from '@obosbbl/grunnmuren-icons-react';
import {
  Accordion,
  AccordionItem,
  Badge,
  Content,
  Heading,
  TextField,
  UNSAFE_ToggleButton as ToggleButton,
  UNSAFE_ToggleButtonGroup as ToggleButtonGroup,
} from '@obosbbl/grunnmuren-react';
import { cx } from 'cva';
import { useState } from 'react';
import { Button as RACButton, Dialog, DialogTrigger, Popover } from 'react-aria-components';

import { ColorField } from './color-field';
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
  const [expanded, setExpanded] = useState<Role>('primary');
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
            onExpandedChange={(isExpanded) => {
              if (isExpanded) {
                setExpanded(role);
              }
            }}
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
            <Content className="grid gap-6">
              {GROUPS.map(({ group, variants }) => (
                <fieldset key={group} className="grid gap-4">
                  <legend className="description mb-2 font-medium capitalize">{group}</legend>
                  {variants.map((variant) => {
                    const isChanged = builder.overrides[role]?.[variant] != null;
                    return (
                      <div key={variant} className="grid gap-1">
                        <ColorField
                          label={`${ROLE_LABELS[role]} ${variant}`}
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

  return (
    <DialogTrigger>
      <RACButton
        aria-label="Temainnstillinger"
        className="bg-primary-background-tinted border-primary-base-default focus-visible:outline-focus-offset hover:bg-primary-surface-hover pressed:bg-primary-surface-active grid size-11 flex-none cursor-pointer place-items-center rounded-full border"
      >
        <Settings className="size-6" />
      </RACButton>
      <Popover
        placement="bottom end"
        offset={8}
        className={cx(
          'bg-neutral-background-default border-primary-base-default max-h-(--visual-viewport-height) overflow-y-auto rounded-lg border outline-none',
          builder.mode === 'manual'
            ? 'w-[min(40rem,calc(100vw-2rem))]'
            : 'w-[min(20rem,calc(100vw-2rem))]',
        )}
      >
        <Dialog aria-labelledby="tema-innstillinger" className="grid gap-6 p-4.5 outline-none">
          <>
            <Heading slot="title" id="tema-innstillinger" level={2} className="heading-m">
              Tema
            </Heading>
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
              <p className="footnote">
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
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
