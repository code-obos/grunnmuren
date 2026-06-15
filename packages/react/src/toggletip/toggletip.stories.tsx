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
 * The `default` variant is an icon button (44x44 click area). Pass the icon as
 * children and remember an `aria-label`, since the button has no visible text.
 */
export const IconTrigger = () => (
  <span className="inline-flex items-center gap-1 text-base">
    Felleskostnader
    <Toggletip>
      <ToggletipTrigger aria-label="Mer om felleskostnader">
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
 * The popover positions itself relative to the trigger and flips automatically
 * when there isn't room. Use the `placement` prop to set a preferred side.
 */
export const Placement = () => (
  <div className="flex gap-8 text-base">
    <Toggletip>
      <ToggletipTrigger aria-label="Vis over">
        <InfoCircle />
      </ToggletipTrigger>
      <ToggletipContent aria-label="Plassering over" placement="top">
        Denne toggletippen foretrekker å åpne over triggeren.
      </ToggletipContent>
    </Toggletip>
    <Toggletip>
      <ToggletipTrigger aria-label="Vis til høyre">
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
