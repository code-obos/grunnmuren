import type { Meta, StoryObj } from '@storybook/react';
import { AlertboxProps, Alertbox } from '.';
import { useState } from 'react';
import { Button } from '..';
import { Content, Heading, Footer } from '../content';

const meta: Meta<typeof Alertbox> = {
  title: 'Alertbox',
  component: Alertbox,
};

export default meta;

type Story = StoryObj<typeof Alertbox>;

const Template = (args: AlertboxProps) => (
  <Alertbox {...args}>
    <Heading level={2}>Informativ tittel</Heading>
    <Content>
      <p>
        Bruk dette tekstfeltet til å beskrive hva varslingen handler om. Du kan
        bruke så mange linjer du har behov for, men prøv likevel å være kort og
        konsis.
      </p>
    </Content>
    <Footer>
      <p>
        Sist oppdatert: <time dateTime="2024-01-20">20.01.2024</time>
      </p>
    </Footer>
  </Alertbox>
);

const SmallTemplate = (args: AlertboxProps) => (
  <Alertbox {...args}>
    <Content>Bruk dette tekstfeltet til å skrive en kort varsling</Content>
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

const defaultProps = { role: 'alert', variant: 'info' } as const;

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
  args: { ...defaultProps, isDismissable: true },
};

export const SmallDismissableAlert: Story = {
  render: SmallTemplate,
  args: { ...defaultProps, isDismissable: true },
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
