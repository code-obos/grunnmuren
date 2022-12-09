import { Documents, Parking, File, House } from '@obosbbl/grunnmuren-icons';
import { StepList, StepListProps } from '../..';

const metadata = {
  title: 'StepList',
  parameters: { layout: 'padded' },
  argTypes: {
    align: {
      defaultValue: 'center',
      options: ['center', 'top'],
      control: { type: 'radio' },
    },
  },
};
export default metadata;

export const Numbered = (props: StepListProps) => {
  const numbers = Array.from({ length: 4 }, (v, k) => k + 1);

  return (
    <StepList {...props}>
      {numbers.map((n) => (
        <StepList.Item key={n} bullet={n + '.'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          sollicitudin metus felis, sed tincidunt mi tristique eu.
        </StepList.Item>
      ))}
    </StepList>
  );
};

export const Icons = (props: StepListProps) => {
  const icons = [Documents, Parking, File, House];
  return (
    <StepList {...props}>
      {icons.map((Icon, i) => (
        <StepList.Item key={i} bullet={<Icon />}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          sollicitudin metus felis, sed tincidunt mi tristique eu.
        </StepList.Item>
      ))}
    </StepList>
  );
};
