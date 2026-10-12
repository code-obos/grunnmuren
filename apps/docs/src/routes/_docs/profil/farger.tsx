import { Check } from '@obosbbl/grunnmuren-icons-react';
import { Badge, Radio, RadioGroup, Tab, TabList, TabPanel, Tabs } from '@obosbbl/grunnmuren-react';
import { createFileRoute } from '@tanstack/react-router';
import { cx } from 'cva';
import { useEffect, useRef, useState } from 'react';

import { AnchorHeading } from '@/ui/anchor-heading';

import legacyColors from '../../../../colors';
import { type RoleToken, tokenColors } from '../../../../token-colors';

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

const ROLE_DESCRIPTIONS: Record<string, string> = {
  primary: 'Mørk blå. Hovedrollen, og den du får uten data-color.',
  accent: 'Mørk grønn. Sekundær merkevarefarge, ikke en statusfarge.',
  neutral: 'Gråtoner for flater, tekst og kanter som ikke skal ta oppmerksomhet.',
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

const toHex = (color: string) => {
  const [red, green, blue, alpha] = color.match(/[\d.]+/g)?.map(Number) ?? [];
  if (blue === undefined || (alpha !== undefined && alpha < 1)) return color;
  return `#${[red, green, blue]
    .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')}`.toUpperCase();
};

/** `#fff` and `#FFFFFF` are the same colour, so hex is compared lowercased and expanded */
const normalizeHex = (color: string) =>
  /^#[\da-f]{3}$/i.test(color)
    ? color.replaceAll(/[\da-f]/gi, '$&$&').toLowerCase()
    : color.toLowerCase();

type SwatchProps = {
  /** The custom property without `--` */
  name: string;
  utility?: string;
  /** What the token points at by default, without `--` */
  pointsAt?: string;
  /** The value from the token source. A theme changes what's painted, not this */
  value: string;
  /**
   * Set where a theme can change the colour. The swatch then paints with the variable and
   * shows the value it got, otherwise it paints `value`.
   */
  theme?: Theme;
};

const Swatch = ({ name, utility, pointsAt, value, theme }: SwatchProps) => {
  const swatchRef = useRef<HTMLDivElement>(null);
  // The server renders the default value. After mount the swatch reads what it actually
  // painted, which is the theme's value once one is picked.
  const [liveValue, setLiveValue] = useState(value);

  useEffect(() => {
    if (theme && swatchRef.current) {
      setLiveValue(toHex(getComputedStyle(swatchRef.current).backgroundColor));
    }
  }, [theme]);

  const isOverridden = normalizeHex(liveValue) !== normalizeHex(value);

  return (
    <div className="grid content-start gap-2">
      <div
        ref={swatchRef}
        className="h-14 rounded-lg border border-black/15"
        // Tailwind only emits the legacy `--color-*` that something uses, so a swatch
        // outside a theme can't count on its variable being there
        style={{ backgroundColor: theme ? `var(--${name})` : value }}
      />
      <div className="grid justify-items-start text-sm">
        {utility && <CopyButton text={utility} label={`Kopier utility ${utility}`} />}
        <CopyButton text={`--${name}`} label={`Kopier variabelnavn --${name}`} />
        <span className="text-neutral-text-subtle px-1">
          {pointsAt && !isOverridden && <>{`--${pointsAt}`} · </>}
          {isOverridden && <>satt av temaet · </>}
          {liveValue}
        </span>
      </div>
    </div>
  );
};

const SwatchGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-x-4 gap-y-6">
    {children}
  </div>
);

const RoleSection = ({
  role,
  tokens,
  theme,
}: {
  role: string;
  tokens: Array<RoleToken>;
  theme: Theme;
}) => (
  <section className="grid gap-6">
    <div className="prose">
      <AnchorHeading level={3} id={role} className="heading-s">
        {role}
      </AnchorHeading>
      <p>{ROLE_DESCRIPTIONS[role]}</p>
    </div>
    {[...Map.groupBy(tokens, (token) => token.group)].map(([group, members]) => (
      <div key={group} className="grid gap-3">
        <h4 className="heading-xs">{group}</h4>
        <SwatchGrid>
          {members.map((token) => {
            const shortName = `${token.group}-${token.variant}`;
            return (
              <Swatch
                key={token.name}
                name={token.name}
                utility={utilityFor(shortName, `${role}-${shortName}`)}
                pointsAt={token.refName}
                value={token.value}
                theme={theme}
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

  return (
    <div className="grid gap-12">
      <div className="prose">
        <p>
          Rollene er fargene du bruker i kode. <code>primary</code> er mørk blå, <code>accent</code>{' '}
          mørk grønn og <code>neutral</code> gråtoner. I tillegg finnes statusrollene{' '}
          <code>success</code>, <code>danger</code>, <code>warning</code> og <code>info</code>.
        </p>
        <p>
          Hver rolle har de samme tokenene, delt i <code>background</code>, <code>surface</code>,{' '}
          <code>border</code>, <code>text</code> og <code>base</code>. Utilityen er rolle, gruppe og
          variant, feks <code>bg-primary-base-default</code> eller{' '}
          <code>text-neutral-text-subtle</code>.
        </p>
        <p>
          De korte utilities som <code>bg-base-default</code> har ingen rolle i navnet. De følger{' '}
          <code>data-color</code> (<code>primary</code>, <code>accent</code> eller{' '}
          <code>neutral</code>) på et element over, og er <code>primary</code> uten. Sånn kan en
          komponent skrives én gang og likevel skifte farge der den står.
        </p>
        <p>
          Fargene følger temaet. Velg Frøen Hage under for å se hvordan et tema overstyrer rollene.
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
        {tokenColors.roles.map(({ role, tokens }) => (
          <RoleSection key={role} role={role} tokens={tokens} theme={theme} />
        ))}

        {primary && (
          <section className="grid gap-6">
            <div className="prose">
              <AnchorHeading level={3} id="korte-tokens" className="heading-s">
                Korte tokens
              </AnchorHeading>
              <p>
                Peker på rollen <code>data-color</code> velger. Her uten attributtet, så de er{' '}
                <code>primary</code>.
              </p>
            </div>
            <SwatchGrid>
              {tokenColors.shortTokens.flatMap((shortName) => {
                const token = primary.tokens.find(
                  ({ group, variant }) => `${group}-${variant}` === shortName,
                );
                return token
                  ? [
                      <Swatch
                        key={shortName}
                        name={`gm-color-${shortName}`}
                        utility={utilityFor(shortName, shortName)}
                        pointsAt={token.name}
                        value={token.value}
                        theme={theme}
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
        <AnchorHeading level={3} id="primitiver" className="heading-s">
          Primitiver
        </AnchorHeading>
        <p>
          Fargene rollene peker på. Bruk rollene i kode, ikke disse direkte. Et tema kan justere
          dem, men det er rollene som er kontrakten.
        </p>
      </div>
      {tokenColors.primitives.map(({ family, tokens }) => (
        <div key={family} className="grid gap-3">
          <h4 className="heading-xs">{family}</h4>
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
        <AnchorHeading level={3} id="legacy" className="heading-s flex items-center gap-3">
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
          <Swatch key={name} name={`color-${name}`} utility={`bg-${name}`} value={value} />
        ))}
      </SwatchGrid>
    </section>
  </div>
);

function RouteComponent() {
  return (
    <>
      <h1 className="heading-l my-12">Farger</h1>
      <Tabs className="mb-12">
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
