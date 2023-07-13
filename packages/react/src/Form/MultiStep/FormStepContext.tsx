import {
  createContext,
  useContext,
  useMemo,
  Dispatch,
  useReducer,
  useCallback,
} from 'react';

// TODO: Improve typing here. How can we express the type of the whole form while typing each step?

export type FieldValues = Record<string, unknown>;

const FormStepContext = createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly [state: State<any>, dispatch: Dispatch<Action>]
>([
  {
    activeStep: 1,
    formData: {},
  },
  () => {},
]);

export function useFormContext() {
  const [state, dispatch] = useContext(FormStepContext);

  return {
    activeStep: state.activeStep,
    formData: state.formData,
    setActiveStep: (step: number) => dispatch({ type: 'SET_STEP', step }),
  };
}

export function useFormStepContext<FormStepData extends FieldValues>(
  formStep: number,
) {
  const [state, dispatch] = useContext(FormStepContext);

  const previousFormStep = useCallback(async () => {
    dispatch({ type: 'PREV_STEP' });
  }, [dispatch]);

  const setFormData = useCallback(
    async (formValues: FormStepData) => {
      dispatch({
        type: 'SET_FORM_STEP_DATA',
        formId: `form${formStep}`,
        formValues,
      });
    },
    [dispatch, formStep],
  );

  const nextFormStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, [dispatch]);

  const submitAndNextFormStep = useCallback(
    async (formValues: FormStepData) => {
      await setFormData(formValues);
      nextFormStep();
    },
    [nextFormStep, setFormData],
  );

  return {
    isActive: state.activeStep === formStep,
    activeStep: state.activeStep,
    setActiveStep: (step: number) => dispatch({ type: 'SET_STEP', step }),
    previousFormStep,
    nextFormStep,
    submitAndNextFormStep,
    setFormData,
    formData: state.formData,
  };
}

type Action =
  | { type: 'SET_STEP'; step: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_FORM_STEP_DATA'; formId: string; formValues: unknown };

type State<T> = {
  activeStep: number;
  formData: T;
};

function formStepReducer<T>(state: State<T>, action: Action) {
  switch (action.type) {
    case 'NEXT_STEP': {
      return {
        ...state,
        activeStep: state.activeStep + 1,
      };
    }
    case 'PREV_STEP': {
      return {
        ...state,
        activeStep: Math.max(state.activeStep - 1, 1),
      };
    }
    case 'SET_STEP': {
      return {
        ...state,
        activeStep: action.step,
      };
    }
    case 'SET_FORM_STEP_DATA': {
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.formId]: action.formValues,
        },
      };
    }
  }
}

export function FormStepProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(formStepReducer, {
    activeStep: 1,
    formData: {},
  });

  const context = useMemo(() => {
    return [state, dispatch] as const;
  }, [state, dispatch]);

  return (
    <FormStepContext.Provider value={context}>
      {children}
    </FormStepContext.Provider>
  );
}
