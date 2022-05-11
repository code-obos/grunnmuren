import {
  Form as GmForm,
  FormError as GmFormError,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  FormSuccess,
} from '../..';

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
