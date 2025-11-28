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
    <FormSteps>
      <FormStep state="completed">
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="current">
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
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

export const TwoCompleted: Story = {
  render: () => (
    <FormSteps>
      <FormStep state="completed">
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="current">
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
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
    <FormSteps>
      <FormStep state="completed">
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="current">
        <Link href="/steg-4-samtykke">Samtykke</Link>
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
    <FormSteps>
      <FormStep state="completed">
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="current">
        <Link href="/steg-5-betalingsinformasjon">Betalingsinformasjon</Link>
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
    <FormSteps>
      <FormStep state="completed">
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-5-betalingsinformasjon">Betalingsinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="current">
        <Link href="/steg-6-leveringsadresse">Leveringsadresse</Link>
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
    <FormSteps>
      <FormStep state="completed">
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-5-betalingsinformasjon">Betalingsinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-6-leveringsadresse">Leveringsadresse</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="current">
        <Link href="/steg-7-bekrefelse">Bekrefelse</Link>
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
    <FormSteps>
      <FormStep state="completed">
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-5-betalingsinformasjon">Betalingsinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-6-leveringsadresse">Leveringsadresse</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-7-bekrefelse">Bekrefelse</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="current">
        <Link href="/steg-8-oppsummering">Oppsummering</Link>
        <ProgressBar value={50} />
      </FormStep>
    </FormSteps>
  ),
};

export const AllCompleted: Story = {
  render: () => (
    <FormSteps>
      <FormStep state="completed">
        <Link href="/steg-1-personalia">Personalia</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-2-kontaktinformasjon">Kontaktinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-3-fakturainformasjon">Fakturainformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-4-samtykke">Samtykke</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-5-betalingsinformasjon">Betalingsinformasjon</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-6-leveringsadresse">Leveringsadresse</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-7-bekrefelse">Bekrefelse</Link>
        <ProgressBar value={100} />
      </FormStep>
      <FormStep state="completed">
        <Link href="/steg-8-oppsummering">Oppsummering</Link>
        <ProgressBar value={100} />
      </FormStep>
    </FormSteps>
  ),
};
