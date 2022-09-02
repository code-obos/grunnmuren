import { Accordion } from '..';

export default {
  title: 'Accordion',
};

export const Default = () => {
  return (
    <>
      <div className="my-8 mx-4 flex gap-4">
        <Accordion heading="Tittel">This is a text</Accordion>
      </div>
      <div className="my-8 mx-4 flex w-1/3 flex-col gap-1">
        <Accordion heading="Tittel">This is a text</Accordion>
        <Accordion heading="Tittel">This is a text</Accordion>
      </div>
    </>
  );
};
