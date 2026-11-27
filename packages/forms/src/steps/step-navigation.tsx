'use client';
import { Button } from '@obosbbl/grunnmuren-react';
import type { ReactNode } from 'react';

import { stepTranslations } from '../translations';
import { useFormsLocale } from '../use-forms-locale';

export type StepNavigationProps = {
  /** Runs when Back is pressed. Back is a `type="button"`, so it never submits. */
  onPrevious?: () => void;
  /** Shows the pending state on Next, typically the step group's `isSubmitting`. */
  isPending?: boolean;
  isNextDisabled?: boolean;
  /** Defaults to a localized "Forrige steg". */
  previousLabel?: ReactNode;
  /** Defaults to a localized "Neste steg". Use an action verb on the last step. */
  nextLabel?: ReactNode;
  /** Set to `false` on the first step. Defaults to `true`. */
  showPrevious?: boolean;
};

/** Back and Next. Next is `type="submit"`, so put this inside the step's `<form>`. */
export function StepNavigation({
  onPrevious,
  isPending = false,
  isNextDisabled = false,
  previousLabel,
  nextLabel,
  showPrevious = true,
}: StepNavigationProps) {
  const texts = stepTranslations[useFormsLocale()];
  return (
    <div className="flex flex-col gap-3 md:flex-row md:gap-4">
      {showPrevious && (
        <Button
          type="button"
          variant="tertiary"
          className="order-last w-full md:order-first md:w-auto"
          onPress={onPrevious}
          data-testid="step-previous-button"
        >
          {previousLabel ?? texts.previousStep}
        </Button>
      )}
      <Button
        type="submit"
        className="w-full md:w-auto"
        isPending={isPending}
        isDisabled={isNextDisabled}
        data-testid="step-next-button"
      >
        {nextLabel ?? texts.nextStep}
      </Button>
    </div>
  );
}
