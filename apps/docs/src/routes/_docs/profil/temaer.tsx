import {
  Alertbox,
  Badge,
  Button,
  Content,
  Heading,
  Link,
  TextArea,
  TextField,
} from '@obosbbl/grunnmuren-react';
import {
  buildTheme,
  EXAMPLE_TOKENS,
  type ContrastResult,
  type ThemeIssue,
} from '@obosbbl/grunnmuren-tailwind/theme';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { DropZone, FileTrigger } from 'react-aria-components';

import { AnchorHeading } from '@/ui/anchor-heading';
import { Code } from '@/ui/code';

export const Route = createFileRoute('/_docs/profil/temaer')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Temaer | Grunnmuren' },
      { name: 'description', content: 'Lag et eget tema som overstyrer fargene i Grunnmuren' },
    ],
  }),
});

const README_THEMES = 'https://github.com/code-obos/grunnmuren/tree/main/packages/tailwind#themes';

/** A theme name that works unquoted in `data-theme` and as a file name */
const toThemeName = (input: string) =>
  input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const download = (fileName: string, contents: string, type: string) => {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};

const STARTER = `{
  "primary": {
    "base-default": "#2d3a26",
    "base-hover": "#24301e",
    "base-active": { "$value": "{primary.base-hover}" },
    "text-default": "{primary.base-default}"
  },
  "accent": {
    "base-default": "#8b674b"
  }
}
`;

// The preview gets a name of its own, so a theme called `default` can't take over the page
const PREVIEW_THEME = 'temaer-forhandsvisning';

const ISSUES: Record<ThemeIssue['code'], (issue: ThemeIssue) => string> = {
  'invalid-name': () => 'Navnet kan bare ha bokstaver, tall, - og _.',
  'not-an-object': () => 'Tokenene må være et JSON-objekt, gruppert per rolle.',
  'unknown-token': ({ path, suggestion }) =>
    `${path} finnes ikke i Grunnmuren.${suggestion ? ` Mente du ${suggestion}?` : ''}`,
  'invalid-value': ({ path }) =>
    `${path} må være en streng, eller et DTCG-token med fargen i $value.`,
  'invalid-color': ({ path }) =>
    `${path} er ikke en farge. Bruk hex, rgb() eller en referanse som {primary.base-default}.`,
  'unresolved-reference': ({ path, suggestion }) =>
    `${path} peker på et token som ikke finnes.${suggestion ? ` Mente du ${suggestion}?` : ''}`,
  'circular-reference': ({ path }) => `${path} ender opp med å peke på seg selv.`,
};

const RULES: Record<string, string> = {
  'text on surface': 'tekst på flate',
  'text in button': 'tekst i knapp',
  'button on page': 'knapp mot siden',
  'graphics on page': 'kant mot siden',
};

// Floored, so a ratio that fails never shows as one that passes
const formatRatio = (ratio: number) =>
  `${(Math.floor(ratio * 100) / 100).toFixed(2).replace('.', ',')}:1`;

