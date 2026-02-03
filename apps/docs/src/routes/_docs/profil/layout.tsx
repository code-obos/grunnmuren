import { UNSAFE_Link as Link } from '@obosbbl/grunnmuren-react';
import { createFileRoute } from '@tanstack/react-router';
import { AnchorHeading } from '@/ui/anchor-heading';
import { Code } from '@/ui/code';

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
          <li>
            <a href="#container">Container</a>
          </li>
          <li>
            <a href="#grid">Grid</a>
          </li>
          <li>
            <a href="#spacing">Spacing</a>
          </li>
        </ul>
      </div>
      <section className="prose mb-12">
        <AnchorHeading level={2} id="container" className="heading-m">
          Container
        </AnchorHeading>
        <p>
          Klassen <code>container</code> brukes for å gi innholdet padding på
          sidene, sette en maksimal bredde på innholdet, samt sentrere innholdet
          horisontalt.
        </p>

        <p>
          I de aller fleste tilfeller vil vi unngå å plassere innhold helt ut i
          kanten på denne containeren. Hovedinnholdet skal som regel plasseres
          sentrert i denne containeren, med en "gutter" på hver side.
        </p>
        <p>
          Den enkleste måten å få dette riktig er å bruke{' '}
          <code>layout-grid-container</code>, som kombinerer{' '}
          <code>container</code> med et grid-oppsett på 14 kolonner. Innholdet
          plasseres da i kolonne 2-13 for å få "gutter" på hver side.
        </p>
      </section>
      <section className="prose mb-12">
        <AnchorHeading level={2} id="grid" className="heading-m">
          Grid
        </AnchorHeading>
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
        <p>
          De 14 kolonnene gjelder fra og med små skjermer <code>sm:</code> og
          oppover.
        </p>
        <h3 className="heading-s">.layout-grid-container</h3>
        <p>
          Klassen <code>layout-grid-container</code> kombinerer{' '}
          <code>container</code> og <code>layout-grid</code> for å gi en enkel
          måte å sette opp et grid med gutters på hver side. Her plasseres også
          alt innhold mellom kolonne 2 og 13 som default.
        </p>
        <p>
          Dette kan overstyres ved å sette andre <code>col-start</code>,{' '}
          <code>col-end</code> eller <code>col-span</code> verdier.
        </p>
        <strong>
          Det er viktig å huske på at du må bruke <code>sm:</code> prefixet for
          kolonneverdier, siden kolonne systemet kun begynner å gjelde fra små
          skjermer og oppover.
        </strong>
        <h4 className="heading-xs">Eksempel på overstyring:</h4>
        <Code
          value={`<main className="layout-grid-container">
  <h1 className="heading-xl sm:col-end-9">Dette er OBOS</h1>
  <p className="sm:col-start-6 sm:col-end-12">
    Som er ett nettsted for alt om OBOS.
  </p>
  <img
    className="sm:col-span-full"
    src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/410001cfde5211194e0072bf39abd3214befb1c2-1920x1080.jpg?auto=format"
    alt=""
  />
</main>`}
        />
        <h3 className="heading-s">.layout-subgrid-*</h3>
        <p>
          Dersom du ønsker å lage et subgrid inne i et eksisterende grid, kan du
          bruke klassene <code>layout-subgrid-*</code>. Disse klassene oppretter
          et subgrid som "arver" kolonneoppsettet fra parent-gridet. Dette er en
          midlertidig løsning frem til det er bedre støtte for{' '}
          <code>subgrid</code> blant nettlesere.
        </p>
        <h4 className="heading-xs">Du kan velge mellom:</h4>
        <ul>
          <li>
            <code>layout-subgrid-1</code>
          </li>
          <li>
            <code>layout-subgrid-2</code>
          </li>
          <li>
            <code>layout-subgrid-3</code>
          </li>
          <li>
            <code>layout-subgrid-4 </code>
          </li>
          <li>
            <code>layout-subgrid-5</code>
          </li>
          <li>
            <code>layout-subgrid-6</code>
          </li>
          <li>
            <code>layout-subgrid-7</code>
          </li>
          <li>
            <code>layout-subgrid-8</code>
          </li>
          <li>
            <code>layout-subgrid-9</code>
          </li>
          <li>
            <code>layout-subgrid-10</code>
          </li>
          <li>
            <code>layout-subgrid-11</code>
          </li>
          <li>
            <code>layout-subgrid-12</code>
          </li>
          <li>
            <code>layout-subgrid-13</code>
          </li>
          <li>
            <code>layout-subgrid-14</code> eller{' '}
            <code>layout-subgrid-full</code>
          </li>
        </ul>
        <p>
          I subgrid må du selv passe på hvilke breakpoints som skal gjelde ,
          siden det kan være forskjellig fra parent gridet. Disse klassene
          setter altså ikke breakpoints for deg på samme måte som{' '}
          <code>layout-grid</code> <code>layout-grid-container</code> gjør.
        </p>
        <h4 className="heading-xs">Eksempel på bruk:</h4>
        <Code
          value={`<main className="layout-grid-container layout-gap-y">
  <ul className="md:layout-subgrid-12 *:md:col-span-6 *:lg:col-span-3">
    <Card>...</Card>
    <Card>...</Card>
    <Card>...</Card>
    <Card>...</Card>
  </ul>
</main>`}
        />
      </section>
      <section className="prose mb-12">
        <AnchorHeading level={2} id="spacing" className="heading-m">
          Spacing
        </AnchorHeading>
        <p>
          Grunnmuren tilbyr utility-klasser for konsistent og responsiv spacing
          som kan brukes i blant annet grid-layouts. Disse klassene sørger for
          at avstanden mellom elementer skalerer riktig på tvers av
          skjermstørrelser.
        </p>

        <h3 className="heading-s">.layout-gap-x</h3>
        <p>
          Klassen <code>layout-gap-x</code> setter horisontal avstand mellom
          elementer i et grid. Den kombinerer en base-spacing med responsiv
          grid-spacing:
        </p>
        <ul>
          <li>
            Base: <code>gap-x-2</code> (0.5rem)
          </li>
          <li>
            <code>sm:</code> <code>gap-x-4</code> (1rem)
          </li>
          <li>
            <code>md:</code> <code>gap-x-9</code> (2.25rem)
          </li>
          <li>
            <code>lg:</code> <code>gap-x-12</code> (3rem)
          </li>
          <li>
            <code>xl:</code> <code>gap-x-16</code> (4rem)
          </li>
        </ul>

        <h3 className="heading-s">.layout-gap-y</h3>
        <p>
          Klassen <code>layout-gap-y</code> setter vertikal avstand mellom
          elementer i et grid. Den er responsiv og øker avstanden på større
          skjermer:
        </p>
        <ul>
          <li>
            Base: <code>gap-y-4</code> (1rem)
          </li>
          <li>
            <code>sm:</code> <code>gap-y-6</code> (1.5rem)
          </li>
          <li>
            <code>md:</code> <code>gap-y-8</code> (2rem)
          </li>
          <li>
            <code>lg:</code> <code>gap-y-10</code> (2.5rem)
          </li>
          <li>
            <code>xl:</code> <code>gap-y-12</code> (3rem)
          </li>
        </ul>

        <h3 className="heading-s">.layout-grid-gap-x</h3>
        <p>
          Klassen <code>layout-grid-gap-x</code> brukes internt av{' '}
          <code>layout-grid</code> og <code>layout-subgrid-*</code> for å sette
          riktig kolonneavstand. Den kan også brukes direkte dersom du kun
          ønsker den responsive horisontale grid-spacingen uten base-spacingen
          fra <code>layout-gap-x</code>. Den har samme responsive verdier som{' '}
          <code>layout-gap-x</code>, men kun fra og med <code>sm:</code> og
          oppover.
        </p>

        <h3 className="heading-s">Eksempel på bruk:</h3>
        <Code
          value={`<main className="layout-grid-container layout-gap-y">
  <section className="sm:col-span-6">Venstre kolonne</section>
  <section className="sm:col-span-6">Høyre kolonne</section>
  <section className="sm:col-span-12">Full bredde seksjon</section>
</main>`}
        />
        <p>
          I eksempelet over vil <code>layout-grid-container</code> automatisk
          sette horisontal spacing mellom kolonnene, mens{' '}
          <code>layout-gap-y</code> sørger for responsiv vertikal avstand mellom
          radene.
        </p>
      </section>
    </>
  );
}
