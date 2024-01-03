import { FormEvent, useState } from 'react';
import { Form as RACForm } from 'react-aria-components';
import type { Meta } from '@storybook/react';
import { TextField } from '../textfield';
import { Button } from '../button/Button';

const meta: Meta = {
  title: 'Form validation',
};

export default meta;

const emailErrorMessage = 'Vennligst bruk en .no e-postadresse';

const Form = (props: {
  children: React.ReactNode;
  serverValidate?: boolean;
}) => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-expect-error this works..
    const data = Object.fromEntries(new FormData(e.target));

    if (!props.serverValidate) {
      alert(JSON.stringify(data));
      return;
    }

    setIsLoading(true);

    // Fake a delay here, so it looks like we're submitting the data to a server
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);

    if (!(data['email'] as string).endsWith('.no')) {
      setErrors({ email: emailErrorMessage });
    } else {
      setErrors({});
      // Do this in a timeout, so the button's loading indicator stops spinning before the alert dialog is displayed
      setTimeout(() => {
        alert(JSON.stringify(data));
      }, 0);
    }
  };

  return (
    <RACForm
      onSubmit={handleSubmit}
      className="container-prose flex flex-col items-start gap-4"
      validationErrors={errors}
    >
      {props.children}
      <Button type="submit" loading={isLoading}>
        Send inn
      </Button>
    </RACForm>
  );
};

const nameProps = {
  isRequired: true,
  label: 'Navn',
  name: 'name',
} as const;

const emailProps = {
  isRequired: true,
  label: 'Epost',
  type: 'email',
  name: 'email',
  description: (
    <>
      Må være en <em>.no</em> e-postadresse
    </>
  ),
} as const;

export const NativeValidation = () => {
  return (
    <Form>
      <p>
        Dette eksemplet bruker kun browserens native validering av skjemaet. Det
        er dermed mulig å sende inn skjemaet uten at e-postadressen slutter på
        .no
      </p>
      <TextField {...nameProps} />
      <TextField {...emailProps} />
    </Form>
  );
};

export const RealtimeValidation = () => {
  return (
    <Form>
      <p>
        Dette eksemplet bruker <code>validate</code> prop-en på skjemaelementene
        for å implementere realtime validering av skjemaet på klienten. Dette er
        nyttig for å legge til ekstra validering, selv om skjemaet er{' '}
        <em>uncontrolled</em>.
      </p>
      <TextField {...nameProps} />
      <TextField
        {...emailProps}
        validate={(value) => (value.endsWith('.no') ? null : emailErrorMessage)}
      />
    </Form>
  );
};

export const ServerSideValidation = () => {
  return (
    <Form serverValidate>
      <p>
        Dette eksemplet bruker <code>validationErrors</code> prop-en på selve
        skjemaet for å gjøre serverside validering av skjemadatene.
        Skjemainnsendinger burde alltid valideres på serveren, og det lar oss
        flytte mye av kompleksiteten til serveren i stedet for klienten, for
        eksempel dersom vi ønsker å bruke zod for å validere skjemadataene. Kan
        for eksempel integereres med React server actions.
      </p>
      <TextField {...nameProps} />
      <TextField {...emailProps} />
    </Form>
  );
};

export const ControlledValidation = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  let nameError;
  if (!name) {
    nameError = 'Fyll ut navn';
  }

  let emailError;
  if (!email.endsWith('.no')) {
    emailError = emailErrorMessage;
  }

  return (
    <Form>
      <p>
        Dette eksemplet bruker <code>errorMesssage</code> prop-en på
        skjemaelementene for å vise feilmeldinger og er nyttig for skjemaer som
        er såkalt <em>controlled</em>.
      </p>
      <TextField
        {...nameProps}
        value={name}
        onChange={setName}
        errorMessage={nameError}
        validationBehavior="aria"
      />
      <TextField
        {...emailProps}
        value={email}
        onChange={setEmail}
        errorMessage={emailError}
        validationBehavior="aria"
      />
    </Form>
  );
};