const parse = (json: string): { tokens: unknown } | { error: string } => {
  try {
    return { tokens: JSON.parse(json) };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
};

const ContrastTable = ({ contrast }: { contrast: Array<ContrastResult> }) => {
  if (contrast.length === 0) {
    return <p>Temaet endrer ingen av parene vi sjekker kontrasten på.</p>;
  }

  const failing = contrast.filter(({ passes }) => !passes).length;
  const sorted = contrast.toSorted((a, b) => Number(a.passes) - Number(b.passes));

  return (
    <>
      <p>
        {failing === 0
          ? `Alle ${contrast.length} parene temaet endrer holder WCAG 2.2 AA.`
          : `${failing} av ${contrast.length} par temaet endrer er under WCAG 2.2 AA.`}
      </p>
      <div className="max-h-96 overflow-auto">
        <table>
          <thead>
            <tr>
              <th>Par</th>
              <th>Kontrast</th>
              <th>Krav</th>
              <th>Ok?</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(({ foreground, background, ratio, minimum, rule, passes }) => (
              <tr key={`${foreground} ${background}`}>
                <td>
                  <code>{foreground}</code> på <code>{background}</code>
                </td>
                <td>{formatRatio(ratio)}</td>
                <td>
                  {String(minimum).replace('.', ',')}:1 ({RULES[rule] ?? rule})
                </td>
                <td>{passes ? 'Ok' : <strong>Ikke ok</strong>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const Preview = ({ css }: { css: string }) => (
  <div
    data-theme={PREVIEW_THEME}
    className="bg-background-default text-text-default grid gap-6 rounded-xl border border-black/15 p-6"
  >
    <style>{css}</style>
    <div className="flex flex-wrap gap-4">
      <Button>Primary</Button>
      {/* Button doesn't set data-color from `color` yet, so the role is picked here */}
      <div data-color="accent" className="contents">
        <Button color="accent">Accent</Button>
      </div>
      <Button variant="secondary">Sekundær</Button>
    </div>
    <div className="flex flex-wrap gap-2">
      <Badge color="blue-dark">Primary</Badge>
      <Badge color="sky">Primary surface</Badge>
      <Badge color="green-dark">Accent</Badge>
    </div>
    <Alertbox variant="info" role="none">
      <Heading level={3}>Sånn ser en info-boks ut</Heading>
      <Content>
        <p>Den bruker info-rollen, og følger med hvis temaet setter den.</p>
      </Content>
    </Alertbox>
  </div>
);

const ThemeBuilder = () => {
  const [input, setInput] = useState('mitt-tema');
  const [json, setJson] = useState(STARTER);
  const name = toThemeName(input) || 'mitt-tema';

  const loadFile = async (file: File | undefined) => {
    if (file) setJson(await file.text());
  };

  const parsed = parse(json);
  const result = 'tokens' in parsed ? buildTheme(parsed.tokens, { name }) : undefined;
  const preview =
    'tokens' in parsed ? buildTheme(parsed.tokens, { name: PREVIEW_THEME }) : undefined;

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-end gap-4">
        <TextField
          label="Navn på temaet"
          description={
            <>
              Blir <code>data-theme=&quot;{name}&quot;</code>
            </>
          }
          value={input}
          onChange={setInput}
        />
        <FileTrigger
          acceptedFileTypes={['application/json', '.json']}
          onSelect={(files) => loadFile(files?.[0])}
        >
          <Button variant="secondary">Last opp JSON</Button>
        </FileTrigger>
        <Button
          variant="tertiary"
          onPress={() =>
            download(
              'eksempel.json',
              `${JSON.stringify(EXAMPLE_TOKENS, null, 2)}\n`,
              'application/json',
            )
          }
        >
          Last ned eksempel-JSON
        </Button>
      </div>

      <DropZone
        className="data-drop-target:outline-focus rounded-lg"
        onDrop={async ({ items }) => {
          const item = items.find((dropped) => dropped.kind === 'file');
          if (item?.kind === 'file') await loadFile(await item.getFile());
        }}
      >
        <TextArea
          label="Tokens"
          description="Lim inn JSON, eller slipp en fil her."
          rows={14}
          className="[&_textarea]:font-mono"
          value={json}
          onChange={setJson}
          errorMessage={'error' in parsed ? `Ikke gyldig JSON: ${parsed.error}` : undefined}
        />
      </DropZone>

      {result && result.errors.length > 0 && (
        <Alertbox variant="danger" role="alert">
          <Heading level={3}>
            {result.errors.length === 1 ? 'Én ting' : `${result.errors.length} ting`} å fikse
          </Heading>
          <Content>
            <ul>
              {result.errors.map((issue) => (
                <li key={`${issue.code} ${issue.path}`}>{ISSUES[issue.code](issue)}</li>
              ))}
            </ul>
          </Content>
        </Alertbox>
      )}

      {result && result.errors.length === 0 && (
        <>
          <section className="prose">
            <h3 className="heading-s">Kontrast</h3>
            <ContrastTable contrast={result.contrast} />
          </section>

          <section className="grid gap-4">
            <h3 className="heading-s">Sånn ser det ut</h3>
            <Preview css={preview?.css ?? ''} />
          </section>

          <section className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="heading-s">CSS</h3>
              <Button
                variant="secondary"
                onPress={() => download(`${name}.css`, result.css, 'text/css')}
              >
                Last ned {name}.css
              </Button>
            </div>
            <div className="max-h-128 overflow-auto">
              <Code code={result.css} language="css" />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

const FORMAT_EXAMPLE = `{
  "primary": {
    "base-default": "#2d3a26",
    "base-hover": { "$value": "{primary.base-active}" }
  },
  "blue": {
    "900": "#1f2a44"
  }
}`;

function RouteComponent() {
  return (
    <>
      <h1 className="heading-l my-12">Temaer</h1>
      <div className="prose mb-12">
        <p>
          Grunnmuren har OBOS sine farger, ikke alle merkevarenes. Trenger du andre farger, skriver
          du et tema i din egen app som overstyrer våre. Komponentene bruker rollene, så de følger
          med uten at du rører dem.
        </p>
        <p>
          Se <Link href="/profil/farger">Farger</Link> for alle rollene og hva de er som standard.
        </p>
      </div>

      <section className="prose mb-12">
        <AnchorHeading level={2} id="hva-er-et-tema" className="heading-m">
          Hva er et tema
        </AnchorHeading>
        <p>
          Et tema er en <code>[data-theme=&apos;navn&apos;]</code>-regel med <code>--gm-*</code>
          -variabler, i appens egen CSS.
        </p>
        <Code
          language="css"
          code={`@import '@obosbbl/grunnmuren-tailwind';

[data-theme='mitt-tema'] {
  --gm-color-primary-base-default: #2d3a26;
  --gm-color-primary-base-hover: #24301e;
}`}
        />
        <p>Og så setter du attributtet der temaet skal gjelde:</p>
        <Code language="tsx" code={`<section data-theme="mitt-tema">…</section>`} />
        <ul>
          <li>
            Det funker på en del av siden, ikke bare på <code>&lt;html&gt;</code>.
          </li>
          <li>
            Rekkefølgen CSS-en lastes i spiller ingen rolle. Standardverdiene ligger i{' '}
            <code>:where()</code>, så temaet ditt vinner uansett.
          </li>
          <li>
            Det temaet ikke setter, kommer fra siden rundt. Et tema inni et annet bygger på det
            ytre, og <code>data-theme=&quot;default&quot;</code> går tilbake til Grunnmuren sine
            egne verdier.
          </li>
          <li>
            <code>data-color</code> (<code>primary</code>, <code>accent</code> eller{' '}
            <code>neutral</code>) velger hvilken rolle de korte utilities som{' '}
            <code>bg-base-default</code> peker på. Uten er det <code>primary</code>.
          </li>
        </ul>
      </section>

      <section className="prose mb-12">
        <AnchorHeading level={2} id="to-maater" className="heading-m">
          To måter å gjøre det på
        </AnchorHeading>
        <h3 className="heading-s">Overstyr rollene</h3>
        <p>
          Anbefalt for en annen merkevare. Du setter hver rolle til fargen du vil ha, og har full
          kontroll på hva som havner hvor. Det er sånn Frøen Hage er laget.
        </p>
        <h3 className="heading-s">Overstyr primitivene</h3>
        <p>
          Raskt, siden alle rollene som peker på en primitiv følger med. Men{' '}
          <code>--gm-blue-900: #2d3a26</code> leser rart når fargen er grønn, så bruk det bare til å
          justere OBOS sin egen palett.
        </p>
      </section>

      <section className="mb-12 grid gap-6">
        <div className="prose">
          <AnchorHeading level={2} id="lag-temaet" className="heading-m">
            Lag temaet
          </AnchorHeading>
          <p>
            Skriv fargene som JSON med Grunnmuren sine navn, så lager vi CSS-en. Det viktigste er
            sjekken: en skrivefeil i en CSS-variabel gjør ingenting uten å si fra, og ingen sjekker
            kontrasten i temaet ditt. Det gjør denne.
          </p>
          <p>
            Eksempel-JSON-en har alle rollene, og peker på det de er som standard, så den er et
            greit sted å starte. Bytt ut det du vil endre og slett resten.
          </p>
        </div>
        <ThemeBuilder />
      </section>

      <section className="prose mb-12">
        <AnchorHeading level={2} id="tokenfila" className="heading-m">
          Tokenfila
        </AnchorHeading>
        <Code language="json" code={FORMAT_EXAMPLE} />
        <ul>
          <li>
            Rollene (<code>primary</code>, <code>accent</code>, <code>neutral</code>,{' '}
            <code>success</code>, <code>danger</code>, <code>warning</code> og <code>info</code>)
            har de samme navnene som på <Link href="/profil/farger">Farger</Link>.
          </li>
          <li>
            Primitivene er fargefamilien, som <code>&quot;blue&quot;: {'{ "900": … }'}</code> og{' '}
            <code>&quot;white&quot;</code>.
          </li>
          <li>
            En verdi er hex, <code>rgb()</code> eller en referanse som{' '}
            <code>{'{primary.base-active}'}</code>. En referanse til noe fila ikke setter, peker på
            Grunnmuren sin verdi.
          </li>
          <li>
            DTCG funker, både <code>$value</code> og fargeobjektet Figma eksporterer.
          </li>
          <li>Det du ikke setter, arver. Et tema med tre farger er helt greit.</li>
        </ul>
      </section>

      <section className="prose mb-12">
        <AnchorHeading level={2} id="kommandolinja" className="heading-m">
          Fra kommandolinja
        </AnchorHeading>
        <p>
          Den samme sjekken følger med <code>@obosbbl/grunnmuren-tailwind</code>, så temaet kan
          bygges og sjekkes i appen din:
        </p>
        <Code
          language="bash"
          code="npx grunnmuren-theme tokens.json --name mitt-tema --out mitt-tema.css"
        />
        <p>
          Feil stopper bygget. Kontrast under kravet er en advarsel, med <code>--strict</code>{' '}
          stopper den også. <code>npx grunnmuren-theme --example</code> skriver ut eksempelet.
        </p>
      </section>

      <section className="prose mb-12">
        <AnchorHeading level={2} id="begrensninger" className="heading-m">
          Det et tema ikke kan
        </AnchorHeading>
        <ul>
          <li>
            Tekststilene (<code>heading-*</code>, <code>lead</code> osv.) og motion kan ikke
            overstyres. Fontfamilie og vekter er primitiver, så de kan. Reduced motion vinner
            alltid, uansett hva temaet setter.
          </li>
          <li>
            Verktøyet over tar bare farger. Radius, spacing og fonter skriver du i CSS-en selv, ved
            siden av det verktøyet lager.
          </li>
          <li>
            Kontrasten er temaets ansvar. Grunnmuren sjekker sine egne roller mot WCAG 2.2 AA, som
            er 4.5:1 for tekst og 3:1 for kanter, ikoner og andre UI-elementer. Verktøyet over
            sjekker de samme parene i ditt.
          </li>
          <li>
            Tailwind sine <code>--radius-*</code> i din egen <code>@theme</code> når ikke inn i en{' '}
            <code>data-theme</code>. Sett <code>--gm-radius-*</code> i temaet i stedet.
          </li>
        </ul>
        <p>
          Hele kontrakten, med alt et tema kan sette, står i{' '}
          <Link href={README_THEMES}>README-en til grunnmuren-tailwind</Link>.
        </p>
      </section>
    </>
  );
}
