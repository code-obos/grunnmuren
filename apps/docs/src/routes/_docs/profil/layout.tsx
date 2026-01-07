import { UNSAFE_Link as Link } from '@obosbbl/grunnmuren-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_docs/profil/layout')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Layout | Grunnmuren' },
      { name: 'description', content: 'Layout i Grunnmuren' },
    ],
  }),
});

function RouteComponent() {
  return (
    <>
      <h1 className="heading-l my-12">Layout</h1>
      <div className="prose mb-12">
        <p>
          For layout, tilbyr Grunnmuren tailwind utilities som er definert i{' '}
          <Link href="https://github.com/code-obos/grunnmuren/tree/main/packages/tailwind">
            @obos-bbl/grunnmuren-tailwind
          </Link>
          . Det er tre hovedkategorier for layout i Grunnmuren:
        </p>
        <ul>
          <li>Container</li>
          <li>Grid</li>
          <li>Spacing</li>
        </ul>
      </div>
      <section className="prose mb-12">
        <h2 className="heading-m">Container</h2>
        <p>
          Klassen <code>container</code> brukes for å gi innholdet padding på
          sidene, sette en maksimal bredde på innholdet, samt sentrere innholdet
          horisontalt.
        </p>

        <p>
          I de aller fleste tilfeller vil vi unngå å plassere innhold helt ut i
          kanten på denne containeren. Hovedinnholdet skal som regel plasseres
          sentrert i denne containeren, med en "gutter" på hver side. Den
          enkleste måten å få til dette på er å bruke `layout-grid-container`,
          som kombinerer `container` med et grid-oppsett på 14 kolonner.
          Innholdet plasseres da i kolonne 2-13 for å få "gutter" på hver side.
        </p>
      </section>
      <section className="prose mb-12">
        <h2 className="heading-m">Grid</h2>
        <h3 className="heading-s">.layout-grid</h3>
        <p>
          Grunnmuren sitt grid defineres av klassen <code>layout-grid</code>, og
          består av 14 kolonner med responsiv spacing mellom kolonnene. Det
          betyr at størrelsen på kolonnene varierer avhengig av bredden på
          containeren. For at dette skal fungere optimalt, bør{' '}
          <code>layout-grid</code> enten:
        </p>
        <ul>
          <li>
            Alltid plasseres inne i en <code>container</code>
          </li>
          <li>
            Erstattes med <code>layout-grid-container</code>
          </li>
        </ul>
        <h3 className="heading-s">.layout-grid-container</h3>
        <p>
          Klassen <code>layout-grid-container</code> kombinerer{' '}
          <code>container</code> og <code>layout-grid</code> for å gi en enkel
          måte å sette opp et grid med gutters på hver side. Her plasseres også
          alt innhold mellom kolonne 2 og 13 som default.
        </p>
        <p>
          Dette kan overstyres ved å sette andre <code>col-start</code> og{' '}
          <code>col-end</code> verdier.
        </p>
      </section>
      <section className="prose mb-12">
        <h2 className="heading-m">Spacing</h2>
      </section>
    </>
  );
}
