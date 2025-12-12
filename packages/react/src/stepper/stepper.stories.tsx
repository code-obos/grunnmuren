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

// Interactive form story with 8 steps
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

const stepTitles: Record<number, string> = {
  1: 'Personalia',
  2: 'Kontaktinformasjon',
  3: 'Fakturainformasjon',
  4: 'Samtykke',
  5: 'Betalingsinformasjon',
  6: 'Leveringsadresse',
  7: 'Bekrefelse',
  8: 'Oppsummering',
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

const FormStep8 = ({ formData }: StepComponentProps) => (
  <div className="flex flex-col gap-4">
    <Text>Oppsummering av skjema:</Text>
    <pre className="rounded bg-gray-100 p-4 text-sm">
      {JSON.stringify(formData, null, 2)}
    </pre>
  </div>
);

// Map step numbers to components
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
  8: FormStep8,
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
      const stepTitle = stepTitles[i];
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
    return (<>{steps}</>) as React.ReactNode;
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
    stepComponents,
    renderSteps,
  };
};

const FormWith8StepsDemo = () => {
  const {
    currentStep,
    renderSteps,
    stepComponents,
    formData,
    updateFormData,
    handleNext,
    isStepComplete,
  } = useStepperFormDemo(8);

  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <FormDemoContainer
      stepper={
        <Stepper currentStep={currentStep} className="max-lg:mx-auto">
          {/* biome-ignore lint/suspicious/noExplicitAny: Stepper requires strict tuple type for children */}
          {renderSteps(8) as any}
        </Stepper>
      }
      content={
        <>
          <Heading level={2} size="m" className="mb-4">
            {currentStep}. {stepTitles[currentStep]}
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
  render: () => <FormWith8StepsDemo />,
  parameters: {
    layout: 'padded',
  },
};

// 7 Steps Demo
const FormWith7StepsDemo = () => {
  const {
    currentStep,
    renderSteps,
    stepComponents,
    formData,
    updateFormData,
    handleNext,
    isStepComplete,
  } = useStepperFormDemo(7);

  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <FormDemoContainer
      stepper={
        <Stepper currentStep={currentStep} className="max-lg:mx-auto">
          {/* biome-ignore lint/suspicious/noExplicitAny: Stepper requires strict tuple type for children */}
          {renderSteps(7) as any}
        </Stepper>
      }
      content={
        <>
          <Heading level={2} size="m" className="mb-4">
            {currentStep}. {stepTitles[currentStep]}
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

export const FormWith7Steps: Story = {
  render: () => <FormWith7StepsDemo />,
  parameters: {
    layout: 'padded',
  },
};

// 6 Steps Demo
const FormWith6StepsDemo = () => {
  const {
    currentStep,
    renderSteps,
    stepComponents,
    formData,
    updateFormData,
    handleNext,
    isStepComplete,
  } = useStepperFormDemo(6);

  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <FormDemoContainer
      stepper={
        <Stepper currentStep={currentStep} className="max-lg:mx-auto">
          {/* biome-ignore lint/suspicious/noExplicitAny: Stepper requires strict tuple type for children */}
          {renderSteps(6) as any}
        </Stepper>
      }
      content={
        <>
          <Heading level={2} size="m" className="mb-4">
            {currentStep}. {stepTitles[currentStep]}
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

export const FormWith6Steps: Story = {
  render: () => <FormWith6StepsDemo />,
  parameters: {
    layout: 'padded',
  },
};

// 5 Steps Demo
const FormWith5StepsDemo = () => {
  const {
    currentStep,
    renderSteps,
    stepComponents,
    formData,
    updateFormData,
    handleNext,
    isStepComplete,
  } = useStepperFormDemo(5);

  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <FormDemoContainer
      stepper={
        <Stepper currentStep={currentStep} className="max-lg:mx-auto">
          {/* biome-ignore lint/suspicious/noExplicitAny: Stepper requires strict tuple type for children */}
          {renderSteps(5) as any}
        </Stepper>
      }
      content={
        <>
          <Heading level={2} size="m" className="mb-4">
            {currentStep}. {stepTitles[currentStep]}
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

export const FormWith5Steps: Story = {
  render: () => <FormWith5StepsDemo />,
  parameters: {
    layout: 'padded',
  },
};

// 4 Steps Demo
const FormWith4StepsDemo = () => {
  const {
    currentStep,
    renderSteps,
    stepComponents,
    formData,
    updateFormData,
    handleNext,
    isStepComplete,
  } = useStepperFormDemo(4);

  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <FormDemoContainer
      stepper={
        <Stepper currentStep={currentStep} className="max-lg:mx-auto">
          {/* biome-ignore lint/suspicious/noExplicitAny: Stepper requires strict tuple type for children */}
          {renderSteps(4) as any}
        </Stepper>
      }
      content={
        <>
          <Heading level={2} size="m" className="mb-4">
            {currentStep}. {stepTitles[currentStep]}
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

export const FormWith4Steps: Story = {
  render: () => <FormWith4StepsDemo />,
  parameters: {
    layout: 'padded',
  },
};

// 3 Steps Demo
const FormWith3StepsDemo = () => {
  const {
    currentStep,
    renderSteps,
    stepComponents,
    formData,
    updateFormData,
    handleNext,
    isStepComplete,
  } = useStepperFormDemo(3);

  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <FormDemoContainer
      stepper={
        <Stepper currentStep={currentStep} className="max-lg:mx-auto">
          {/* biome-ignore lint/suspicious/noExplicitAny: Stepper requires strict tuple type for children */}
          {renderSteps(3) as any}
        </Stepper>
      }
      content={
        <>
          <Heading level={2} size="m" className="mb-4">
            {currentStep}. {stepTitles[currentStep]}
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

export const FormWith3Steps: Story = {
  render: () => <FormWith3StepsDemo />,
  parameters: {
    layout: 'padded',
  },
};
