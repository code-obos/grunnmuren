'use client';
import { useActionState } from 'react';
import {
  Content,
  Form,
  TextField,
  Button,
  Alertbox,
} from '@obosbbl/grunnmuren-react';

import { submitForm } from './submitAction';

export default function () {
  const [{ errors }, formAction, isPending] = useActionState(submitForm, {
    errors: {},
  });

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
      <Alertbox role="alert" variant="info" className="mt-4">
        <Content className="flex flex-col gap-2">
          <h3 className="text-base">Medlemsnummer</h3>
          <p>
            Giver får nytt medlemsnummer og begynner å spare ansiennitet på
            nytt. Det nye medlemskapet blir aktivt etter at medlemskontingenten
            er betalt.
          </p>
        </Content>
      </Alertbox>
      <Button isLoading={isPending}>Save</Button>
    </Form>
  );
}
