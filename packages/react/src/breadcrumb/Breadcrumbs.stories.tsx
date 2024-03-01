import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs } from '../breadcrumb';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Breadcrumbs',
  component: Breadcrumbs,

  render: () => {
    return (
      <Breadcrumbs
        links={[
          { href: '/', text: 'Min side' },
          { href: '/', text: 'Instillinger' },
          { href: '/', text: 'Kontaktinformasjon' },
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
      { href: '/', text: 'Min side' },
      { href: '/', text: 'Instillinger' },
      { href: '/', text: 'Kontaktinformasjon' },
    ],
  },
};
