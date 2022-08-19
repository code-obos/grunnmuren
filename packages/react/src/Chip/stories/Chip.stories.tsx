import { Chip } from '..';
import { Star, Warning, InfoCircle } from '@obosbbl/grunnmuren-icons';

export default {
  title: 'Chip',
};

export const Default = () => {
  return (
    <>
      <div className="my-8 mx-4 flex gap-4">
        <div className="flex flex-col gap-4">
          <Chip color="blue-light" icon={<InfoCircle />}>
            Frist for forkjøp 00. måned
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
          <Chip className="border-red bg-red" icon={<Warning />}>
            Egendefinert farge
          </Chip>
        </div>
        <div className="flex flex-col gap-4">
          <Chip color="blue-light">Frist for forkjøp 00. måned</Chip>
          <Chip color="green-light">Medlemstilbud</Chip>
          <Chip color="red-light">Alert</Chip>
          <Chip color="orange-light">Informasjon</Chip>
          <Chip className="border-red bg-red text-white">
            Egendefinert farge
          </Chip>
        </div>
      </div>
    </>
  );
};
