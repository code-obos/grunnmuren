import { Chip } from '..';
import { Star, Warning, InfoCircle } from '@obosbbl/grunnmuren-icons';

export default {
  title: 'Chip',
};

export const Default = () => {
  return (
    <>
      <div className="mx-4 my-8 flex gap-4">
        <div className="flex flex-col gap-4">
          <Chip color="sky" variant="outline" icon={<InfoCircle />}>
            Frist for forkjøp 00. måned
          </Chip>
          <Chip color="mint" variant="outline" icon={<Star />}>
            Medlemstilbud
          </Chip>
          <Chip color="red-light" variant="outline" icon={<Warning />}>
            Alert
          </Chip>
          <Chip color="orange-light" variant="outline" icon={<InfoCircle />}>
            Informasjon
          </Chip>
          <Chip
            className="border-red bg-red"
            variant="outline"
            icon={<Warning className="text-white" />}
          >
            Egendefinert farge
          </Chip>
        </div>
        <div className="flex flex-col gap-4">
          <Chip color="sky">Frist for forkjøp 00. måned</Chip>
          <Chip color="mint">Medlemstilbud</Chip>
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
