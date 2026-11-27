export type FormStep = {
  id: string;
  label: string;
};

export type FormStepsState = {
  activeStepId: string;
  completedStepIds: readonly string[];
};

export type FormStepsAction =
  | { type: 'goTo'; id: string }
  | { type: 'next' }
  | { type: 'previous' }
  | { type: 'complete'; id: string };

const indexOfStep = (steps: readonly FormStep[], id: string) =>
  steps.findIndex((step) => step.id === id);

export function createFormStepsState(
  steps: readonly FormStep[],
  initialStepId?: string,
): FormStepsState {
  const initial = steps.find((step) => step.id === initialStepId) ?? steps[0];
  return { activeStepId: initial?.id ?? '', completedStepIds: [] };
}

/** A step can be opened when it is the active one, an earlier one, or one that has been completed. */
export function isStepReachable(
  state: FormStepsState,
  steps: readonly FormStep[],
  id: string,
): boolean {
  const index = indexOfStep(steps, id);
  if (index === -1) return false;
  return index <= indexOfStep(steps, state.activeStepId) || state.completedStepIds.includes(id);
}

function withCompleted(state: FormStepsState, id: string): FormStepsState {
  return state.completedStepIds.includes(id)
    ? state
    : { ...state, completedStepIds: [...state.completedStepIds, id] };
}

/** Pure transitions for `useFormSteps`. Unknown ids and unreachable steps leave the state as is. */
export function formStepsReducer(
  state: FormStepsState,
  action: FormStepsAction,
  steps: readonly FormStep[],
): FormStepsState {
  const activeIndex = indexOfStep(steps, state.activeStepId);
  switch (action.type) {
    case 'goTo':
      return isStepReachable(state, steps, action.id)
        ? { ...state, activeStepId: action.id }
        : state;
    case 'next': {
      const completed = withCompleted(state, state.activeStepId);
      const next = steps[activeIndex + 1];
      return next ? { ...completed, activeStepId: next.id } : completed;
    }
    case 'previous': {
      const previous = steps[activeIndex - 1];
      return previous ? { ...state, activeStepId: previous.id } : state;
    }
    case 'complete':
      return indexOfStep(steps, action.id) === -1 ? state : withCompleted(state, action.id);
  }
}
