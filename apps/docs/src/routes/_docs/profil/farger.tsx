import { Check } from '@obosbbl/grunnmuren-icons-react';
import {
  Badge,
  Link,
  Radio,
  RadioGroup,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from '@obosbbl/grunnmuren-react';
import { createFileRoute, useLocation } from '@tanstack/react-router';
import { cx } from 'cva';
import { useEffect, useRef, useState } from 'react';

import { AnchorHeading } from '@/ui/anchor-heading';
import { Code } from '@/ui/code';

import legacyColors from '../../../../colors';
import { type RoleToken, themeColors, tokenColors } from '../../../../token-colors';

export const Route = createFileRoute('/_docs/profil/farger')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Farger | Grunnmuren' },
      { name: 'description', content: 'Fargerollene og paletten i Grunnmuren' },
    ],
  }),
});

const THEMES = [
  { id: 'default', label: 'OBOS (standard)' },
  { id: 'froen-hage', label: 'Frøen Hage' },
] as const;

type Theme = (typeof THEMES)[number]['id'];

/** What a theme sets, by CSS name without `--` */
type Overrides = Record<string, string>;

// primary, accent and neutral don't name a colour, since the text sits in the themed view
// and a theme recolours exactly those
const ROLE_DESCRIPTIONS: Record<string, string> = {
  primary: 'Hovedrollen, og den du får uten data-color.',
  accent: 'Sekundær merkevarefarge, ikke en statusfarge.',
  neutral: 'For flater, tekst og kanter som ikke skal ta oppmerksomhet.',
  success: 'Grønn. For bekreftelser og ting som gikk bra.',
  danger: 'Rød. For feil og handlinger som ikke kan angres.',
  warning: 'Oransje og gul. For advarsler.',
  info: 'Blå. For nøytral informasjon.',
};

// Which utility a token is meant for, matched on the short name in order, so
// `base-contrast-*` (text on a base fill) is checked before `base-*`
const UTILITY_PREFIXES = [
  ['base-contrast', 'text'],
  ['base', 'bg'],
  ['background', 'bg'],
  ['surface', 'bg'],
  ['border', 'border'],
  ['text', 'text'],
] as const;

const utilityFor = (shortName: string, colorName: string) => {
  const prefix = UTILITY_PREFIXES.find(([start]) => shortName.startsWith(start))?.[1] ?? 'bg';
  return `${prefix}-${colorName}`;
};

/**
 * What a role token ends up as under a theme: the theme's own value if it sets the token,
 * otherwise the primitive it points at, as the theme left that.
 */
const resolveRole = (token: RoleToken, overrides: Overrides) => {
  const own = overrides[token.name];
  if (own) {
    return { value: own, setByTheme: true };
  }
  const primitive = token.refName ? overrides[token.refName] : undefined;
  return { value: primitive ?? token.value, setByTheme: false };
};

type SwatchProps = {
  /** The custom property without `--` */
  name: string;
  utility?: string;
  /** What the token points at, without `--` */
  pointsAt?: string;
  value: string;
  /** The theme sets the token itself, so it no longer points at `pointsAt` */
  setByTheme?: boolean;
  /**
   * What the swatch is painted with. The variable by default, so it shows what components
   * get from the cascade even if the label's value drifts from the CSS.
   */
  fill?: string;
};

const Swatch = ({ name, utility, pointsAt, value, setByTheme, fill }: SwatchProps) => (
  <div className="grid content-start gap-2">
    <div
      className="h-14 rounded-lg border border-black/15"
      style={{ backgroundColor: fill ?? `var(--${name})` }}
    />
    <div className="grid justify-items-start text-sm">
      {utility && <CopyButton text={utility} label={`Kopier utility ${utility}`} />}
      <CopyButton text={`--${name}`} label={`Kopier variabelnavn --${name}`} />
      <span className="text-neutral-text-subtle px-1">
        {setByTheme ? <>satt av temaet · </> : pointsAt && <>{`--${pointsAt}`} · </>}
        {value}
      </span>
    </div>
  </div>
);

const SwatchGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-x-4 gap-y-6">
    {children}
  </div>
);

