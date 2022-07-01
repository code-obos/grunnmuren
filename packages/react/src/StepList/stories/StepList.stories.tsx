import { Documents, Parking, File, House } from '@obosbbl/grunnmuren-icons';
import { StepList } from '../..';

const metadata = { title: 'StepList', parameters: { layout: 'padded' } };
export default metadata;

export const Numbered = () => {
  const numbers = Array.from({ length: 4 }, (v, k) => k + 1);

  return (
    <StepList>
      {numbers.map((n) => (
        <StepList.Item key={n} bullet={n + '.'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          sollicitudin metus felis, sed tincidunt mi tristique eu.
        </StepList.Item>
      ))}
    </StepList>
  );
};

export const Icons = () => {
  const icons = [Documents, Parking, File, House];
  return (
    <StepList>
      {icons.map((Icon, i) => (
        <StepList.Item key={i} bullet={<Icon />}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          sollicitudin metus felis, sed tincidunt mi tristique eu.
        </StepList.Item>
      ))}
    </StepList>
  );
};
