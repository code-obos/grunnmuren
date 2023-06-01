import { FormEventHandler, useCallback, useRef } from 'react';
import { FormProps } from '..';
import classNames from 'clsx';

import { FormStepHeader } from './FormStepHeader';
import { useFormStepContext } from './FormStepContext';
import { useUpdateEffect } from '@react-hookz/web';

interface FormStepProps extends FormProps {
  step: number;
  heading: string;
  formStatus: FormStatus;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onHeaderClick?: () => void;
}

export interface FormStepData<T> {
  formId: string;
  status: FormStatus;
  formData?: T;
}

export type FormStatus = 'blank' | 'completed';

export const FormStep = (props: FormStepProps) => {
  const {
    children,
    heading,
    step,
    formStatus = 'blank',
    onSubmit,
    className,
    onHeaderClick,
    ...rest
  } = props;
  const { isActive, setActiveStep, activeStep } = useFormStepContext(step);

  const formRef = useRef<HTMLFormElement>(null);

  const handleHeaderClick = useCallback(() => {
    if (step < activeStep) {
      onHeaderClick?.();
      setActiveStep(step);
    }
  }, [activeStep, step, setActiveStep, onHeaderClick]);

  // When switching steps, scroll the newly active one into view
  useUpdateEffect(() => {
    if (isActive) {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isActive]);

  return (
    <form
      className={classNames('block', className, {
        'border-none': formStatus === 'completed' && !isActive,
      })}
      onSubmit={onSubmit}
      ref={formRef}
      {...rest}
    >
      <FormStepHeader
        step={step}
        formStatus={formStatus}
        collapsed={!isActive}
        onClick={handleHeaderClick}
      >
        {heading}
      </FormStepHeader>
      {isActive && (
        <div className="border-blue-dark relative rounded-b-lg border-2 p-6 md:p-10">
          {children}
        </div>
      )}
    </form>
  );
};
