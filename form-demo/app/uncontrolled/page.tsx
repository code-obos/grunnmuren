'use client';
import { Button, Form, TextField } from '@obosbbl/grunnmuren-react';
import { type FormEvent, startTransition, useActionState } from 'react';

import { submitForm } from './submit-action';

export default function () {
  const [{ errors }, formAction, isPending] = useActionState(submitForm, {
    errors: {},
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      formAction(new FormData(event.currentTarget));
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validationErrors={errors}
      className="space-y-4"
    >
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

      <Button isPending={isPending} type="submit">
        Save
      </Button>
    </Form>
  );
}
