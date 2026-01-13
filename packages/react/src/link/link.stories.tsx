import { Download, LinkExternal } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { UNSAFE_Link as Link } from './link';

const meta = {
  title: 'Link',
  component: Link,
  args: {
    href: '#bolig',
    onPress: fn(),
    animateIcon: undefined,
    children: 'Bolig',
  },
  argTypes: {
    animateIcon: {
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLongerText = () => (
  <p>
    Dette er et avsnitt med en <Link href="/innebygd">lenke</Link> inni.
  </p>
);

export const WithBgColor: Story = {
  args: {
    className: 'text-mint',
  },
  globals: {
    backgrounds: {
      value: 'blue-dark',
    },
  },
};

export const ExternalLink: Story = {
  args: {
    href: 'https://www.obos.no',
    target: '_blank',
    rel: 'noreferrer',
    animateIcon: 'up-right',
  },
  render: (args) => (
    <Link {...args}>
      Last ned dokument
      <LinkExternal />
    </Link>
  ),
};

export const DownloadLink: Story = {
  args: {
    href: '#document.pdf',
    download: true,
    animateIcon: 'down',
  },
  render: (args) => (
    <Link {...args}>
      Last ned dokument
      <Download />
    </Link>
  ),
};

export const IsDisabled: Story = {
  args: {
    isDisabled: true,
  },
};
