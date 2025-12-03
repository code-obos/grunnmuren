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

const _FormStepContext = createContext<{ isTogglableOnSmallScreens: boolean }>({
  isTogglableOnSmallScreens: false,
});

const _FormStepProvider = _FormStepContext.Provider;

const FormStep = ({
  state = 'pending',
  children,
  ...restProps
}: FormStepProps) => {
  const locale = useLocale();
  const id = useId();
  const { isTogglableOnSmallScreens } = use(_FormStepContext);

  const [_isExpanded, _setIsExpanded] = useState<boolean | undefined>(
    isTogglableOnSmallScreens ? false : undefined,
  );

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: The collapsed content is accessible through keyboard focus
    <li
      {...restProps}
      data-slot="form-step"
      data-state={state}
      id={id}
      onClick={() => {
        if (isTogglableOnSmallScreens) {
          _setIsExpanded((prevState) => !prevState);
        }
      }}
      data-expanded={_isExpanded}
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
        {isTogglableOnSmallScreens && <Check data-slot="toggle-check-icon" />}
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
  return (
    <div data-slot="form-steps-container">
      <ol
        aria-label={translations.formSteps[locale]} // Spread props after to allow overriding of aria-label
        {...restProps}
        data-slot="form-steps"
      >
        {childrenArray.map((child, index) =>
          index === 1 && childrenArray.length >= 5 ? (
            <_FormStepProvider
              key={(child as JSX.Element).props.key}
              value={{ isTogglableOnSmallScreens: true }}
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
