'use client';
import { useFormState } from 'react-dom';
import { Form, TextField } from '@obosbbl/grunnmuren-react';

import { submitForm } from './submitAction';
import SubmitButton from './SubmitButton';

export default function () {
  const [{ errors }, formAction] = useFormState(submitForm, { errors: {} });

  return (
    <Form action={formAction} validationErrors={errors} className="space-y-4">
      <p>
        This is an uncontrolled form that uses zod to validate the form data on
        the server side in a React server action.
      </p>
      <TextField name="name" label="Name" isRequired />
      <TextField
        name="email"
        label="Email"
        type="email"
        isRequired
        description={
          <>
            Must be a <em>.no</em> email address
          </>
        }
      />
      <SubmitButton>Save</SubmitButton>
    </Form>
  );
}
