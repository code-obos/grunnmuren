import { useState } from 'react';
import { Checkbox } from '../';
import { Button } from '../..';

const metadata = { title: 'Checkbox', parameters: { layout: 'padded' } };
export default metadata;

export const Default = () => {
  const [error, setError] = useState<string>();
  return (
    <div className="flex flex-col gap-4">
      <Checkbox>Check me</Checkbox>
      <Checkbox error="Du må bekrefte for å fortsette">Check me</Checkbox>

      <div>
        <h2 className="h4">with form</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setError('Du må bekrefte for å fortsette');
          }}
        >
          <Checkbox error={error}>Check me</Checkbox>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};
