'use client';
import { useActionState } from 'react';
import {
  Card,
  Heading,
  Content,
  Button,
  Form,
  TextField,
} from '@obosbbl/grunnmuren-react';

import { submitForm } from './submitAction';

export default function () {
  const [{ errors }, formAction, isPending] = useActionState(submitForm, {
    errors: {},
  });

  return (
    <Form action={formAction} validationErrors={errors} className="space-y-4">
      <Card variant="outlined">
        <Content>
          <Heading level={3}>Test</Heading>
          This is an uncontrolled form that uses zod to validate the form data
          on the server side in a React server action.
        </Content>
      </Card>
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
      <Button isLoading={isPending} type="submit">
        Save
      </Button>
      ;
    </Form>
  );
}
