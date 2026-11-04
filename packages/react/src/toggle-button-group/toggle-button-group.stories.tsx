import {
  ArrowsRightLeft,
  Calendar,
  LayoutGrid,
  List,
  Lock,
  MapPin,
} from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { Key } from 'react-aria-components';
import { expect, userEvent, within } from 'storybook/test';

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

type Story = StoryObj<typeof meta>;

/** Only one button can be selected at a time. This is the default selection mode. */
export const SingleSelection: Story = {
  render: () => (
    <ToggleButtonGroup
      aria-label="Rentetype"
      defaultSelectedKeys={['fixed']}
      disallowEmptySelection
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
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('radiogroup', { name: 'Rentetype' })).toBeInTheDocument();
    const fixed = canvas.getByRole('radio', { name: 'Fastrente' });
    const floating = canvas.getByRole('radio', { name: 'Flytende rente' });
    await expect(fixed).toHaveAttribute('aria-checked', 'true');

    await userEvent.click(floating);
    await expect(floating).toHaveAttribute('aria-checked', 'true');
    await expect(fixed).toHaveAttribute('aria-checked', 'false');

    await userEvent.keyboard('{ArrowLeft}');
    await expect(fixed).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(fixed).toHaveAttribute('aria-checked', 'true');

    // The screenshot is taken right after play, so leave no hover and let the colour transition finish
    await userEvent.unhover(floating);
    await Promise.all(document.getAnimations().map((animation) => animation.finished));
  },
};

/** Several buttons can be selected at the same time. */
export const MultipleSelection: Story = {
  render: () => (
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
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('toolbar', { name: 'Visning' })).toBeInTheDocument();
    const calendar = canvas.getByRole('button', { name: 'Kalender' });
    await expect(canvas.getByRole('button', { name: 'Liste' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(calendar).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(calendar);
    await expect(calendar).toHaveAttribute('aria-pressed', 'true');
    await expect(canvas.getByRole('button', { name: 'Kart' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    await userEvent.unhover(calendar);
    await Promise.all(document.getAnimations().map((animation) => animation.finished));
  },
};

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

/**
 * Disabled buttons and groups are hidden entirely, since the design system avoids disabled states.
 * Here only «Liste» and «Kalender» are shown, and the fully disabled group is not rendered.
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6">
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
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('radiogroup', { name: 'Hele gruppen deaktivert' })).toBeNull();
    const group = canvas.getByRole('radiogroup', { name: 'Én knapp deaktivert' });
    await expect(within(group).queryByRole('radio', { name: 'Kart' })).toBeNull();
    await expect(within(group).getAllByRole('radio')).toHaveLength(2);
  },
};

export const Controlled = () => {
  const [selected, setSelected] = useState<Set<Key>>(new Set(['fixed']));

  return (
    <div className="flex flex-col items-start gap-4">
      <ToggleButtonGroup
        aria-label="Rentetype"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        disallowEmptySelection
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
      <p>Valgt: {[...selected].join(', ')}</p>
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

export const VerticalIconOnly = () => (
  <ToggleButtonGroup aria-label="Visning" orientation="vertical" defaultSelectedKeys={['list']}>
    <ToggleButton id="list" aria-label="Liste" isIconOnly>
      <List />
    </ToggleButton>
    <ToggleButton id="map" aria-label="Kart" isIconOnly>
      <MapPin />
    </ToggleButton>
    <ToggleButton id="grid" aria-label="Rutenett" isIconOnly>
      <LayoutGrid />
    </ToggleButton>
  </ToggleButtonGroup>
);
