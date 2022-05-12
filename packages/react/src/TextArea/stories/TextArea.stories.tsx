import { TextArea } from '../..';

const metadata = {
  title: 'TextArea',
  parameters: {
    layout: 'padded',
  },
};
export default metadata;

export const Default = () => {
  return (
    <div className="flex flex-col gap-4">
      <TextArea
        label="Har du noen tilbakemeldinger?"
        maxLength={200}
        description="Maks 200 tegn"
      />

      <TextArea
        label="Har du noen tilbakemeldinger?"
        maxLength={200}
        description="Maks 200 tegn"
        required
        error="Påkrevd"
      />
    </div>
  );
};
