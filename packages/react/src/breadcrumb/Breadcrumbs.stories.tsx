import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumb, Breadcrumbs } from '../breadcrumb';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Breadcrumbs',
  component: Breadcrumbs,

  render: () => {
    return (
      <Breadcrumbs>
        <Breadcrumb href="/">Min side</Breadcrumb>
        <Breadcrumb href="/">Instillinger</Breadcrumb>
        <Breadcrumb>Kontaktinformasjon</Breadcrumb>
      </Breadcrumbs>
    );
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    children: (
      <Breadcrumbs>
        <Breadcrumb href="/">Min side</Breadcrumb>
        <Breadcrumb href="/">Instillinger</Breadcrumb>
        <Breadcrumb href="/">Kontaktinformasjon</Breadcrumb>
      </Breadcrumbs>
    ),
  },
};

export const Long = () => {
  return (
    <Breadcrumbs>
      <Breadcrumb href="/">Min side</Breadcrumb>
      <Breadcrumb href="/">Instillinger</Breadcrumb>
      <Breadcrumb href="/">Kontaktinformasjon</Breadcrumb>
      <Breadcrumb href="/">Side 1</Breadcrumb>
      <Breadcrumb href="/">Side 2</Breadcrumb>
      <Breadcrumb href="/">Side 3</Breadcrumb>
      <Breadcrumb href="/">Side 4</Breadcrumb>
      <Breadcrumb href="/">Side 5</Breadcrumb>
      <Breadcrumb href="/">Side 6</Breadcrumb>
    </Breadcrumbs>
  );
};
