'use client';
import { Form } from 'react-aria-components';
import { TextField } from '@obosbbl/grunnmuren-react/textfield';
import { Button } from '@obosbbl/grunnmuren-react/button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { schema } from '../schema';

const defaultValues = {
  name: '',
  email: '',
};

export default function () {
  const { handleSubmit, control, register } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Form
      className="space-y-4"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <Controller
        control={control}
        name="name"
        render={({ field }) => <TextField label="Navn" isRequired {...field} />}
      />

      <TextField
        label="Epost"
        isRequired
        type="email"
        description={
          <>
            Må være <em>.no</em> epost
          </>
        }
      />
      <Button type="submit">Lagre</Button>
    </Form>
  );
}
