import { Check } from '@obosbbl/grunnmuren-icons-react';
import {
  Children,
  createContext,
  type HTMLAttributes,
  type HTMLProps,
  type JSX,
  use,
  useId,
  useState,
} from 'react';
import { ProgressBarContext, Provider } from 'react-aria-components';
import { useClickOutsideRef } from '../hooks';
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

const _FormStepContext = createContext<{
  onToggle?: () => void;
  isExpanded?: boolean;
}>({
  onToggle: undefined,
  isExpanded: undefined,
});

const _FormStepProvider = _FormStepContext.Provider;

const FormStep = ({
  state = 'pending',
  children,
  ...restProps
}: FormStepProps) => {
  const locale = useLocale();
  const id = useId();
  const { onToggle, isExpanded } = use(_FormStepContext);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: The collapsed content is accessible through keyboard focus
    <li
      {...restProps}
      data-slot="form-step"
      data-state={state}
      id={id}
      onClick={onToggle}
      data-expanded={isExpanded}
    >
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
        {onToggle && <Check data-slot="toggle-check-icon" />}
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

const FormSteps = ({ children, ...restProps }: FormStepsProps) => {
  const locale = useLocale();
  const childrenArray = Children.toArray(children);

  const isTogglableOnSmallScreens = childrenArray.length >= 5;

  const [isExpanded, setIsExpanded] = useState<boolean | undefined>(
    isTogglableOnSmallScreens ? false : undefined,
  );

  const onToggle = () => {
    if (isTogglableOnSmallScreens) {
      setIsExpanded((prevState) => !prevState);
    }
  };

  const ref = useClickOutsideRef<HTMLOListElement>(onToggle);

  return (
    <div data-slot="form-steps-container">
      <ol
        aria-label={translations.formSteps[locale]} // Spread props after to allow overriding of aria-label
        {...restProps}
        data-slot="form-steps"
        ref={ref}
      >
        {childrenArray.map((child, index) =>
          isTogglableOnSmallScreens && index === 1 ? (
            <_FormStepProvider
              key={(child as JSX.Element).props.key}
              value={{ onToggle, isExpanded: isExpanded }}
            >
              {child}
            </_FormStepProvider>
          ) : (
            child
          ),
        )}
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
