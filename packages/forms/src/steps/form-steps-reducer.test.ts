import { expect, test } from 'vitest';

import {
  createFormStepsState,
  formStepsReducer,
  type FormStepsState,
  isStepReachable,
} from './form-steps-reducer';

const steps = [
  { id: 'contact', label: 'Kontakt' },
  { id: 'details', label: 'Detaljer' },
  { id: 'summary', label: 'Oppsummering' },
];

const initial = createFormStepsState(steps);

test('starts on the first step, or the given one, with nothing completed', () => {
  expect(initial).toEqual({ activeStepId: 'contact', completedStepIds: [] });
  expect(createFormStepsState(steps, 'details').activeStepId).toBe('details');
  expect(createFormStepsState(steps, 'nope').activeStepId).toBe('contact');
});

test('next completes the active step and moves on, and stops at the last step', () => {
  const second = formStepsReducer(initial, { type: 'next' }, steps);
  expect(second).toEqual({ activeStepId: 'details', completedStepIds: ['contact'] });

  const last = formStepsReducer(
    formStepsReducer(second, { type: 'next' }, steps),
    { type: 'next' },
    steps,
  );
  expect(last.activeStepId).toBe('summary');
  expect(last.completedStepIds).toEqual(['contact', 'details', 'summary']);
});

test('next does not duplicate a completed step when walking through it again', () => {
  const state: FormStepsState = {
    activeStepId: 'contact',
    completedStepIds: ['contact', 'details'],
  };
  expect(formStepsReducer(state, { type: 'next' }, steps).completedStepIds).toEqual([
    'contact',
    'details',
  ]);
});

test('previous moves back without completing anything, and stops at the first step', () => {
  const state: FormStepsState = { activeStepId: 'details', completedStepIds: ['contact'] };
  const back = formStepsReducer(state, { type: 'previous' }, steps);
  expect(back).toEqual({ activeStepId: 'contact', completedStepIds: ['contact'] });
  expect(formStepsReducer(back, { type: 'previous' }, steps)).toBe(back);
});

test('goTo only opens earlier, active or completed steps', () => {
  expect(formStepsReducer(initial, { type: 'goTo', id: 'summary' }, steps)).toBe(initial);
  expect(formStepsReducer(initial, { type: 'goTo', id: 'unknown' }, steps)).toBe(initial);

  const onSummary: FormStepsState = {
    activeStepId: 'summary',
    completedStepIds: ['contact', 'details'],
  };
  expect(formStepsReducer(onSummary, { type: 'goTo', id: 'contact' }, steps).activeStepId).toBe(
    'contact',
  );

  const editing: FormStepsState = {
    activeStepId: 'contact',
    completedStepIds: ['contact', 'details'],
  };
  expect(isStepReachable(editing, steps, 'details')).toBe(true);
  expect(isStepReachable(editing, steps, 'summary')).toBe(false);
});

test('complete marks a known step once and ignores unknown ids', () => {
  const marked = formStepsReducer(initial, { type: 'complete', id: 'details' }, steps);
  expect(marked.completedStepIds).toEqual(['details']);
  expect(formStepsReducer(marked, { type: 'complete', id: 'details' }, steps)).toBe(marked);
  expect(formStepsReducer(initial, { type: 'complete', id: 'unknown' }, steps)).toBe(initial);
});
