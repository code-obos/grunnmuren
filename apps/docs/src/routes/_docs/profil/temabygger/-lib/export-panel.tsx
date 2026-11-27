import { Alertbox, Button, Content, Heading, Link } from '@obosbbl/grunnmuren-react';

import { download } from '@/lib/download';
import { Code } from '@/ui/code';

import type { ThemeBuilder } from './theme-state';

export const ExportPanel = ({ builder }: { builder: ThemeBuilder }) => {
  const { themeName, theme, tokens } = builder;
  const json = `${JSON.stringify(tokens, null, 2)}\n`;
  const failing = theme.contrast.filter(({ passes }) => !passes).length;

  if (Object.keys(tokens).length === 0) {
    return (
      <p>
        Temaet er likt Grunnmuren, så det er ingenting å eksportere ennå. Endre en farge, radius
        eller avstand i panelet, så dukker CSS-en opp her.
      </p>
    );
  }

  return (
    <div className="grid gap-10">
      {failing > 0 && (
        <Alertbox variant="warning" role="none">
          <Heading level={3}>
            {failing === 1 ? 'Ett par' : `${failing} par`} er under kontrastkravet
          </Heading>
          <Content>
            <p>
              Temaet funker, men holder ikke WCAG 2.2 AA. Fargene som stryker er markert i
              Fargesystem.
            </p>
          </Content>
        </Alertbox>
      )}

      <section className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="heading-s">CSS</h3>
          <Button
            variant="secondary"
            onPress={() => download(`${themeName}.css`, theme.css, 'text/css')}
          >
            Last ned {themeName}.css
          </Button>
        </div>
        <p>
          Legg den i appen din og sett <code>data-theme=&quot;{themeName}&quot;</code> der temaet
          skal gjelde.
        </p>
        <div className="max-h-128 overflow-auto">
          <Code code={theme.css} language="css" />
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="heading-s">Tokens</h3>
          <Button
            variant="secondary"
            onPress={() => download(`${themeName}.json`, json, 'application/json')}
          >
            Last ned {themeName}.json
          </Button>
        </div>
        <p>
          Samme format som <Link href="/profil/temaer#tokenfila">tokenfila</Link>, så den kan bygges
          med <code>npx grunnmuren-theme {themeName}.json</code> i appen din.
        </p>
        <div className="max-h-128 overflow-auto">
          <Code code={json} language="json" />
        </div>
      </section>
    </div>
  );
};
