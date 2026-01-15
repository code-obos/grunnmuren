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
  },
  argTypes: {
    animateIcon: {
      control: { type: 'select' },
    },
  },
  render: (args) => <Link {...args}>Bolig</Link>,
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ExternalLink: Story = {
  args: {
    href: 'https://www.obos.no',
    target: '_blank',
    rel: 'noreferrer',
    animateIcon: 'up-right',
  },
  render: (args) => (
    <Link {...args}>
      obos.no
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

export const Inline: Story = {
  render: (args) => (
    <p>
      This is a paragraph with an <Link {...args}>inline link</Link> inside of
      it.
    </p>
  ),
};

export const OverridenTextColor: Story = {
  args: {
    className: 'text-mint',
  },
  globals: {
    backgrounds: {
      value: 'blue-dark',
    },
  },
};

export const IsDisabled: Story = {
  args: {
    isDisabled: true,
  },
};
