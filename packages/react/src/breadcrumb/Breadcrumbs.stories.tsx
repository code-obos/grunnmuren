import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs } from '../breadcrumb';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Breadcrumbs',
  component: Breadcrumbs,

  render: () => {
    return (
      <Breadcrumbs
        links={[
          { href: '/', label: 'Min side' },
          { href: '/', label: 'Instillinger' },
          { href: '/', label: 'Kontaktinformasjon' },
        ]}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    links: [
      { href: '/', label: 'Min side' },
      { href: '/', label: 'Instillinger' },
      { href: '/', label: 'Kontaktinformasjon' },
    ],
  },
};
