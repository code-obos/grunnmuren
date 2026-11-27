'use client';
import type { ReactFormGroupApi } from '@tanstack/react-form';
import type { ComponentProps, ReactNode } from 'react';

import { StepNavigation, type StepNavigationProps } from './step-navigation';
import type { FormSteps } from './use-form-steps';

// The group's type parameters are inferred from its name and validators, so the props accept any group
type AnyFormGroupApi = ReactFormGroupApi<any, any, any, any, any, any>;

export type StepFormProps = Omit<ComponentProps<'form'>, 'noValidate' | 'children'> & {
  /** The group from `<form.FormGroup name="...">{(group) => ...}</form.FormGroup>`. */
  group: AnyFormGroupApi;
  steps: Pick<FormSteps, 'isFirst' | 'goToPrevious'>;
  children: ReactNode;
  /** Layout classes of the inner div. Defaults to the same single column as `form.Form`. */
  layoutClassName?: string;
  /** Labels and disabled state of Back and Next. Back and the pending state are wired for you. */
  navigation?: Pick<StepNavigationProps, 'previousLabel' | 'nextLabel' | 'isNextDisabled'>;
};

/**
 * A step's `<form>`: Next validates and submits this step's form group only, never the whole
 * form, then the group's `onSubmit` decides what happens (usually `steps.goToNext`).
 */
export function StepForm({
  group,
  steps,
  children,
  layoutClassName = 'grid max-w-[500px] gap-6',
  navigation,
  onSubmit,
  ...props
}: StepFormProps) {
  return (
    <form
      {...props}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(event);
        void group.handleSubmit();
      }}
    >
      <div className={layoutClassName}>
        {children}
        <group.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <StepNavigation
              {...navigation}
              isPending={isSubmitting}
              showPrevious={!steps.isFirst}
              onPrevious={steps.goToPrevious}
            />
          )}
        </group.Subscribe>
      </div>
    </form>
  );
}
