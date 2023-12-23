'use client';
import { useFormState } from 'react-dom';
import { Form } from 'react-aria-components';
import { TextField } from '@obosbbl/grunnmuren-react/textfield';

import { submitForm } from './submitAction';
import SubmitButton from './SubmitButton';

export default function () {
  const [{ errors }, formAction] = useFormState(submitForm, { errors: {} });

  return (
    <Form action={formAction} validationErrors={errors} className="space-y-4">
      <TextField name="name" label="Navn" isRequired />
      <TextField
        name="email"
        label="Epost"
        isRequired
        type="email"
        description={
          <>
            Må være <em>.no</em> epost
          </>
        }
      />
      <SubmitButton>Lagre</SubmitButton>
    </Form>
  );
}
