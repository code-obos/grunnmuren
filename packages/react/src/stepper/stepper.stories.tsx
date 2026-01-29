import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { UNSAFE_Link as Link } from '../link';
import { UNSAFE_Step as Step, UNSAFE_Stepper as Stepper } from './stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  args: {
    onStepChange: fn(),
    activeStep: 1,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// This allows us to update the args from within the story
// so the args shown in storybook reflects the changes in the component
// See https://storybook.js.org/docs/writing-stories/args#setting-args-from-within-a-story
function useStepperArgs(): ComponentProps<typeof Stepper> {
  const [{ onStepChange: originalStepChange, ...args }, updateArgs] =
    useArgs<ComponentProps<typeof Stepper>>();

  function onStepChange(step: number) {
    originalStepChange?.(step);
    updateArgs({ activeStep: step });
  }

  return { ...args, onStepChange };
}

export const Example: Story = {
  // For some reason we need to define the parameter _args even though it is unused,
  // otherwise Storybook won't render the story controls correctly
  render: (_args) => {
    const args = useStepperArgs();
    return (
      <Stepper {...args}>
        <Step>
          <Link>Personalia</Link>
        </Step>
        <Step>
          <Link>Kontaktinformasjon</Link>
        </Step>
        <Step>
          <Link>Kontaktinformasjon</Link>
        </Step>
        <Step>
          <Link>Oppsummering</Link>
        </Step>
      </Stepper>
    );
  },
};

export const OnMobile: Story = {
  // Note that this only works in single story mode, not docs or isolation mode
  globals: {
    viewport: { value: 'mobile2' },
  },

  // For some reason we need to define the parameter _args even though it is unused,
  // otherwise Storybook won't render the story controls correctly
  render: (_args) => {
    const args = useStepperArgs();
    return (
      <Stepper {...args}>
        <Step>
          <Link>Personalia</Link>
        </Step>
        <Step>
          <Link>Kontaktinformasjon</Link>
        </Step>
        <Step>
          <Link>Kontaktinformasjon</Link>
        </Step>
        <Step>
          <Link>Oppsummering</Link>
        </Step>
      </Stepper>
    );
  },
};

export const WithProgress: Story = {
  render: (_args) => {
    const args = useStepperArgs();
    return (
      <Stepper {...args}>
        <Step state="completed" progress={100}>
          <Link>Personalia</Link>
        </Step>
        <Step progress={50}>
          <Link>Kontaktinformasjon</Link>
        </Step>
        <Step progress={25}>
          <Link>Kontaktinformasjon</Link>
        </Step>
        <Step progress={0}>
          <Link>Oppsummering</Link>
        </Step>
      </Stepper>
    );
  },
};

export const CompletedSteps: Story = {
  render: (_args) => {
    const args = useStepperArgs();
    return (
      <Stepper {...args}>
        <Step state="completed">
          <Link>Personalia</Link>
        </Step>
        <Step state="completed">
          <Link>Kontaktinformasjon</Link>
        </Step>
        <Step state="completed">
          <Link>Kontaktinformasjon</Link>
        </Step>
        <Step state="completed">
          <Link>Oppsummering</Link>
        </Step>
      </Stepper>
    );
  },
};

export const WithHrefLinks: Story = {
  render: (_args) => {
    const args = useStepperArgs();
    return (
      <Stepper {...args}>
        <Step>
          <Link href="#step-1">Personalia</Link>
        </Step>
        <Step>
          <Link href="#step-2">Kontaktinformasjon</Link>
        </Step>
        <Step>
          <Link href="#step-3">Kontaktinformasjon</Link>
        </Step>
        <Step>
          <Link href="#step-4">Oppsummering</Link>
        </Step>
      </Stepper>
    );
  },
};

export const DisabledSteps: Story = {
  render: (_args) => {
    const args = useStepperArgs();
    return (
      <Stepper {...args}>
        <Step>
          <Link>Personalia</Link>
        </Step>
        <Step isDisabled>
          <Link>Kontaktinformasjon</Link>
        </Step>
        <Step isDisabled>
          <Link>Kontaktinformasjon</Link>
        </Step>
        <Step isDisabled>
          <Link>Oppsummering</Link>
        </Step>
      </Stepper>
    );
  },
};
