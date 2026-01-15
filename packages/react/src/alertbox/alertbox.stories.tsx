import { Subscription } from '@obosbbl/grunnmuren-icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '..';
import { Content, Footer, Heading } from '../content';
import { Alertbox, type AlertboxProps } from '.';

const meta = {
  title: 'Alertbox',
  component: Alertbox,
} satisfies Meta<typeof Alertbox>;

export default meta;

type Story = StoryObj<typeof meta>;

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
  const [isDismissed, setIsDismissed] = useState(true);

  return (
    <>
      <Button
        onPress={() => setIsDismissed((prevState) => !prevState)}
        className="mb-4"
      >
        {`${isDismissed ? 'Vis' : 'Skjul'} alert`}
      </Button>
      <Template
        {...args}
        isDismissed={isDismissed}
        onDismiss={() => setIsDismissed(true)}
      />
    </>
  );
};

const defaultProps = {
  role: 'alert',
  variant: 'info',
  isDismissable: false,
  isExpandable: false,
  children: undefined,
} as const;

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

export const WithCustomIcon: Story = {
  render: SmallTemplate,
  args: { ...defaultProps, variant: 'success', icon: Subscription },
};