const RoleSection = ({
  role,
  groups,
  overrides,
}: {
  role: string;
  groups: Array<{ group: string; tokens: Array<RoleToken> }>;
  overrides: Overrides;
}) => (
  <section className="grid gap-6">
    <div className="prose">
      <AnchorHeading level={2} id={role} className="heading-s">
        {role}
      </AnchorHeading>
      <p>{ROLE_DESCRIPTIONS[role]}</p>
    </div>
    {groups.map(({ group, tokens }) => (
      <div key={group} className="grid gap-3">
        <h3 className="heading-xs">{group}</h3>
        <SwatchGrid>
          {tokens.map((token) => {
            const shortName = `${group}-${token.variant}`;
            return (
              <Swatch
                key={token.name}
                name={token.name}
                utility={utilityFor(shortName, `${role}-${shortName}`)}
                pointsAt={token.refName}
                {...resolveRole(token, overrides)}
              />
            );
          })}
        </SwatchGrid>
      </div>
    ))}
  </section>
);

const Roles = () => {
  const [theme, setTheme] = useState<Theme>('default');
  const primary = tokenColors.roles.find(({ role }) => role === 'primary');
  const overrides: Overrides = theme === 'default' ? {} : themeColors[theme];

  return (
    <div className="grid gap-12">
      <div className="prose">
        <p>
          I OBOS-temaet er <code>primary</code> mørk blå, <code>accent</code> mørk grønn og{' '}
          <code>neutral</code> gråtoner. I tillegg finnes statusrollene <code>success</code>,{' '}
          <code>danger</code>, <code>warning</code> og <code>info</code>.
        </p>
        <p>Hver rolle har de samme tokenene, delt i fem grupper:</p>
        <ul>
          <li>
            <code>background</code>: bakgrunnen på siden eller en seksjon
          </li>
          <li>
            <code>surface</code>: kort, paneler og andre flater oppå bakgrunnen. Med{' '}
            <code>hover</code> og <code>active</code> for det du kan klikke på
          </li>
          <li>
            <code>border</code>: kanter og skillelinjer
          </li>
          <li>
            <code>text</code>: tekst. <code>default</code> for vanlig tekst, <code>subtle</code> for
            det som er mindre viktig
          </li>
          <li>
            <code>base</code>: fylte flater, som knapper. <code>base-contrast</code> er tekst og
            ikoner oppå
          </li>
        </ul>
        <p>
          Klassen er rolle, gruppe og variant satt sammen, feks <code>bg-primary-base-default</code>{' '}
          eller <code>text-neutral-text-subtle</code>.
        </p>
        <p>
          Skal en komponent bytte farge etter hvor den står? Bruk klassene uten rolle i navnet, som{' '}
          <code>bg-base-default</code>. De henter fargen fra <code>data-color</code> på et element
          lenger opp, og er <code>primary</code> uten.
        </p>
        <Code
          language="tsx"
          code={`<div data-color="accent">
  <button className="bg-base-default text-base-contrast-default">Lagre</button>
</div>`}
        />
        <p>
          Fargene følger temaet, se <Link href="/profil/temaer">Temaer</Link>. Velg Frøen Hage under
          for å se hvordan det ser ut.
        </p>
      </div>

      <RadioGroup label="Tema" value={theme} onChange={(value) => setTheme(value as Theme)}>
        {THEMES.map(({ id, label }) => (
          <Radio key={id} value={id}>
            {label}
          </Radio>
        ))}
      </RadioGroup>

      <div
        data-theme={theme}
        className="bg-background-default text-text-default grid gap-16 rounded-xl border border-black/15 p-6"
      >
        {tokenColors.roles.map(({ role, groups }) => (
          <RoleSection key={role} role={role} groups={groups} overrides={overrides} />
        ))}

        {primary && (
          <section className="grid gap-6">
            <div className="prose">
              <AnchorHeading level={2} id="korte-tokens" className="heading-s">
                Korte tokens
              </AnchorHeading>
              <p>
                Klassene uten rolle i navnet. Her uten <code>data-color</code>, så de viser{' '}
                <code>primary</code>.
              </p>
            </div>
            <SwatchGrid>
              {tokenColors.shortTokens.flatMap((shortName) => {
                const token = primary.groups
                  .flatMap(({ tokens }) => tokens)
                  .find(({ name }) => name === `gm-color-primary-${shortName}`);
                // A short token always points at the role, whatever the theme sets on it
                return token
                  ? [
                      <Swatch
                        key={shortName}
                        name={`gm-color-${shortName}`}
                        utility={utilityFor(shortName, shortName)}
                        pointsAt={token.name}
                        value={resolveRole(token, overrides).value}
                      />,
                    ]
                  : [];
              })}
            </SwatchGrid>
          </section>
        )}
      </div>
    </div>
  );
};

