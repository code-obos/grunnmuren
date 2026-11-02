import {
  ArrowsRightLeft,
  Calendar,
  LayoutGrid,
  List,
  Lock,
  MapPin,
} from '@obosbbl/grunnmuren-icons-react';
import type { Meta } from '@storybook/react-vite';
import { useState } from 'react';
import type { Selection } from 'react-aria-components/GridList';

import {
  UNSAFE_ToggleButton as ToggleButton,
  UNSAFE_ToggleButtonGroup as ToggleButtonGroup,
} from './toggle-button-group';

const meta = {
  title: 'ToggleButtonGroup',
  component: ToggleButtonGroup,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ToggleButtonGroup>;

export default meta;

/** Only one button can be selected at a time. This is the default selection mode. */
export const SingleSelection = () => (
  <ToggleButtonGroup aria-label="Rentetype" defaultSelectedKeys={['fixed']} disallowEmptySelection>
    <ToggleButton id="fixed">
      <Lock />
      Fastrente
    </ToggleButton>
    <ToggleButton id="floating">
      <ArrowsRightLeft />
      Flytende rente
    </ToggleButton>
  </ToggleButtonGroup>
);

/** Several buttons can be selected at the same time. */
export const MultipleSelection = () => (
  <ToggleButtonGroup
    aria-label="Visning"
    selectionMode="multiple"
    defaultSelectedKeys={['list', 'map']}
  >
    <ToggleButton id="list">
      <List />
      Liste
    </ToggleButton>
    <ToggleButton id="map">
      <MapPin />
      Kart
    </ToggleButton>
    <ToggleButton id="calendar">
      <Calendar />
      Kalender
    </ToggleButton>
  </ToggleButtonGroup>
);

/** Icon-only buttons are square and need an `aria-label`. */
export const IconOnly = () => (
  <ToggleButtonGroup aria-label="Visning" defaultSelectedKeys={['list']}>
    <ToggleButton id="list" aria-label="Liste" isIconOnly>
      <List />
    </ToggleButton>
    <ToggleButton id="map" aria-label="Kart" isIconOnly>
      <MapPin />
    </ToggleButton>
    <ToggleButton id="calendar" aria-label="Kalender" isIconOnly>
      <Calendar />
    </ToggleButton>
  </ToggleButtonGroup>
);

export const Disabled = () => (
  <div className="flex flex-col gap-6">
    <ToggleButtonGroup
      aria-label="Hele gruppen deaktivert"
      isDisabled
      defaultSelectedKeys={['list']}
    >
      <ToggleButton id="list">
        <List />
        Liste
      </ToggleButton>
      <ToggleButton id="map">
        <MapPin />
        Kart
      </ToggleButton>
    </ToggleButtonGroup>
    <ToggleButtonGroup aria-label="Én knapp deaktivert" defaultSelectedKeys={['list']}>
      <ToggleButton id="list">
        <List />
        Liste
      </ToggleButton>
      <ToggleButton id="map" isDisabled>
        <MapPin />
        Kart
      </ToggleButton>
      <ToggleButton id="calendar">
        <Calendar />
        Kalender
      </ToggleButton>
    </ToggleButtonGroup>
  </div>
);

export const Controlled = () => {
  const [selected, setSelected] = useState<Selection>(new Set(['fixed']));

  return (
    <div className="flex flex-col items-start gap-4">
      <ToggleButtonGroup
        aria-label="Rentetype"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <ToggleButton id="fixed">
          <Lock />
          Fastrente
        </ToggleButton>
        <ToggleButton id="floating">
          <ArrowsRightLeft />
          Flytende rente
        </ToggleButton>
      </ToggleButtonGroup>
      <p>Valgt: {selected === 'all' ? 'alle' : [...selected].join(', ') || 'ingen'}</p>
    </div>
  );
};

export const Vertical = () => (
  <ToggleButtonGroup aria-label="Visning" orientation="vertical" defaultSelectedKeys={['list']}>
    <ToggleButton id="list">
      <List />
      Liste
    </ToggleButton>
    <ToggleButton id="map">
      <MapPin />
      Kart
    </ToggleButton>
    <ToggleButton id="grid">
      <LayoutGrid />
      Rutenett
    </ToggleButton>
  </ToggleButtonGroup>
);
