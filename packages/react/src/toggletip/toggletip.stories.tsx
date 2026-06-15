import { InfoCircle } from '@obosbbl/grunnmuren-icons-react';
import type { Meta } from '@storybook/react-vite';

import {
  UNSAFE_Toggletip as Toggletip,
  UNSAFE_ToggletipContent as ToggletipContent,
  UNSAFE_ToggletipTrigger as ToggletipTrigger,
} from './toggletip';

const meta = {
  title: 'Toggletip',
  component: Toggletip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toggletip>;

export default meta;

/**
 * The `definition` variant renders an inline term with a dashed underline. It is
 * meant for explaining a word in running text — clicking the term opens a small
 * dialog with the explanation. The term is highlighted yellow while open.
 */
export const Definition = () => (
  <p className="max-w-prose text-base">
    Boligen selges som et{' '}
    <Toggletip>
      <ToggletipTrigger variant="definition">borettslag</ToggletipTrigger>
      <ToggletipContent aria-label="Forklaring av borettslag">
        Et borettslag er et selskap som eier en eller flere boligeiendommer, der du kjøper en andel
        som gir deg borett til en bestemt bolig.
      </ToggletipContent>
    </Toggletip>
    , og du kjøper derfor en andel framfor en selveierbolig.
  </p>
);

/**
 * The `info` variant is an icon button (44x44 click area). Pass the icon as
 * children and remember an `aria-label`, since the button has no visible text.
 */
export const IconTrigger = () => (
  <span className="inline-flex items-center gap-1 text-base">
    Felleskostnader
    <Toggletip>
      <ToggletipTrigger aria-label="Mer om felleskostnader" variant="info">
        <InfoCircle />
      </ToggletipTrigger>
      <ToggletipContent aria-label="Mer om felleskostnader">
        Felleskostnader dekker borettslagets felles utgifter, som vedlikehold, forsikring,
        renovasjon og eventuell felles gjeld.
      </ToggletipContent>
    </Toggletip>
  </span>
);

/**
 * Without a `variant`, `ToggletipTrigger` only carries the button behaviour and
 * focus ring — the children and styling are entirely up to you. Here the trigger
 * is a small custom-styled button.
 */
export const CustomTrigger = () => (
  <span className="inline-flex items-center gap-2 text-base">
    Leveringstid
    <Toggletip>
      <ToggletipTrigger
        aria-label="Mer om leveringstid"
        className="bg-blue-dark rounded-full px-2 py-0.5 text-sm text-white"
      >
        Hva betyr dette?
      </ToggletipTrigger>
      <ToggletipContent aria-label="Mer om leveringstid">
        Leveringstid er antall virkedager fra bestilling til boligen er klar for innflytting.
      </ToggletipContent>
    </Toggletip>
  </span>
);

/**
 * The popover positions itself relative to the trigger and flips automatically
 * when there isn't room. Use the `placement` prop to set a preferred side.
 */
export const Placement = () => (
  <div className="flex gap-8 text-base">
    <Toggletip>
      <ToggletipTrigger aria-label="Vis over" variant="info">
        <InfoCircle />
      </ToggletipTrigger>
      <ToggletipContent aria-label="Plassering over" placement="top">
        Denne toggletippen foretrekker å åpne over triggeren.
      </ToggletipContent>
    </Toggletip>
    <Toggletip>
      <ToggletipTrigger aria-label="Vis til høyre" variant="info">
        <InfoCircle />
      </ToggletipTrigger>
      <ToggletipContent aria-label="Plassering til høyre" placement="right">
        Denne toggletippen foretrekker å åpne til høyre for triggeren.
      </ToggletipContent>
    </Toggletip>
  </div>
);

/**
 * The content may include a link. Tabbing past the last focusable element closes
 * the toggletip and returns focus to the trigger.
 */
export const WithLink = () => (
  <p className="max-w-prose text-base">
    Du kan lese mer om{' '}
    <Toggletip>
      <ToggletipTrigger variant="definition">andelsbolig</ToggletipTrigger>
      <ToggletipContent aria-label="Forklaring av andelsbolig">
        En andelsbolig er en bolig du eier gjennom en andel i et borettslag.{' '}
        <a className="underline" href="https://www.obos.no" rel="noreferrer" target="_blank">
          Les mer hos OBOS
        </a>
        .
      </ToggletipContent>
    </Toggletip>{' '}
    på nettsidene våre.
  </p>
);

/**
 * A `definition` toggletip placed roughly in the middle of a long running text
 * (about 800px / 50rem tall), to check how the popover positions itself within a
 * real document flow.
 */
export const InRunningText = () => (
  <div className="max-w-prose text-base [&_p]:mb-4">
    <p>
      Å kjøpe sin første bolig er en av de største økonomiske beslutningene de fleste tar. Før du
      legger inn bud, er det lurt å sette seg inn i hva slags eierform boligen har, hva
      felleskostnadene dekker, og hvilke rettigheter og plikter som følger med. Eierformen påvirker
      både prisen, finansieringen og hverdagen din som beboer.
    </p>
    <p>
      I Norge er de to vanligste eierformene selveier og andel. En selveierbolig betyr at du eier
      boligen din direkte, ofte som en seksjon i et eierseksjonssameie. Du står da fritt til å
      selge, leie ut og pantsette boligen innenfor lovens rammer, og du betaler eiendomsskatt og
      fellesutgifter til sameiet.
    </p>
    <p>
      Boligen i dette eksempelet selges derimot som et{' '}
      <Toggletip>
        <ToggletipTrigger variant="definition">borettslag</ToggletipTrigger>
        <ToggletipContent aria-label="Forklaring av borettslag">
          Et borettslag er et selskap som eier en eller flere boligeiendommer, der du kjøper en
          andel som gir deg borett til en bestemt bolig.
        </ToggletipContent>
      </Toggletip>
      . Det betyr at du kjøper en andel i selskapet framfor selve boligen, og at andelen gir deg
      rett til å bo i en bestemt leilighet. Denne forskjellen har betydning både for hvordan kjøpet
      finansieres og for hvilke avgjørelser fellesskapet tar sammen.
    </p>
    <p>
      Mange borettslag har det som kalles fellesgjeld. Det er lån som hele laget står ansvarlig for,
      og din andel av denne gjelda betjenes gjennom de månedlige felleskostnadene. Prisen du ser i
      en annonse, er gjerne innskuddet — det du faktisk betaler for andelen — mens den totale prisen
      også inkluderer din andel av fellesgjelda. Det er derfor viktig å se på begge tallene når du
      sammenligner boliger.
    </p>
    <p>
      Felleskostnadene varierer mye fra lag til lag. De dekker som regel vedlikehold av
      fellesarealer, forsikring av bygningene, renovasjon, og ofte oppvarming og vann. I noen lag
      inngår også kabel-TV og internett. En lav felleskostnad er ikke nødvendigvis et godt tegn
      dersom laget har et stort vedlikeholdsetterslep, for da kan kostnadene øke betydelig i årene
      som kommer.
    </p>
    <p>
      Før du kjøper, bør du lese gjennom årsregnskapet, vedtektene og eventuelle referater fra
      generalforsamlingen. Disse dokumentene forteller mye om økonomien i laget, planlagte
      prosjekter og hvordan fellesskapet fungerer. En godt drevet forening med en sunn økonomi gir
      trygghet og forutsigbarhet, mens et lag med dårlig vedlikehold og høy gjeld kan gi ubehagelige
      overraskelser.
    </p>
    <p>
      Til slutt er det verdt å huske at du som andelseier også får et ansvar. Du deltar på
      generalforsamlingen, er med på å bestemme hvordan laget skal driftes, og bidrar til
      fellesskapet. For mange er nettopp dette en av fordelene med å bo i borettslag: du står ikke
      alene om de store avgjørelsene, og vedlikeholdet av bygningene er et felles ansvar.
    </p>
  </div>
);
