import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../button';
import { Heading, Text } from '../content';
import { UNSAFE_Link as Link } from '../link';
import { UNSAFE_ProgressBar as ProgressBar } from '../progress-bar';
import { TextArea } from '../textarea';
import { TextField } from '../textfield';
import { UNSAFE_Step as Step, UNSAFE_Stepper as Stepper } from './stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stepper currentStep={1}>
      <Step>
        <Link href="#skjema-steg-1">Personalia</Link>
        <ProgressBar value={100} />
      </Step>
      <Step>
        <Link href="#skjema-steg-2">Kontaktinformasjon</Link>
        <ProgressBar value={50} />
      </Step>
      <Step>
        <Text>Fakturainformasjon</Text>
        <ProgressBar value={0} />
      </Step>
      <Step>
        <Text>Samtykke</Text>
        <ProgressBar value={0} />
      </Step>
      <Step>
        <Text>Betalingsinformasjon</Text>
        <ProgressBar value={0} />
      </Step>
      <Step>
        <Text>Leveringsadresse</Text>
        <ProgressBar value={0} />
      </Step>
      <Step>
        <Text>Bekrefelse</Text>
        <ProgressBar value={0} />
      </Step>
      <Step>
        <Text>Oppsummering</Text>
      </Step>
    </Stepper>
  ),
};

type FormData = {
  step1: { fornavn: string; etternavn: string; fodselsdato: string };
  step2: { epost: string; telefon: string };
  step3: { adresse: string; postnummer: string; poststed: string };
  step4: { samtykke: string };
  step5: { kontonummer: string; banknavn: string };
  step6: {
    leveringsadresse: string;
    leveringspostnummer: string;
    leveringspoststed: string;
  };
  step7: { kommentar: string };
};

const formSteps = {
  step1: {
    title: 'Personalia',
    fields: {
      fornavn: { label: 'Fornavn', initialValue: '', inputType: 'string' },
      etternavn: { label: 'Etternavn', initialValue: '', inputType: 'string' },
      fodselsdato: {
        label: 'Fødselsdato',
        initialValue: '',
        inputType: 'string',
      },
    },
  },
  step2: {
    title: 'Kontaktinformasjon',
    fields: {
      epost: { label: 'E-post', initialValue: '', inputType: 'string' },
      telefon: { label: 'Telefon', initialValue: '', inputType: 'string' },
    },
  },
  step3: {
    title: 'Fakturainformasjon',
    fields: {
      adresse: { label: 'Adresse', initialValue: '', inputType: 'string' },
      postnummer: {
        label: 'Postnummer',
        initialValue: '',
        inputType: 'string',
      },
      poststed: { label: 'Poststed', initialValue: '', inputType: 'string' },
    },
  },
  step4: {
    title: 'Samtykke',
    fields: {
      samtykke: {
        label: 'Samtykke',
        initialValue: '',
        inputType: 'text',
        description: 'Beskriv hva du samtykker til',
      },
    },
  },
  step5: {
    title: 'Betalingsinformasjon',
    fields: {
      kontonummer: {
        label: 'Kontonummer',
        initialValue: '',
        inputType: 'string',
      },
      banknavn: { label: 'Banknavn', initialValue: '', inputType: 'string' },
    },
  },
  step6: {
    title: 'Leveringsadresse',
    fields: {
      leveringsadresse: {
        label: 'Leveringsadresse',
        initialValue: '',
        inputType: 'string',
      },
      leveringspostnummer: {
        label: 'Postnummer',
        initialValue: '',
        inputType: 'string',
      },
      leveringspoststed: {
        label: 'Poststed',
        initialValue: '',
        inputType: 'string',
      },
    },
  },
  step7: {
    title: 'Bekrefelse',
    fields: {
      kommentar: {
        label: 'Kommentar',
        initialValue: '',
        inputType: 'text',
        description: 'Legg til eventuelle kommentarer',
      },
    },
  },
  summary: {
    title: 'Oppsummering',
  },
} as const;

// Step components
type StepComponentProps = {
  formData: FormData;
  updateFormData: <K extends keyof FormData>(
    step: K,
    field: keyof FormData[K],
    value: string,
  ) => void;
  handleNext: () => void;
  isStepComplete: boolean;
};

type FormStepProps = StepComponentProps & {
  stepKey: keyof FormData;
};

