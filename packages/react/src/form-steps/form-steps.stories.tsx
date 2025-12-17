import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../button';
import { Heading, Text } from '../content';
import { UNSAFE_Link as Link } from '../link';
import { UNSAFE_ProgressBar as ProgressBar } from '../progress-bar';
import { TextArea } from '../textarea';
import { TextField } from '../textfield';
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
      <FormStep isCompleted>
        <Text>Samtykke</Text>
        <ProgressBar value={100} />
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

// Interactive form story with 8 steps
type FormData = {
  step1: { fornavn: string; etternavn: string; fodselsdato: string };
  step2: { epost: string; telefon: string };
  step3: { adresse: string; postnummer: string; poststed: string };
  step4: { samtykke: string };
  step5: { kontonummer: string; banknavn: string };
  step6: {
    leveringsadresse: string;
    leveringspostnummer: string;
    leveringspoststed: string;
  };
  step7: { kommentar: string };
  step8: Record<string, never>;
};

const initialFormData: FormData = {
  step1: { fornavn: '', etternavn: '', fodselsdato: '' },
  step2: { epost: '', telefon: '' },
  step3: { adresse: '', postnummer: '', poststed: '' },
  step4: { samtykke: '' },
  step5: { kontonummer: '', banknavn: '' },
  step6: {
    leveringsadresse: '',
    leveringspostnummer: '',
    leveringspoststed: '',
  },
  step7: { kommentar: '' },
  step8: {},
};

const stepTitles: Record<number, string> = {
  1: 'Personalia',
  2: 'Kontaktinformasjon',
  3: 'Fakturainformasjon',
  4: 'Samtykke',
  5: 'Betalingsinformasjon',
  6: 'Leveringsadresse',
  7: 'Bekrefelse',
  8: 'Oppsummering',
};

