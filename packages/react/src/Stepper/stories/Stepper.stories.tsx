import { Documents, Parking, File, House } from '@obosbbl/grunnmuren-icons';
import { Stepper, Step } from '../..';

const metadata = { title: 'Stepper', parameters: { layout: 'padded' } };
export default metadata;

export const Numbered = () => {
  const numbers = Array.from({ length: 4 }, (v, k) => k + 1);

  return (
    <Stepper>
      {numbers.map((n) => (
        <Step key={n} bullet={n + '.'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          sollicitudin metus felis, sed tincidunt mi tristique eu.
        </Step>
      ))}
    </Stepper>
  );
};

export const Icons = () => {
  const icons = [Documents, Parking, File, House];
  return (
    <Stepper>
      {icons.map((Icon, i) => (
        <Step key={i} bullet={<Icon />}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          sollicitudin metus felis, sed tincidunt mi tristique eu.
        </Step>
      ))}
    </Stepper>
  );
};