// Generic component that renders any form step based on formSteps configuration
const FormStep = ({
  stepKey,
  formData,
  updateFormData,
  handleNext,
  isStepComplete,
}: FormStepProps) => {
  const stepConfig = formSteps[stepKey as keyof typeof formSteps];

  if (!stepConfig || !('fields' in stepConfig)) return null;

  const stepData = formData[stepKey];
  const { fields } = stepConfig;

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(fields).map(([fieldKey, fieldConfig]) => {
        const value = stepData[fieldKey as keyof typeof stepData] as string;

        if (fieldConfig.inputType === 'text') {
          return (
            <TextArea
              key={fieldKey}
              label={fieldConfig.label}
              description={fieldConfig.description}
              value={value}
              onChange={(newValue) =>
                updateFormData(
                  stepKey,
                  fieldKey as keyof typeof stepData,
                  newValue,
                )
              }
            />
          );
        }

        return (
          <TextField
            key={fieldKey}
            label={fieldConfig.label}
            value={value}
            onChange={(newValue) =>
              updateFormData(
                stepKey,
                fieldKey as keyof typeof stepData,
                newValue,
              )
            }
          />
        );
      })}
      <Button onPress={handleNext} isDisabled={!isStepComplete}>
        Neste
      </Button>
    </div>
  );
};

type SummaryStepProps = StepComponentProps & { maxStep: number };

const SummaryStep = ({ formData, maxStep }: SummaryStepProps) => {
  // Dynamically render tables for each step up to maxStep (excluding the summary step itself)
  const stepSections = [];

  for (let stepNum = 1; stepNum < maxStep; stepNum++) {
    const stepKey = `step${stepNum}` as keyof FormData;
    const stepData = formData[stepKey];
    const stepConfig = formSteps[stepKey as keyof typeof formSteps];

    // Skip if step data is empty or doesn't exist
    if (!stepData || Object.keys(stepData).length === 0 || !stepConfig)
      continue;
    if (!('fields' in stepConfig)) continue;

    const stepTitle = stepConfig.title;
    const fieldLabels = stepConfig.fields;

    stepSections.push(
      <table
        key={stepKey}
        className="grid w-full border-collapse gap-y-6 not-last-of-type:border-b pb-8"
      >
        <caption className="text-left font-semibold text-lg">
          {stepTitle}
        </caption>
        <tbody className="grid gap-y-4">
          {Object.entries(stepData).map(([fieldKey, fieldValue]) => {
            const fieldConfig = (
              fieldLabels as Record<
                string,
                { label: string; initialValue: string }
              >
            )[fieldKey];
            const label = fieldConfig?.label || fieldKey;
            return (
              <tr key={fieldKey} className="grid">
                <th className="py-0.5 text-left font-bold">{label}</th>
                <td className="py-0.5">{fieldValue as string}</td>
              </tr>
            );
          })}
        </tbody>
      </table>,
    );
  }

  return <div className="mt-8 flex flex-col gap-8">{stepSections}</div>;
};

// Map step numbers to components
const stepComponents: Record<
  number,
  React.ComponentType<StepComponentProps>
> = {
  1: (props) => <FormStep {...props} stepKey="step1" />,
  2: (props) => <FormStep {...props} stepKey="step2" />,
  3: (props) => <FormStep {...props} stepKey="step3" />,
  4: (props) => <FormStep {...props} stepKey="step4" />,
  5: (props) => <FormStep {...props} stepKey="step5" />,
  6: (props) => <FormStep {...props} stepKey="step6" />,
  7: (props) => <FormStep {...props} stepKey="step7" />,
};

