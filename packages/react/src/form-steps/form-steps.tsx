import { Check } from '@obosbbl/grunnmuren-icons-react';
import {
  Children,
  cloneElement,
  type HTMLAttributes,
  type HTMLProps,
  isValidElement,
  type JSX,
  useId,
} from 'react';
import {
  Button,
  DisclosureContext,
  ProgressBarContext,
  Provider,
} from 'react-aria-components';
import { Disclosure, DisclosureButton, DisclosurePanel } from '../disclosure';
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
        {restProps['data-n'] === 2 && <Disclosure aria-label="TODO" />}
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
  const ariaLabel = restProps['aria-label'] || translations.formSteps[locale];
  const childrenArray = Children.toArray(children);
  return (
    <ol {...restProps} aria-label={ariaLabel} data-slot="form-steps">
      <Provider
        values={[
          [
            DisclosureContext,
            {
              children: (
                <>
                  <Button slot="trigger">...</Button>
                  <DisclosurePanel role="group">
                    <ol data-slot="form-steps-collapsable">
                      {childrenArray.slice(1).map(
                        (child) =>
                          isValidElement(child) && (
                            <li
                              key={child.key}
                              data-state={
                                (child.props as FormStepProps).state ??
                                'pending'
                              }
                            >
                              {(child.props as FormStepProps).children}
                            </li>
                          ),
                      )}
                    </ol>
                  </DisclosurePanel>
                </>
              ),
            },
          ],
        ]}
      >
        {childrenArray.map(
          (child, index) =>
            (childrenArray.length > 5 &&
            child &&
            typeof child === 'object' &&
            'props' in child
              ? {
                  ...child,
                  props: { ...(child.props ?? {}), 'data-n': index + 1 },
                }
              : child) as JSX.Element,
        )}
      </Provider>
    </ol>
  );
};

export {
  FormStep as UNSAFE_FormStep,
  FormSteps as UNSAFE_FormSteps,
  type FormStepProps as UNSAFE_FormStepProps,
  type FormStepsProps as UNSAFE_FormStepsProps,
};
