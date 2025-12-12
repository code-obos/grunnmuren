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
  step8: Record<string, never>;
};

const initialFormData: FormData = {
  step1: { fornavn: '', etternavn: '', fodselsdato: '' },
  step2: { epost: '', telefon: '' },
  step3: { adresse: '', postnummer: '', poststed: '' },
  step4: { samtykke: '' },
  step5: { kontonummer: '', banknavn: '' },
  step6: {
    leveringsadresse: '',
    leveringspostnummer: '',
    leveringspoststed: '',
  },
  step7: { kommentar: '' },
  step8: {},
};

const stepTitles = {
  step1: 'Personalia',
  step2: 'Kontaktinformasjon',
  step3: 'Fakturainformasjon',
  step4: 'Samtykke',
  step5: 'Betalingsinformasjon',
  step6: 'Leveringsadresse',
  step7: 'Bekrefelse',
  summary: 'Oppsummering',
};

// Field labels for each form step
const FieldLabels: Record<keyof FormData, Record<string, string>> = {
  step1: {
    fornavn: 'Fornavn',
    etternavn: 'Etternavn',
    fodselsdato: 'Fødselsdato',
  },
  step2: { epost: 'E-post', telefon: 'Telefon' },
  step3: { adresse: 'Adresse', postnummer: 'Postnummer', poststed: 'Poststed' },
  step4: { samtykke: 'Samtykke' },
  step5: { kontonummer: 'Kontonummer', banknavn: 'Banknavn' },
  step6: {
    leveringsadresse: 'Leveringsadresse',
    leveringspostnummer: 'Postnummer',
    leveringspoststed: 'Poststed',
  },
  step7: { kommentar: 'Kommentar' },
  step8: {},
};

// Shared container component for form demos
const FormDemoContainer = ({
  stepper,
  content,
}: {
  stepper: React.ReactNode;
  content: React.ReactNode;
}) => (
  <div className="flex w-full max-w-2xl gap-8 px-4 max-lg:flex-col lg:gap-x-20">
    {stepper}
    <div className="pt-8">{content}</div>
  </div>
);

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

const FormStep1 = ({
  formData,
  updateFormData,
  handleNext,
  isStepComplete,
}: StepComponentProps) => (
  <div className="flex flex-col gap-4">
    <TextField
      label="Fornavn"
      value={formData.step1.fornavn}
      onChange={(value) => updateFormData('step1', 'fornavn', value)}
    />
    <TextField
      label="Etternavn"
      value={formData.step1.etternavn}
      onChange={(value) => updateFormData('step1', 'etternavn', value)}
    />
    <TextField
      label="Fødselsdato"
      value={formData.step1.fodselsdato}
      onChange={(value) => updateFormData('step1', 'fodselsdato', value)}
    />
    <Button onPress={handleNext} isDisabled={!isStepComplete}>
      Neste
    </Button>
  </div>
);

const FormStep2 = ({
  formData,
  updateFormData,
  handleNext,
  isStepComplete,
}: StepComponentProps) => (
  <div className="flex flex-col gap-4">
    <TextField
      label="E-post"
      value={formData.step2.epost}
      onChange={(value) => updateFormData('step2', 'epost', value)}
    />
    <TextField
      label="Telefon"
      value={formData.step2.telefon}
      onChange={(value) => updateFormData('step2', 'telefon', value)}
    />
    <Button onPress={handleNext} isDisabled={!isStepComplete}>
      Neste
    </Button>
  </div>
);

const FormStep3 = ({
  formData,
  updateFormData,
  handleNext,
  isStepComplete,
}: StepComponentProps) => (
  <div className="flex flex-col gap-4">
    <TextField
      label="Adresse"
      value={formData.step3.adresse}
      onChange={(value) => updateFormData('step3', 'adresse', value)}
    />
    <TextField
      label="Postnummer"
      value={formData.step3.postnummer}
      onChange={(value) => updateFormData('step3', 'postnummer', value)}
    />
    <TextField
      label="Poststed"
      value={formData.step3.poststed}
      onChange={(value) => updateFormData('step3', 'poststed', value)}
    />
    <Button onPress={handleNext} isDisabled={!isStepComplete}>
      Neste
    </Button>
  </div>
);

const FormStep4 = ({
  formData,
  updateFormData,
  handleNext,
  isStepComplete,
}: StepComponentProps) => (
  <div className="flex flex-col gap-4">
    <TextArea
      label="Samtykke"
      description="Beskriv hva du samtykker til"
      value={formData.step4.samtykke}
      onChange={(value) => updateFormData('step4', 'samtykke', value)}
    />
    <Button onPress={handleNext} isDisabled={!isStepComplete}>
      Neste
    </Button>
  </div>
);

const FormStep5 = ({
  formData,
  updateFormData,
  handleNext,
  isStepComplete,
}: StepComponentProps) => (
  <div className="flex flex-col gap-4">
    <TextField
      label="Kontonummer"
      value={formData.step5.kontonummer}
      onChange={(value) => updateFormData('step5', 'kontonummer', value)}
    />
    <TextField
      label="Banknavn"
      value={formData.step5.banknavn}
      onChange={(value) => updateFormData('step5', 'banknavn', value)}
    />
    <Button onPress={handleNext} isDisabled={!isStepComplete}>
      Neste
    </Button>
  </div>
);

