import { SelectField } from '../SelectField';

const metadata = {
  title: 'SelectField',
  parameters: {
    layout: 'padded',
  },
};
export default metadata;

export const Default = () => {
  return (
    <div className="flex flex-col gap-4">
      <SelectField
        label="Choose a pet"
        description="It should be feline"
        required
      >
        <option value="">Please choose an option</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
      </SelectField>

      <SelectField
        label="Adresse"
        description="Eksempel: Drammensveien 1"
        error="Feltet er påkrevd"
        required
      >
        <option value="">Please choose an option</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
      </SelectField>
    </div>
  );
};

export const Validation = () => {
  return (
    <div className="flex flex-col gap-4">
      <SelectField label="Native validation enabled" required />
      <SelectField
        label="Native validation disabled"
        required
        disableValidation
      />

      <form onSubmit={(evt) => evt.preventDefault()} noValidate>
        <SelectField
          label="noValidate attribute on the form element"
          required
        />
      </form>
    </div>
  );
};