const FormWith8StepsDemo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const updateFormData = <K extends keyof FormData>(
    step: K,
    field: keyof FormData[K],
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value,
      },
    }));
  };

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.step1.fornavn &&
          formData.step1.etternavn &&
          formData.step1.fodselsdato
        );
      case 2:
        return !!(formData.step2.epost && formData.step2.telefon);
      case 3:
        return !!(
          formData.step3.adresse &&
          formData.step3.postnummer &&
          formData.step3.poststed
        );
      case 4:
        return !!formData.step4.samtykke;
      case 5:
        return !!(formData.step5.kontonummer && formData.step5.banknavn);
      case 6:
        return !!(
          formData.step6.leveringsadresse &&
          formData.step6.leveringspostnummer &&
          formData.step6.leveringspoststed
        );
      case 7:
        return !!formData.step7.kommentar;
      default:
        return false;
    }
  };

  const getProgressValue = (step: number): number => {
    // Calculate progress based on filled fields
    const calculateFieldProgress = (fields: Record<string, string>): number => {
      const values = Object.values(fields);
      const filledCount = values.filter((v) => v.length > 0).length;
      return Math.round((filledCount / values.length) * 100);
    };

    switch (step) {
      case 1:
        return calculateFieldProgress(formData.step1);
      case 2:
        return calculateFieldProgress(formData.step2);
      case 3:
        return calculateFieldProgress(formData.step3);
      case 4:
        return calculateFieldProgress(formData.step4);
      case 5:
        return calculateFieldProgress(formData.step5);
      case 6:
        return calculateFieldProgress(formData.step6);
      case 7:
        return calculateFieldProgress(formData.step7);
      case 8:
        return currentStep === 8 ? 100 : 0;
      default:
        return 0;
    }
  };

  const handleNext = () => {
    if (currentStep < 8 && isStepComplete(currentStep)) {
      setCompletedSteps((prev) => new Set(prev).add(currentStep));
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleGoToStep = (step: number) => () => {
    if (
      step <= currentStep ||
      completedSteps.has(step) ||
      canNavigateToStep(step)
    ) {
      setCurrentStep(step);
      // Update URL without navigation
      const url = new URL(window.location.href);
      url.searchParams.set('currentStep', String(step));
      window.history.pushState({}, '', url.toString());
    }
  };

  // Check if all steps before a given step are completed
  const canNavigateToStep = (step: number): boolean => {
    for (let i = 1; i < step; i++) {
      if (!completedSteps.has(i)) {
        return false;
      }
    }
    return true;
  };

  // Check if a step should render as a Link (navigable)
  const isStepNavigable = (step: number): boolean => {
    // Current step is not navigable (already there)
    if (step === currentStep) return false;
    // Completed steps are always navigable
    if (completedSteps.has(step)) return true;
    // Future steps are navigable if all previous steps are completed
    return canNavigateToStep(step);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <TextField
              label="Fornavn"
              value={formData.step1.fornavn}
              onChange={(value) => updateFormData('step1', 'fornavn', value)}
            />
            <TextField
              label="Etternavn"
              value={formData.step1.etternavn}
              onChange={(value) => updateFormData('step1', 'etternavn', value)}
            />
            <TextField
              label="Fødselsdato"
              value={formData.step1.fodselsdato}
              onChange={(value) =>
                updateFormData('step1', 'fodselsdato', value)
              }
            />
            <Button onPress={handleNext} isDisabled={!isStepComplete(1)}>
              Neste
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <TextField
              label="E-post"
              value={formData.step2.epost}
              onChange={(value) => updateFormData('step2', 'epost', value)}
            />
            <TextField
              label="Telefon"
              value={formData.step2.telefon}
              onChange={(value) => updateFormData('step2', 'telefon', value)}
            />
            <Button onPress={handleNext} isDisabled={!isStepComplete(2)}>
              Neste
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4">
            <TextField
              label="Adresse"
              value={formData.step3.adresse}
              onChange={(value) => updateFormData('step3', 'adresse', value)}
            />
            <TextField
              label="Postnummer"
              value={formData.step3.postnummer}
              onChange={(value) => updateFormData('step3', 'postnummer', value)}
            />
            <TextField
              label="Poststed"
              value={formData.step3.poststed}
              onChange={(value) => updateFormData('step3', 'poststed', value)}
            />
            <Button onPress={handleNext} isDisabled={!isStepComplete(3)}>
              Neste
            </Button>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-4">
            <TextArea
              label="Samtykke"
              description="Beskriv hva du samtykker til"
              value={formData.step4.samtykke}
              onChange={(value) => updateFormData('step4', 'samtykke', value)}
            />
            <Button onPress={handleNext} isDisabled={!isStepComplete(4)}>
              Neste
            </Button>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col gap-4">
            <TextField
              label="Kontonummer"
              value={formData.step5.kontonummer}
              onChange={(value) =>
                updateFormData('step5', 'kontonummer', value)
              }
            />
            <TextField
              label="Banknavn"
              value={formData.step5.banknavn}
              onChange={(value) => updateFormData('step5', 'banknavn', value)}
            />
            <Button onPress={handleNext} isDisabled={!isStepComplete(5)}>
              Neste
            </Button>
          </div>
        );
      case 6:
        return (
          <div className="flex flex-col gap-4">
            <TextField
              label="Leveringsadresse"
              value={formData.step6.leveringsadresse}
              onChange={(value) =>
                updateFormData('step6', 'leveringsadresse', value)
              }
            />
            <TextField
              label="Postnummer"
              value={formData.step6.leveringspostnummer}
              onChange={(value) =>
                updateFormData('step6', 'leveringspostnummer', value)
              }
            />
            <TextField
              label="Poststed"
              value={formData.step6.leveringspoststed}
              onChange={(value) =>
                updateFormData('step6', 'leveringspoststed', value)
              }
            />
            <Button onPress={handleNext} isDisabled={!isStepComplete(6)}>
              Neste
            </Button>
          </div>
        );
      case 7:
        return (
          <div className="flex flex-col gap-4">
            <TextArea
              label="Kommentar"
              description="Legg til eventuelle kommentarer"
              value={formData.step7.kommentar}
              onChange={(value) => updateFormData('step7', 'kommentar', value)}
            />
            <Button onPress={handleNext} isDisabled={!isStepComplete(7)}>
              Neste
            </Button>
          </div>
        );
      case 8:
        return (
          <div className="flex flex-col gap-4">
            <Text>Oppsummering av skjema:</Text>
            <pre className="rounded bg-gray-100 p-4 text-sm">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full max-w-2xl gap-8 px-4 max-lg:flex-col lg:gap-x-20">
      <FormSteps currentStep={currentStep} className="max-lg:mx-auto">
        <FormStep isCompleted={completedSteps.has(1)}>
          {isStepNavigable(1) ? (
            <Link onPress={handleGoToStep(1)}>Personalia</Link>
          ) : (
            <Text>Personalia</Text>
          )}
          <ProgressBar value={getProgressValue(1)} />
        </FormStep>
        <FormStep isCompleted={completedSteps.has(2)}>
          {isStepNavigable(2) ? (
            <Link onPress={handleGoToStep(2)}>Kontaktinformasjon</Link>
          ) : (
            <Text>Kontaktinformasjon</Text>
          )}
          <ProgressBar value={getProgressValue(2)} />
        </FormStep>
        <FormStep isCompleted={completedSteps.has(3)}>
          {isStepNavigable(3) ? (
            <Link onPress={handleGoToStep(3)}>Fakturainformasjon</Link>
          ) : (
            <Text>Fakturainformasjon</Text>
          )}
          <ProgressBar value={getProgressValue(3)} />
        </FormStep>
        <FormStep isCompleted={completedSteps.has(4)}>
          {isStepNavigable(4) ? (
            <Link onPress={handleGoToStep(4)}>Samtykke</Link>
          ) : (
            <Text>Samtykke</Text>
          )}
          <ProgressBar value={getProgressValue(4)} />
        </FormStep>
        <FormStep isCompleted={completedSteps.has(5)}>
          {isStepNavigable(5) ? (
            <Link onPress={handleGoToStep(5)}>Betalingsinformasjon</Link>
          ) : (
            <Text>Betalingsinformasjon</Text>
          )}
          <ProgressBar value={getProgressValue(5)} />
        </FormStep>
        <FormStep isCompleted={completedSteps.has(6)}>
          {isStepNavigable(6) ? (
            <Link onPress={handleGoToStep(6)}>Leveringsadresse</Link>
          ) : (
            <Text>Leveringsadresse</Text>
          )}
          <ProgressBar value={getProgressValue(6)} />
        </FormStep>
        <FormStep isCompleted={completedSteps.has(7)}>
          {isStepNavigable(7) ? (
            <Link onPress={handleGoToStep(7)}>Bekrefelse</Link>
          ) : (
            <Text>Bekrefelse</Text>
          )}
          <ProgressBar value={getProgressValue(7)} />
        </FormStep>
        <FormStep>
          {isStepNavigable(8) ? (
            <Link onPress={handleGoToStep(8)}>Oppsummering</Link>
          ) : (
            <Text>Oppsummering</Text>
          )}
        </FormStep>
      </FormSteps>

      <div className="pt-8">
        <Heading level={2} size="m" className="mb-4">
          {currentStep}. {stepTitles[currentStep]}
        </Heading>
        {renderStepContent()}
      </div>
    </div>
  );
};

export const FormWith8Steps: Story = {
  render: () => <FormWith8StepsDemo />,
  parameters: {
    layout: 'padded',
  },
};