const FormStep6 = ({
  formData,
  updateFormData,
  handleNext,
  isStepComplete,
}: StepComponentProps) => (
  <div className="flex flex-col gap-4">
    <TextField
      label="Leveringsadresse"
      value={formData.step6.leveringsadresse}
      onChange={(value) => updateFormData('step6', 'leveringsadresse', value)}
    />
    <TextField
      label="Postnummer"
      value={formData.step6.leveringspostnummer}
      onChange={(value) =>
        updateFormData('step6', 'leveringspostnummer', value)
      }
    />
    <TextField
      label="Poststed"
      value={formData.step6.leveringspoststed}
      onChange={(value) => updateFormData('step6', 'leveringspoststed', value)}
    />
    <Button onPress={handleNext} isDisabled={!isStepComplete}>
      Neste
    </Button>
  </div>
);

const FormStep7 = ({
  formData,
  updateFormData,
  handleNext,
  isStepComplete,
}: StepComponentProps) => (
  <div className="flex flex-col gap-4">
    <TextArea
      label="Kommentar"
      description="Legg til eventuelle kommentarer"
      value={formData.step7.kommentar}
      onChange={(value) => updateFormData('step7', 'kommentar', value)}
    />
    <Button onPress={handleNext} isDisabled={!isStepComplete}>
      Neste
    </Button>
  </div>
);

type SummaryStepProps = StepComponentProps & { maxStep: number };

const SummaryStep = ({ formData, maxStep }: SummaryStepProps) => {
  // Dynamically render tables for each step up to maxStep (excluding the summary step itself)
  const stepSections = [];

  for (let stepNum = 1; stepNum < maxStep; stepNum++) {
    const stepKey = `step${stepNum}` as keyof FormData;
    const stepData = formData[stepKey];
    const stepTitle = stepTitles[stepKey as keyof typeof stepTitles];
    const fieldLabels = FieldLabels[stepKey];

    // Skip if step data is empty or doesn't exist
    if (!stepData || Object.keys(stepData).length === 0) continue;

    stepSections.push(
      <table
        key={stepKey}
        className="grid w-full border-collapse gap-y-6 not-last-of-type:border-b pb-8"
      >
        <caption className="text-left font-semibold text-lg">
          {stepTitle}
        </caption>
        <tbody className="grid gap-y-4">
          {Object.entries(stepData).map(([fieldKey, fieldValue]) => (
            <tr key={fieldKey} className="grid">
              <th className="py-0.5 text-left font-bold">
                {fieldLabels[fieldKey] || fieldKey}
              </th>
              <td className="py-0.5">{fieldValue as string}</td>
            </tr>
          ))}
        </tbody>
      </table>,
    );
  }

  return <div className="mt-8 flex flex-col gap-8">{stepSections}</div>;
};

// Map step numbers to components (used for 8-step form only)
const stepComponents: Record<
  number,
  React.ComponentType<StepComponentProps>
> = {
  1: FormStep1,
  2: FormStep2,
  3: FormStep3,
  4: FormStep4,
  5: FormStep5,
  6: FormStep6,
  7: FormStep7,
};

// Shared form logic hook
const useStepperFormDemo = (maxSteps: number) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
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
    if (currentStep < maxSteps && isStepComplete(currentStep)) {
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
      if (maxSteps === 8) {
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

  const renderSteps = (totalSteps: number) => {
    const steps = [];
    for (let i = 1; i <= totalSteps; i++) {
      // For the last step, always use "Oppsummering"
      const stepTitle =
        i === totalSteps
          ? stepTitles.summary
          : stepTitles[`step${i}` as keyof typeof stepTitles];
      const isLastStep = i === totalSteps;

      steps.push(
        <Step key={i} isCompleted={completedSteps.has(i)}>
          {isStepNavigable(i) ? (
            <Link onPress={handleGoToStep(i)}>{stepTitle}</Link>
          ) : (
            <Text>{stepTitle}</Text>
          )}
          {!isLastStep && <ProgressBar value={getProgressValue(i)} />}
        </Step>,
      );
    }
    return steps;
  };

  // Get the appropriate component for the current step
  const getStepComponent = (
    step: number,
  ): React.ComponentType<StepComponentProps> => {
    // If it's the last step, always return SummaryStep with maxStep
    if (step === maxSteps) {
      return (props: StepComponentProps) => (
        <SummaryStep {...props} maxStep={maxSteps} />
      );
    }
    // Otherwise return the regular step component
    return stepComponents[step];
  };

  return {
    currentStep,
    formData,
    completedSteps,
    updateFormData,
    isStepComplete,
    getProgressValue,
    handleNext,
    handleGoToStep,
    canNavigateToStep,
    isStepNavigable,
    getStepComponent,
    renderSteps,
  };
};

// Template component for form demos
const FormDemoTemplate = ({ totalSteps }: { totalSteps: number }) => {
  const {
    currentStep,
    renderSteps,
    getStepComponent,
    formData,
    updateFormData,
    handleNext,
    isStepComplete,
  } = useStepperFormDemo(totalSteps);

  const CurrentStepComponent = getStepComponent(currentStep);

  return (
    <FormDemoContainer
      stepper={
        <Stepper currentStep={currentStep} className="max-lg:mx-auto">
          {/* biome-ignore lint/suspicious/noExplicitAny: Stepper requires strict tuple type for children */}
          {renderSteps(totalSteps) as any}
        </Stepper>
      }
      content={
        <>
          <Heading level={2} size="m" className="mb-4">
            {currentStep}.{' '}
            {currentStep === totalSteps
              ? stepTitles.summary
              : stepTitles[`step${currentStep}` as keyof typeof stepTitles]}
          </Heading>
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            handleNext={handleNext}
            isStepComplete={isStepComplete(currentStep)}
          />
        </>
      }
    />
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
