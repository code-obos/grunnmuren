import type { Meta, StoryObj } from '@storybook/react';
import {
  AlertboxProps,
  Alertbox,
  AlertboxHeading,
  AlertboxBody,
  AlertboxFooter,
} from '.';

const meta: Meta<typeof Alertbox> = {
  title: 'Alertbox',
  component: Alertbox,
};

export default meta;

type Story = StoryObj<typeof Alertbox>;

const Template = (args: AlertboxProps) => (
  <Alertbox {...args}>
    <AlertboxHeading level={2}>This is the heading</AlertboxHeading>
    <AlertboxBody>Some text</AlertboxBody>
    <AlertboxFooter>Sist oppdatert: 20.01.2024</AlertboxFooter>
  </Alertbox>
);

const ShortTemplate = (args: AlertboxProps) => (
  <Alertbox {...args}>
    <AlertboxBody>Some short message</AlertboxBody>
  </Alertbox>
);

const defaultProps = {};

export const Default: Story = {
  render: Template,
  args: defaultProps,
};

export const Short: Story = {
  render: ShortTemplate,
  args: defaultProps,
};

export const NonDismissable: Story = {
  render: Template,
  args: { ...defaultProps, isDismissable: false },
};
