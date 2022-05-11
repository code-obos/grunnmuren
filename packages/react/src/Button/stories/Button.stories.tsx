import { Button } from '../';

export default {
  title: 'Button',
};

const ButtonSpacer = (props: { children: React.ReactNode }) => (
  <div className="my-8 flex flex-row justify-center gap-8" {...props} />
);

export const Default = () => {
  return (
    <>
      <ButtonSpacer>
        <Button>Button</Button>
        <Button href="#">Link</Button>
        <Button disabled>Disabled</Button>
      </ButtonSpacer>

      <ButtonSpacer>
        <Button variant="secondary">Button</Button>
        <Button variant="secondary" href="#">
          Link
        </Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
      </ButtonSpacer>

      <div className="bg-green-dark py-4">
        <ButtonSpacer>
          <Button color="light-green">Button</Button>
          <Button color="light-green" href="#">
            Link
          </Button>
          <Button color="light-green" disabled>
            Disabled
          </Button>
        </ButtonSpacer>

        <ButtonSpacer>
          <Button variant="secondary" color="light-green">
            Button
          </Button>
          <Button variant="secondary" color="light-green" href="#">
            Link
          </Button>
          <Button variant="secondary" color="light-green" disabled>
            Disabled
          </Button>
        </ButtonSpacer>
      </div>

      <div className="bg-blue py-4">
        <ButtonSpacer>
          <Button color="white">Button</Button>
          <Button color="white" href="#">
            Link
          </Button>
          <Button color="white" disabled>
            Disabled
          </Button>
        </ButtonSpacer>

        <ButtonSpacer>
          <Button variant="secondary" color="white">
            Button
          </Button>
          <Button variant="secondary" color="white" href="#">
            Link
          </Button>
          <Button variant="secondary" color="white" disabled>
            Disabled
          </Button>
        </ButtonSpacer>
      </div>
    </>
  );
};
