import { Chip } from '..';
import {
  Star,
  Check,
  Warning,
  RealEstate,
  InfoCircle,
} from '@obosbbl/grunnmuren-icons';

export default {
  title: 'Chip',
};

export const Default = () => {
  return (
    <>
      <div className="flex gap-4">
        <div className="my-8 mx-4 flex flex-col gap-4">
          <Chip color="blue-light" icon={<InfoCircle />}>
            Frist for forkjøp 00. måned
          </Chip>
          <Chip color="green" icon={<Check />}>
            Salget er i gang
          </Chip>
          <Chip color="green-light" icon={<Star />}>
            Medlemstilbud
          </Chip>
          <Chip color="red-light" icon={<Warning />}>
            Alert
          </Chip>
          <Chip color="orange-light" icon={<InfoCircle />}>
            Informasjon
          </Chip>
          <Chip color="yellow" icon={<RealEstate />}>
            Visning 00. måned
          </Chip>
          <Chip className="border-red bg-red" icon={<Warning />}>
            Egendefinert farge
          </Chip>
        </div>
        <div className="my-8 mx-4 flex flex-col gap-4">
          <Chip color="blue-light">Frist for forkjøp 00. måned</Chip>
          <Chip color="green">Salget er i gang</Chip>
          <Chip color="green-light">Medlemstilbud</Chip>
          <Chip color="red-light">Alert</Chip>
          <Chip color="yellow">Visning 00. måned</Chip>
          <Chip color="orange-light">Informasjon</Chip>
          <Chip className="border-red bg-red">Egendefinert farge</Chip>
        </div>
      </div>
    </>
  );
};
