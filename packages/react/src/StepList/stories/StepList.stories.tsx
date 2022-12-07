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
          <p>
            Let us wax poetic about the beauty of the cheeseburger. The flavour
            gracefully dances across your palate like a majestic figure skater
            on ice.
          </p>
          The cheese melts on the burger and in your mouth, perfectly
          complementing the medium-rare beef. Any burger lover worth their salt
          knows the best patty is comprised of ground chuck and brisket.
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
          <p>
            Let us wax poetic about the beauty of the cheeseburger. The flavour
            gracefully dances across your palate like a majestic figure skater
            on ice.
          </p>
          The cheese melts on the burger and in your mouth, perfectly
          complementing the medium-rare beef. Any burger lover worth their salt
          knows the best patty is comprised of ground chuck and brisket.
        </StepList.Item>
      ))}
    </StepList>
  );
};
