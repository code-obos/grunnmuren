'use client';
import { Link, UNSAFE_Step as Step, UNSAFE_Stepper as Stepper } from '@obosbbl/grunnmuren-react';
import type { ComponentProps } from 'react';

import { stepTranslations } from '../translations';
import { useFormsLocale } from '../use-forms-locale';
import type { FormSteps } from './use-form-steps';

export type FormStepperProps = Pick<FormSteps, 'steps' | 'activeIndex' | 'isCompleted' | 'goTo'> &
  Partial<Omit<FormSteps, 'steps' | 'activeIndex' | 'isCompleted' | 'goTo'>> &
  Omit<ComponentProps<'nav'>, 'children'> & {
    /** Disables every step link, for example while the final submit is pending. */
    disableNavigation?: boolean;
  };

// Keys of `useFormSteps()` that must not end up on the <nav> when the result is spread in
const hookOnlyKeys = [
  'activeStep',
  'isFirst',
  'isLast',
  'goToNext',
  'goToPrevious',
  'markCompleted',
  'headingRef',
] as const;

/**
 * The step indicator. Spread the result of `useFormSteps()` into it. Later steps stay disabled
 * until they are completed. Other props go on the wrapping `<nav>`.
 */
export function FormStepper({
  steps,
  activeIndex,
  isCompleted,
  goTo,
  disableNavigation = false,
  ...rest
}: FormStepperProps) {
  const locale = useFormsLocale();
  const navProps: Record<string, unknown> = { ...rest };
  for (const key of hookOnlyKeys) delete navProps[key];

  return (
    <nav aria-label={stepTranslations[locale].stepperLabel} {...navProps}>
      <Stepper activeStep={activeIndex} onStepChange={(index) => goTo(steps[index]?.id ?? '')}>
        {steps.map((step, index) => (
          <Step
            key={step.id}
            state={isCompleted(step.id) ? 'completed' : undefined}
            isDisabled={disableNavigation || (index > activeIndex && !isCompleted(step.id))}
          >
            <Link>{step.label}</Link>
          </Step>
        ))}
      </Stepper>
    </nav>
  );
}
