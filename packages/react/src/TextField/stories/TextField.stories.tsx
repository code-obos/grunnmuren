import { TextField } from '../..';

const metadata = {
  title: 'TextField',
  parameters: {
    layout: 'padded',
  },
};
export default metadata;

export const Default = () => {
  return (
    <div className="flex flex-col gap-4">
      <TextField
        label="Adresse"
        description="Eksempel: Drammensveien 1"
        required
      />

      <TextField
        label="Adresse"
        description="Eksempel: Drammensveien 1"
        error="Feltet er påkrevd"
        required
      />
    </div>
  );
};

export const Validation = () => {
  return (
    <div className="flex flex-col gap-4">
      <TextField label="Native validation enabled" required />
      <TextField
        label="Native validation disabled"
        required
        disableValidation
      />

      <form onSubmit={(evt) => evt.preventDefault()} noValidate>
        <TextField label="noValidate attribute on the form element" required />
      </form>
    </div>
  );
};
