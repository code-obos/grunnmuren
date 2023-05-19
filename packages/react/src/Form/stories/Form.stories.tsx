import { useState } from 'react';
import {
  Form as GmForm,
  FormError as GmFormError,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  FormSuccess,
  useFormStepContext,
  FormStep,
  TextField,
  Button,
} from '../..';
import { FormStatus, FormStepProvider } from '../MultiStep';

const metadata = {
  title: 'Forms',
  parameters: {
    layout: 'padded',
  },
};
export default metadata;

export const Label = () => {
  return (
    <div className="flex flex-col gap-4">
      <FormLabel>First name</FormLabel>
      <FormLabel isRequired>First name</FormLabel>
    </div>
  );
};

export const ErrorMessage = () => {
  return <FormErrorMessage>The field is required</FormErrorMessage>;
};

export const Success = () => {
  return <FormSuccess />;
};

export const HelperText = () => {
  return <FormHelperText>Helper text</FormHelperText>;
};

export const Form = () => {
  return <GmForm heading="Form title">This is a form container</GmForm>;
};

export const FormError = () => {
  return <GmFormError />;
};

export const MultiStep = () => {
  const FormStep1 = () => {
    const { submitAndNextFormStep } = useFormStepContext<FormData1>(1);
    const [formStatus, setFormStatus] = useState<FormStatus>('blank');

    return (
      <FormStep
        step={1}
        heading="Form step 1"
        formStatus={formStatus}
        onSubmit={(data) => {
          data.preventDefault();
          setFormStatus('completed');
          submitAndNextFormStep({ name: 'test' });
        }}
      >
        <div className="grid gap-4">
          <TextField label="name" />
          <Button type="submit">Submit</Button>
        </div>
      </FormStep>
    );
  };

  const FormStep2 = () => {
    return (
      <FormStep
        step={2}
        heading="Form step 2"
        formStatus="blank"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid gap-4">
          <TextField label="name" />
          <Button type="submit">Submit</Button>
        </div>
      </FormStep>
    );
  };

  return (
    <FormStepProvider>
      <div className="grid gap-2">
        <FormStep1 />

        <FormStep2 />
      </div>
    </FormStepProvider>
  );
};

type FormData1 = {
  name: string;
};
