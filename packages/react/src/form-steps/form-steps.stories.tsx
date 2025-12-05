import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../content';
import { UNSAFE_Link as Link } from '../link';
import { UNSAFE_ProgressBar as ProgressBar } from '../progress-bar';
import { UNSAFE_FormStep as FormStep, UNSAFE_FormSteps as FormSteps } from './';

const meta: Meta<typeof FormSteps> = {
  title: 'FormSteps',
  component: FormSteps,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FormSteps currentStep={1}>
      <FormStep>
        <Text>Personalia</Text>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Kontaktinformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Leveringsadresse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Bekrefelse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const OneCompleted: Story = {
  render: () => (
    <FormSteps currentStep={2}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Kontaktinformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Leveringsadresse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Bekrefelse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const TwoCompleted: Story = {
  render: () => (
    <FormSteps currentStep={3}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Leveringsadresse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Bekrefelse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const ThreeCompleted: Story = {
  render: () => (
    <FormSteps currentStep={4}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Leveringsadresse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Bekrefelse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const FourCompleted: Story = {
  render: () => (
    <FormSteps currentStep={5}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Leveringsadresse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Bekrefelse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const FiveCompleted: Story = {
  render: () => (
    <FormSteps currentStep={6}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-5-betalingsinformasjon">Betalingsinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Leveringsadresse</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Bekrefelse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const SixCompleted: Story = {
  render: () => (
    <FormSteps currentStep={7}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-5-betalingsinformasjon">Betalingsinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-6-leveringsadresse">Leveringsadresse</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Bekrefelse</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const SevenCompleted: Story = {
  render: () => (
    <FormSteps currentStep={8}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-5-betalingsinformasjon">Betalingsinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-6-leveringsadresse">Leveringsadresse</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-7-bekrefelse">Bekrefelse</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

// 3 Steps variants
export const ThreeSteps: Story = {
  render: () => (
    <FormSteps currentStep={1}>
      <FormStep>
        <Text>Personalia</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Kontaktinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const ThreeStepsOneCompleted: Story = {
  render: () => (
    <FormSteps currentStep={2}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Kontaktinformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const ThreeStepsAllCompleted: Story = {
  render: () => (
    <FormSteps currentStep={3}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

// 4 Steps variants
export const FourSteps: Story = {
  render: () => (
    <FormSteps currentStep={1}>
      <FormStep>
        <Text>Personalia</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Kontaktinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const FourStepsOneCompleted: Story = {
  render: () => (
    <FormSteps currentStep={2}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Kontaktinformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const FourStepsTwoCompleted: Story = {
  render: () => (
    <FormSteps currentStep={3}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const FourStepsAllCompleted: Story = {
  render: () => (
    <FormSteps currentStep={4}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

// 5 Steps variants
export const FiveSteps: Story = {
  render: () => (
    <FormSteps currentStep={1}>
      <FormStep>
        <Text>Personalia</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Kontaktinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const FiveStepsOneCompleted: Story = {
  render: () => (
    <FormSteps currentStep={2}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Kontaktinformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const FiveStepsTwoCompleted: Story = {
  render: () => (
    <FormSteps currentStep={3}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const FiveStepsThreeCompleted: Story = {
  render: () => (
    <FormSteps currentStep={4}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const FiveStepsAllCompleted: Story = {
  render: () => (
    <FormSteps currentStep={5}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

// 6 Steps variants
export const SixSteps: Story = {
  render: () => (
    <FormSteps currentStep={1}>
      <FormStep>
        <Text>Personalia</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Kontaktinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const SixStepsOneCompleted: Story = {
  render: () => (
    <FormSteps currentStep={2}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Kontaktinformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const SixStepsTwoCompleted: Story = {
  render: () => (
    <FormSteps currentStep={3}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const SixStepsThreeCompleted: Story = {
  render: () => (
    <FormSteps currentStep={4}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const SixStepsFourCompleted: Story = {
  render: () => (
    <FormSteps currentStep={5}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const SixStepsAllCompleted: Story = {
  render: () => (
    <FormSteps currentStep={6}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-5-betalingsinformasjon">Betalingsinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

// 7 Steps variants
export const SevenSteps: Story = {
  render: () => (
    <FormSteps currentStep={1}>
      <FormStep>
        <Text>Personalia</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Kontaktinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Leveringsadresse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const SevenStepsOneCompleted: Story = {
  render: () => (
    <FormSteps currentStep={2}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Kontaktinformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Leveringsadresse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const SevenStepsTwoCompleted: Story = {
  render: () => (
    <FormSteps currentStep={3}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Leveringsadresse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const SevenStepsThreeCompleted: Story = {
  render: () => (
    <FormSteps currentStep={4}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Samtykke</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Leveringsadresse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const SevenStepsFourCompleted: Story = {
  render: () => (
    <FormSteps currentStep={5}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Leveringsadresse</Text>
        <ProgressBar value={0} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const SevenStepsFiveCompleted: Story = {
  render: () => (
    <FormSteps currentStep={6}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-5-betalingsinformasjon">Betalingsinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Leveringsadresse</Text>
        <ProgressBar value={50} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};

export const SevenStepsAllCompleted: Story = {
  render: () => (
    <FormSteps currentStep={7}>
      <FormStep isCompleted>
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-5-betalingsinformasjon">Betalingsinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep isCompleted>
        <Link href="/steg-6-leveringsadresse">Leveringsadresse</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep>
        <Text>Oppsummering</Text>
      </FormStep>
    </FormSteps>
  ),
};
