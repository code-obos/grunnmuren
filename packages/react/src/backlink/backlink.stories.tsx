import type { Meta, StoryObj } from '@storybook/react-vite';

import { Backlink, type BacklinkProps } from '.';

const Template = (args: BacklinkProps) => {
  const { href, ...rest } = args;
  return (
    <div className="flex gap-20">
      <div className="flex flex-col">
        Link
        <Backlink href={href} {...rest}>
          Tilbake
        </Backlink>
      </div>
      <div>
        Button
        <Backlink {...rest}>Tilbake</Backlink>
      </div>
    </div>
  );
};

const meta = {
  title: 'Backlink',
  component: Backlink,
} satisfies Meta<typeof Backlink>;

export default meta;

type Story = StoryObj<typeof meta>;

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
