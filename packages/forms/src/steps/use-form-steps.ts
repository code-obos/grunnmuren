'use client';
import { type RefObject, useEffect, useReducer, useRef } from 'react';

import {
  createFormStepsState,
  type FormStep,
  formStepsReducer,
  type FormStepsAction,
} from './form-steps-reducer';

export type UseFormStepsOptions = {
  steps: readonly FormStep[];
  /** Defaults to the first step. */
  initialStepId?: string;
};

export type FormSteps = {
  steps: readonly FormStep[];
  activeStep: FormStep;
  activeIndex: number;
  isFirst: boolean;
  isLast: boolean;
  isCompleted: (id: string) => boolean;
  /** Ignored for steps that are neither earlier than the active one nor completed. */
  goTo: (id: string) => void;
  /** Marks the active step as completed and opens the next one. */
  goToNext: () => void;
  goToPrevious: () => void;
  markCompleted: (id: string) => void;
  /** Put on the step heading together with `tabIndex={-1}`: it receives focus on every step change. */
  headingRef: RefObject<HTMLHeadingElement | null>;
};

/**
 * Client state for a multi-step form. Changing step scrolls to the top and moves focus to the
 * element holding `headingRef`, except on first render.
 */
export function useFormSteps({ steps, initialStepId }: UseFormStepsOptions): FormSteps {
  const [state, dispatch] = useReducer(
    (current: ReturnType<typeof createFormStepsState>, action: FormStepsAction) =>
      formStepsReducer(current, action, steps),
    undefined,
    () => createFormStepsState(steps, initialStepId),
  );

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const shownStepId = useRef(state.activeStepId);
  useEffect(() => {
    if (shownStepId.current === state.activeStepId) return;
    shownStepId.current = state.activeStepId;
    window.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [state.activeStepId]);

  const activeIndex = Math.max(
    steps.findIndex((step) => step.id === state.activeStepId),
    0,
  );

  return {
    steps,
    activeStep: steps[activeIndex] as FormStep,
    activeIndex,
    isFirst: activeIndex === 0,
    isLast: activeIndex === steps.length - 1,
    isCompleted: (id) => state.completedStepIds.includes(id),
    goTo: (id) => dispatch({ type: 'goTo', id }),
    goToNext: () => dispatch({ type: 'next' }),
    goToPrevious: () => dispatch({ type: 'previous' }),
    markCompleted: (id) => dispatch({ type: 'complete', id }),
    headingRef,
  };
}
