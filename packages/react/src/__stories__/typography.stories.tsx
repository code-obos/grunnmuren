import type { Meta } from '@storybook/react-vite';

export const Default = () => {
  return (
    <div className="grid gap-8">
      <h1 className="heading-xl">Grunnmuren</h1>
      <p className="lead">Grunnmuren er designsystemet til OBOS.</p>
      <h2 className="heading-l">Typografi i Grunnmuren</h2>
      <p className="paragraph">
        Typografien i Grunnmuren defineres av tailwind-klasser. Denne teksten
        har for eksempel klassen <code>paragraph</code>.
      </p>
      <h3 className="heading-m">Sitater</h3>
      <p className="paragraph">
        Lengre sitater kan framheves med klassen <code>blockquote</code>:
      </p>
      <blockquote className="blockquote">
        Typografi er grunnmuren i all visuell kommunikasjon; den bærer
        budskapets vekt og gir strukturen vi bygger vår forståelse på.
      </blockquote>
      <h3 className="heading-m">Bildetekster</h3>
      <p className="paragraph">
        Klassen <code>description</code> kan f.eks. brukes for bildetekster:
      </p>
      <figure>
        <img
          className="mb-4 max-w-96 bg-blue-dark p-4"
          src="https://cdn.sanity.io/media-libraries/mln4u7f3Hc8r/images/9a29374fde57a12bedf17149525c325a8c3254ae-850x180.svg?auto=format"
          alt="OBOS logo"
        />
        <figcaption className="description">
          OBOS sin logo har hvit tekst, og bildet må derfor ha en mørk bakgrunn.
          Slik at man kan se hva det står.
        </figcaption>
      </figure>
    </div>
  );
};

export const Headings = () => {
  return (
    <>
      <h1 className="heading-xl">Overskrift nivå 1 (XL)</h1>
      <h2 className="heading-l">Overskrift nivå 2 (L)</h2>
      <h3 className="heading-m">Overskrift nivå 3 (M)</h3>
      <h4 className="heading-s">Overskrift nivå 4 (S)</h4>
      <h5 className="heading-xs">Overskrift nivå 5 (XS)</h5>
    </>
  );
};

export const Lead = () => (
  <p className="lead">
    Dokumentavgift er en avgift som du må betale til staten når du kjøper en
    fast eiendom.
  </p>
);

export const Body = () => {
  return (
    <>
      <p className="paragraph">
        Mange opplever at prisvekst og rentehevinger har fått store konsekvenser
        for økonomien. Førstegangskjøpere og de som tjener mindre, sliter med å
        komme seg inn på boligmarkedet.
      </p>
      <p className="paragraph">
        – Det er et tøft boligmarked, og med de prisene det er på bolig i Oslo,
        virket det nesten umulig å komme inn på markedet. Jeg var på noen
        visninger, men det ble enten for lite eller for gammelt og slitt,
        forteller boligkjøper Brita (30).
      </p>
    </>
  );
};

export const Blockquote = () => (
  <blockquote className="blockquote">
    Typografi er grunnmuren i all visuell kommunikasjon; den bærer budskapets
    vekt og gir strukturen vi bygger vår forståelse på.
  </blockquote>
);

export const Description = () => (
  <figcaption className="description">
    Lav møblering gjør at rommet oppleves større. Zen Milano-sengen er fra
    Bohus, mens Soft Serve-lampen er fra Moniker.
  </figcaption>
);

const ProseContent = () => {
  return (
    <>
      <h1 className="text-center">Woops!</h1>

      <p className="lead text-center">Nå er det noe som er galt her.</p>

      <p className="text-center">
        Sidene på fluks.obosblockwatne.no er dessverre ikke tilgjengelige
        akkurat nå. De digitale bygningsarbeiderne våre jobber på spreng for å
        fikse feilen, og vanligvis er sidene oppe og går igjen i løpet av kort
        tid. Nedenfor finner du kontaktinformasjon.
      </p>

      <h2>Kontakt Fluks — OBOS Block Watne</h2>

      <blockquote>
        Det er et tøft boligmarked, og med de prisene det er på bolig i Oslo,
        virket det nesten umulig å komme inn på markedet. Jeg var på noen
        visninger, men det ble enten for lite eller for gammelt og slitt
      </blockquote>

      <p>
        Telefon: <a href="tel:23246000">+47 23 24 60 00</a>
      </p>
      <hr />
      <p>
        E-post: <a href="mailto:obw.flukspost@obos.no">obw.flukspost@obos.no</a>
      </p>

      <p className="description">Ved stor pågang vil det være noe ventetid.</p>
      <ul>
        <li>hei</li>
        <li>på</li>
        <li>deg</li>
      </ul>
      <ol>
        <li>hei</li>
        <li>på</li>
        <li>deg</li>
      </ol>
    </>
  );
};

export const Prose = () => (
  <div className="prose container-prose my-12md:my-20">
    <ProseContent />
  </div>
);

export const ProseWhite = () => (
  <div className="prose prose-white container-prose my-12md:my-20 bg-blue-dark">
    <ProseContent />
  </div>
);

const meta: Meta = {
  title: 'Typography',
};

export default meta;
