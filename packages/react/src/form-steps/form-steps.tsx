import { Check } from '@obosbbl/grunnmuren-icons-react';
import { type HTMLAttributes, type HTMLProps, type JSX, useId } from 'react';
import { ProgressBarContext, Provider } from 'react-aria-components';
import { _LinkContext } from '../link';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

type FormStepProps = HTMLProps<HTMLLIElement> & {
  /**
   * Indicates whether the step is completed, current or pending.
   * @default 'pending'
   */
  state?: 'completed' | 'current' | 'pending';
};

const FormStep = ({
  state = 'pending',
  children,
  ...restProps
}: FormStepProps) => {
  const locale = useLocale();
  const id = useId();
  return (
    <li {...restProps} data-slot="form-step" data-state={state} id={id}>
      <Provider
        values={[
          [
            _LinkContext,
            {
              'aria-current': state === 'current' ? 'step' : undefined,
              role: state === 'pending' ? 'none' : undefined,
            },
          ],
          [
            ProgressBarContext,
            {
              'aria-labelledby': id,
            },
          ],
        ]}
      >
        {state === 'completed' && (
          <Check aria-label={translations.completed[locale]} />
        )}
        {children}
      </Provider>
    </li>
  );
};

type FormStepsProps = HTMLAttributes<HTMLOListElement> & {
  /** 3-8 <FormStep> children */
  children: [
    JSX.Element,
    JSX.Element,
    JSX.Element,
    JSX.Element?,
    JSX.Element?,
    JSX.Element?,
    JSX.Element?,
    JSX.Element?,
  ];
};

const FormSteps = (props: FormStepsProps) => {
  const locale = useLocale();
  const ariaLabel = props['aria-label'] || translations.formSteps[locale];
  return <ol {...props} aria-label={ariaLabel} data-slot="form-steps" />;
};

export {
  FormStep as UNSAFE_FormStep,
  FormSteps as UNSAFE_FormSteps,
  type FormStepProps as UNSAFE_FormStepProps,
  type FormStepsProps as UNSAFE_FormStepsProps,
};
