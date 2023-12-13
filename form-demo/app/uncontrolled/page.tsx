import { TextField } from '@obosbbl/grunnmuren-react/textfield';
import { Button } from '@obosbbl/grunnmuren-react/button';

import { submitForm } from './submitAction';
import SubmitButton from './SubmitButton';

export default function () {
  return (
    <form action={submitForm} className="space-y-4">
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
    </form>
  );
}
