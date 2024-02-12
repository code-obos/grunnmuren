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

const SmallTemplate = (args: AlertboxProps) => (
  <Alertbox {...args}>
    <AlertboxBody>Some short message</AlertboxBody>
  </Alertbox>
);

const defaultProps = {};

export const DefaultAlert: Story = {
  render: Template,
  args: defaultProps,
};

export const SmallAlert: Story = {
  render: SmallTemplate,
  args: defaultProps,
};

export const NonDismissableAlert: Story = {
  render: Template,
  args: { ...defaultProps, isDismissable: false },
};

export const SuccessAlert: Story = {
  render: Template,
  args: { ...defaultProps, variant: 'success' },
};

export const WarningAlert: Story = {
  render: Template,
  args: { ...defaultProps, variant: 'warning' },
};

export const DangerAlert: Story = {
  render: Template,
  args: { ...defaultProps, variant: 'danger' },
};