const Palette = () => (
  <div className="grid gap-16">
    <section className="grid gap-6">
      <div className="prose">
        <AnchorHeading level={2} id="primitiver" className="heading-s">
          Primitiver
        </AnchorHeading>
        <p>
          Fargene rollene peker på. Bruk rollene i kode, ikke disse. Det er rollene vi lover holder
          seg stabile.
        </p>
      </div>
      {tokenColors.primitives.map(({ family, tokens }) => (
        <div key={family} className="grid gap-3">
          <h3 className="heading-xs">{family}</h3>
          <SwatchGrid>
            {tokens.map((token) => (
              <Swatch key={token.name} name={token.name} value={token.value} />
            ))}
          </SwatchGrid>
        </div>
      ))}
    </section>

    <section className="grid gap-6">
      <div className="prose">
        <AnchorHeading level={2} id="legacy" className="heading-s flex items-center gap-3">
          Legacy-farger
          <Badge size="small" color="gray-dark">
            Deprekert
          </Badge>
        </AnchorHeading>
        <p>
          Den gamle paletten, som <code>bg-blue-dark</code>. Finnes fortsatt så eksisterende kode
          funker, men bruk rollene i ny kode. De er faste hex-verdier og følger ikke et tema.
        </p>
      </div>
      <SwatchGrid>
        {Object.entries(legacyColors).map(([name, value]) => (
          // Tailwind only emits the legacy `--color-*` something uses, so these are painted
          // with the value instead of the variable
          <Swatch
            key={name}
            name={`color-${name}`}
            utility={`bg-${name}`}
            value={value}
            fill={value}
          />
        ))}
      </SwatchGrid>
    </section>
  </div>
);

// Which tab each heading anchor is in
const TAB_FOR_ANCHOR: Record<string, string> = {
  ...Object.fromEntries(tokenColors.roles.map(({ role }) => [role, 'roller'])),
  'korte-tokens': 'roller',
  primitiver: 'palett',
  legacy: 'palett',
};

function RouteComponent() {
  const hash = useLocation({ select: (location) => location.hash });
  const [tab, setTab] = useState('roller');
  const scrolledTo = useRef('');

  // Both panels are mounted, but the one that isn't selected is hidden, so the browser
  // can't scroll to a heading in it. Open the heading's tab first, then scroll once it shows.
  useEffect(() => {
    const target = TAB_FOR_ANCHOR[hash];
    if (!target || scrolledTo.current === hash) {
      return;
    }
    if (target !== tab) {
      setTab(target);
      return;
    }
    scrolledTo.current = hash;
    document.getElementById(hash)?.scrollIntoView();
  }, [hash, tab]);

  return (
    <>
      <h1 className="heading-l my-12">Farger</h1>
      <div className="prose mb-12">
        <p>
          Her er fargene sånn du bruker dem i kode. Hvordan OBOS bruker farger i merkevaren, står på{' '}
          <Link href="/farger">Farger under Designspråk</Link>.
        </p>
        <ul>
          <li>
            <strong>Rolle</strong>: hva en farge brukes til, som <code>primary</code> eller{' '}
            <code>danger</code>. Det er rollene du bruker i kode.
          </li>
          <li>
            <strong>Token</strong>: én farge i en rolle, som <code>primary-base-default</code>.
            Finnes både som Tailwind-klasse (<code>bg-primary-base-default</code>) og som
            CSS-variabel (<code>--gm-color-primary-base-default</code>).
          </li>
          <li>
            <strong>Primitiv</strong>: den faktiske fargen en rolle peker på, som{' '}
            <code>blue.900</code>. Bruk den ikke direkte.
          </li>
        </ul>
      </div>
      <Tabs className="mb-12" selectedKey={tab} onSelectionChange={(key) => setTab(String(key))}>
        <TabList aria-label="Farger">
          <Tab id="roller">Roller</Tab>
          <Tab id="palett">Palett</Tab>
        </TabList>
        <TabPanel id="roller">
          <Roles />
        </TabPanel>
        <TabPanel id="palett">
          <Palette />
        </TabPanel>
      </Tabs>
    </>
  );
}

const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="focus-visible:outline-focus-inset relative cursor-copy px-1 text-left font-mono hover:underline focus-visible:outline-current"
    >
      <span className={cx(copied && 'invisible')}>{text}</span>
      <span
        className={cx(
          'pointer-events-none absolute inset-0 inline-flex items-center gap-1 px-1',
          !copied && 'invisible',
        )}
      >
        <Check className="size-4" />
        Kopiert!
      </span>
    </button>
  );
};
