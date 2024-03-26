import type { Meta, StoryObj } from '@storybook/react';

import { Backlink, BacklinkProps } from '.';

const Template = (args: BacklinkProps) => {
  return <Backlink {...args}>Tillbake</Backlink>;
};

const meta: Meta<typeof Backlink> = {
  title: 'Backlink',
  component: Backlink,
};

export default meta;

type Story = StoryObj<typeof Backlink>;

const defaultProps = {
  href: '#',
  withUnderline: false,
} as const;

export const Default: Story = {
  render: Template,
  args: defaultProps,
};

export const WithUnderline: Story = {
  render: Template,
  args: { ...defaultProps, withUnderline: true },
};
