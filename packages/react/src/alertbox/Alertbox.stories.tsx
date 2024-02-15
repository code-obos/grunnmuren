import type { Meta, StoryObj } from '@storybook/react';
import {
  AlertboxProps,
  Alertbox,
  AlertboxHeading,
  AlertboxBody,
  AlertboxFooter,
} from '.';
import { useState } from 'react';
import { Button } from '..';

const meta: Meta<typeof Alertbox> = {
  title: 'Alertbox',
  component: Alertbox,
};

export default meta;

type Story = StoryObj<typeof Alertbox>;

const Template = (args: AlertboxProps) => (
  <Alertbox {...args}>
    <AlertboxHeading level={2}>Informativ tittel</AlertboxHeading>
    <AlertboxBody>
      <p>
        Bruk dette tekstfeltet til å beskrive hva varslingen handler om. Du kan
        bruke så mange linjer du har behov for, men prøv likevel å være kort og
        konsis.
      </p>
    </AlertboxBody>
    <AlertboxFooter>
      <p>
        Sist oppdatert: <time dateTime="2024-01-20">20.01.2024</time>
      </p>
    </AlertboxFooter>
  </Alertbox>
);

const SmallTemplate = (args: AlertboxProps) => (
  <Alertbox {...args}>
    <AlertboxBody>
      Bruk dette tekstfeltet til å skrive en kort varsling
    </AlertboxBody>
  </Alertbox>
);

const ControlledTemplate = (args: AlertboxProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsVisible((prevState) => !prevState)}
        className="mb-4"
      >
        {`${isVisible ? 'Skjul' : 'Vis'} alert`}
      </Button>
      <Template
        {...args}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </>
  );
};

const defaultProps = { role: 'alert' as const };

export const DefaultAlert: Story = {
  render: Template,
  args: defaultProps,
};

export const SmallAlert: Story = {
  render: SmallTemplate,
  args: defaultProps,
};

export const DismissableAlert: Story = {
  render: Template,
  args: { ...defaultProps, isDismissable: true, role: 'dialog' },
};

export const SmallDismissableAlert: Story = {
  render: SmallTemplate,
  args: { ...defaultProps, isDismissable: true, role: 'dialog' },
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

export const ControlledAlert: Story = {
  render: ControlledTemplate,
  args: { ...defaultProps, variant: 'danger', isDismissable: true },
};

export const ExpandableAlert: Story = {
  render: Template,
  args: { ...defaultProps, isExpandable: true },
};

export const ExpandableDismissableAlert: Story = {
  render: Template,
  args: { ...defaultProps, isExpandable: true, isDismissable: true },
};
