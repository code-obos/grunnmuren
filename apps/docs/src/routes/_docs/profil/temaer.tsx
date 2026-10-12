import { Button, Link, TextField } from '@obosbbl/grunnmuren-react';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import { AnchorHeading } from '@/ui/anchor-heading';
import { Code } from '@/ui/code';

import { tokenColors } from '../../../../token-colors';

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

/** Every role colour, set to what it is by default, for an app to replace with its own */
const themeTemplate = (name: string) => {
  const roles = tokenColors.roles.map(({ role, tokens }) =>
    [`  /* ${role} */`, ...tokens.map((token) => `  --${token.name}: var(--${token.ref});`)].join(
      '\n',
    ),
  );

  return `[data-theme='${name}'] {\n${roles.join('\n\n')}\n}\n`;
};

const download = (fileName: string, contents: string) => {
  const url = URL.createObjectURL(new Blob([contents], { type: 'text/css' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};

const TemplateGenerator = () => {
  const [input, setInput] = useState('mitt-tema');
  const name = toThemeName(input) || 'mitt-tema';
  const css = themeTemplate(name);

  return (
    <div className="grid gap-4">
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
        <Button variant="secondary" onPress={() => download(`${name}.css`, css)}>
          Last ned {name}.css
        </Button>
      </div>
      <div className="max-h-128 overflow-auto">
        <Code code={css} language="css" />
      </div>
    </div>
  );
};

const STYLE_DICTIONARY_MAPPING = `{
  "gm": {
    "color": {
      "primary": {
        "base-default": { "$type": "color", "$value": "{color.brand.dark}" },
        "base-hover": { "$type": "color", "$value": "{color.brand.darker}" },
        "base-contrast-default": { "$type": "color", "$value": "{color.white}" }
      }
    }
  }
}`;

const STYLE_DICTIONARY_CONFIG = `import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  // Your own tokens, plus the file that maps them to Grunnmuren's names
  source: ['tokens/**/*.json', 'grunnmuren.json'],
  platforms: {
    grunnmuren: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'grunnmuren-theme.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'gm',
          options: { selector: "[data-theme='nybolig']" },
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();`;

const STYLE_DICTIONARY_OUTPUT = `[data-theme='nybolig'] {
  --gm-color-primary-base-default: #2d3a26;
  --gm-color-primary-base-hover: #24301e;
  --gm-color-primary-base-contrast-default: #ffffff;
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
          <AnchorHeading level={2} id="mal" className="heading-m">
            Lag en mal
          </AnchorHeading>
          <p>
            Her er alle rollene, satt til det de er som standard. Last ned, bytt ut verdiene med
            dine egne og slett det du vil beholde som det er. Malen lages fra tokenene, så den er
            alltid oppdatert.
          </p>
        </div>
        <TemplateGenerator />
      </section>

      <section className="prose mb-12">
        <AnchorHeading level={2} id="style-dictionary" className="heading-m">
          Fra din egen tokenfil
        </AnchorHeading>
        <p>
          Har dere paletten som DTCG-tokens, kan Style Dictionary lage temaet for dere. Lag en fil
          som gir tokenene deres Grunnmuren sine navn:
        </p>
        <Code language="json" code={STYLE_DICTIONARY_MAPPING} caption="grunnmuren.json" />
        <p>
          Og bygg den med det innebygde formatet <code>css/variables</code>, med temaet som{' '}
          <code>selector</code>:
        </p>
        <Code
          language="js"
          code={STYLE_DICTIONARY_CONFIG}
          caption="build.mjs (Style Dictionary 5)"
        />
        <Code language="css" code={STYLE_DICTIONARY_OUTPUT} caption="dist/grunnmuren-theme.css" />
      </section>

      <section className="prose mb-12">
        <AnchorHeading level={2} id="begrensninger" className="heading-m">
          Det et tema ikke kan
        </AnchorHeading>
        <ul>
          <li>
            Typografien (<code>heading-*</code>, <code>description</code> osv.) og motion er ikke en
            del av temaet. Reduced motion vinner alltid, uansett hva temaet setter.
          </li>
          <li>
            Kontrasten er temaets ansvar. Grunnmuren sjekker bare sine egne roller mot WCAG 2.2 AA,
            som er 4.5:1 for tekst og 3:1 for kanter, ikoner og andre UI-elementer.
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
