import { Check, Edit } from '@obosbbl/grunnmuren-icons-react';
import {
  Children,
  createContext,
  type HTMLAttributes,
  type HTMLProps,
  type JSX,
  use,
  useId,
} from 'react';
import { ProgressBarContext, Provider } from 'react-aria-components';
import { _LinkContext } from '../link';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

type FormStepProps = HTMLProps<HTMLLIElement> & {
  /**
   * Indicates whether the step is completed or not.
   * A completed step means that the user has filled out and submitted the corresponding section of the form.
   * And that all the data entered in that section is valid.
   * @default false
   */
  isCompleted?: boolean;
};

const _FormStepContext = createContext<{
  isCurrent: boolean;
}>({
  isCurrent: false,
});

const _FormStepProvider = _FormStepContext.Provider;

const FormStep = ({
  isCompleted = false,
  children,
  ...restProps
}: FormStepProps) => {
  const locale = useLocale();
  const id = useId();
  const { isCurrent } = use(_FormStepContext);

  const state = isCompleted ? 'completed' : 'pending';

  return (
    <li
      {...restProps}
      data-slot="form-step"
      data-state={state}
      data-is-current={isCurrent}
      id={id}
    >
      <Provider
        values={[
          [
            _LinkContext,
            {
              'aria-current': isCurrent ? 'step' : undefined,
              role: state === 'pending' ? 'none' : undefined,
              className: 'underline',
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
        {state === 'completed' ? (
          <Check aria-label={translations.completed[locale]} />
        ) : (
          <Edit
            data-slot="in-progress-icon"
            aria-label={translations.pending[locale]}
          />
        )}
        {children}
      </Provider>
    </li>
  );
};

type FormStepsProps = HTMLAttributes<HTMLDivElement> & {
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
  currentStep: number;
};

const FormSteps = ({ children, currentStep, ...restProps }: FormStepsProps) => {
  const locale = useLocale();
  const childCount = Children.count(children);

  if (currentStep > childCount) {
    console.error(
      `FormSteps: currentStep (${currentStep}) is greater than the number of children (${childCount})`,
    );
  }

  return (
    <div data-slot="form-steps-container" {...restProps}>
      <ol
        aria-label={translations.formSteps[locale]} // Spread props after to allow overriding of aria-label
        data-slot="form-steps"
      >
        {Children.map(children, (child, index) => {
          const isCurrent = index + 1 === currentStep;

          return (
            <_FormStepProvider
              value={{
                isCurrent,
              }}
            >
              {child}
            </_FormStepProvider>
          );
        })}
      </ol>
    </div>
  );
};

export {
  FormStep as UNSAFE_FormStep,
  FormSteps as UNSAFE_FormSteps,
  type FormStepProps as UNSAFE_FormStepProps,
  type FormStepsProps as UNSAFE_FormStepsProps,
};
