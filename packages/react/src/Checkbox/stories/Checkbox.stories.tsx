import { Checkbox } from '../';

const metadata = { title: 'Checkbox', parameters: { layout: 'padded' } };
export default metadata;

export const Default = () => {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox>Check me</Checkbox>
      <Checkbox error="Du må bekrefte for å fortsette">Check me</Checkbox>
    </div>
  );
};