// Template component for form demos
const FormDemoTemplate = ({ totalSteps }: { totalSteps: number }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    step1: {
      fornavn: formSteps.step1.fields.fornavn.initialValue,
      etternavn: formSteps.step1.fields.etternavn.initialValue,
      fodselsdato: formSteps.step1.fields.fodselsdato.initialValue,
    },
    step2: {
      epost: formSteps.step2.fields.epost.initialValue,
      telefon: formSteps.step2.fields.telefon.initialValue,
    },
    step3: {
      adresse: formSteps.step3.fields.adresse.initialValue,
      postnummer: formSteps.step3.fields.postnummer.initialValue,
      poststed: formSteps.step3.fields.poststed.initialValue,
    },
    step4: {
      samtykke: formSteps.step4.fields.samtykke.initialValue,
    },
    step5: {
      kontonummer: formSteps.step5.fields.kontonummer.initialValue,
      banknavn: formSteps.step5.fields.banknavn.initialValue,
    },
    step6: {
      leveringsadresse: formSteps.step6.fields.leveringsadresse.initialValue,
      leveringspostnummer:
        formSteps.step6.fields.leveringspostnummer.initialValue,
      leveringspoststed: formSteps.step6.fields.leveringspoststed.initialValue,
    },
    step7: {
      kommentar: formSteps.step7.fields.kommentar.initialValue,
    },
  });
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const updateFormData = <K extends keyof FormData>(
    step: K,
    field: keyof FormData[K],
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value,
      },
    }));
  };

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.step1.fornavn &&
          formData.step1.etternavn &&
          formData.step1.fodselsdato
        );
      case 2:
        return !!(formData.step2.epost && formData.step2.telefon);
      case 3:
        return !!(
          formData.step3.adresse &&
          formData.step3.postnummer &&
          formData.step3.poststed
        );
      case 4:
        return !!formData.step4.samtykke;
      case 5:
        return !!(formData.step5.kontonummer && formData.step5.banknavn);
      case 6:
        return !!(
          formData.step6.leveringsadresse &&
          formData.step6.leveringspostnummer &&
          formData.step6.leveringspoststed
        );
      case 7:
        return !!formData.step7.kommentar;
      default:
        return false;
    }
  };

  const getProgressValue = (step: number): number => {
    const fields = formData[`step${step}` as keyof FormData];
    const values = Object.values(fields);
    const filledCount = values.filter((v) => v.length > 0).length;
    return Math.round((filledCount / values.length) * 100);
  };

  const handleNext = () => {
    if (currentStep < totalSteps && isStepComplete(currentStep)) {
      setCompletedSteps((prev) => new Set(prev).add(currentStep));
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleGoToStep = (step: number) => () => {
    if (
      step <= currentStep ||
      completedSteps.has(step) ||
      canNavigateToStep(step)
    ) {
      setCurrentStep(step);
      // Update URL without navigation (only for 8 steps demo)
      if (totalSteps === 8) {
        const url = new URL(window.location.href);
        url.searchParams.set('currentStep', String(step));
        window.history.pushState({}, '', url.toString());
      }
    }
  };

  const canNavigateToStep = (step: number): boolean => {
    for (let i = 1; i < step; i++) {
      if (!completedSteps.has(i)) {
        return false;
      }
    }
    return true;
  };

  const isStepNavigable = (step: number): boolean => {
    if (step === currentStep) return false;
    if (completedSteps.has(step)) return true;
    return canNavigateToStep(step);
  };

  // Get the appropriate component for the current step
  const getStepComponent = (
    step: number,
  ): React.ComponentType<StepComponentProps> => {
    // If it's the last step, always return SummaryStep with maxStep
    if (step === totalSteps) {
      return (props: StepComponentProps) => (
        <SummaryStep {...props} maxStep={totalSteps} />
      );
    }
    // Otherwise return the regular step component
    return stepComponents[step];
  };

  const CurrentStepComponent = getStepComponent(currentStep);

  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex w-full max-w-2xl gap-8 px-4 max-lg:flex-col lg:gap-x-20">
      <Stepper currentStep={currentStep} className="max-lg:mx-auto">
        {steps.map((stepNumber) => {
          const stepTitle =
            stepNumber === totalSteps
              ? formSteps.summary.title
              : formSteps[`step${stepNumber}` as keyof typeof formSteps].title;
          const isLastStep = stepNumber === totalSteps;

          return (
            <Step key={stepNumber} isCompleted={completedSteps.has(stepNumber)}>
              {isStepNavigable(stepNumber) ? (
                <Link onPress={handleGoToStep(stepNumber)}>{stepTitle}</Link>
              ) : (
                <Text>{stepTitle}</Text>
              )}
              {!isLastStep && (
                <ProgressBar value={getProgressValue(stepNumber)} />
              )}
            </Step>
          );
        })}
      </Stepper>
      <div className="pt-8">
        <Heading level={2} size="m" className="mb-4">
          {currentStep}.{' '}
          {currentStep === totalSteps
            ? formSteps.summary.title
            : formSteps[`step${currentStep}` as keyof typeof formSteps].title}
        </Heading>
        <CurrentStepComponent
          formData={formData}
          updateFormData={updateFormData}
          handleNext={handleNext}
          isStepComplete={isStepComplete(currentStep)}
        />
      </div>
    </div>
  );
};

export const FormWith8Steps: Story = {
  render: () => <FormDemoTemplate totalSteps={8} />,
  parameters: {
    layout: 'padded',
  },
};

export const FormWith7Steps: Story = {
  render: () => <FormDemoTemplate totalSteps={7} />,
  parameters: {
    layout: 'padded',
  },
};

export const FormWith6Steps: Story = {
  render: () => <FormDemoTemplate totalSteps={6} />,
  parameters: {
    layout: 'padded',
  },
};

export const FormWith5Steps: Story = {
  render: () => <FormDemoTemplate totalSteps={5} />,
  parameters: {
    layout: 'padded',
  },
};

export const FormWith4Steps: Story = {
  render: () => <FormDemoTemplate totalSteps={4} />,
  parameters: {
    layout: 'padded',
  },
};

export const FormWith3Steps: Story = {
  render: () => <FormDemoTemplate totalSteps={3} />,
  parameters: {
    layout: 'padded',
  },
};
