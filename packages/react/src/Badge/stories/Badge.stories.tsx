import { Badge } from '../';
import {
  Star,
  Check,
  Warning,
  RealEstate,
  InfoCircle,
} from '@obosbbl/grunnmuren-icons';

export default {
  title: 'Badge',
};

export const Default = () => {
  return (
    <>
      <div className="my-8 mx-4 flex flex-col gap-4">
        <Badge color="blue-light" icon={<InfoCircle />}>
          Frist for forkjøp 00. måned
        </Badge>
        <Badge color="green" icon={<Check />}>
          Salger er igang
        </Badge>
        <Badge color="green-light" icon={<Star />}>
          Medlemstilbud
        </Badge>
        <Badge color="red-light" icon={<Warning />}>
          Alert
        </Badge>
        <Badge color="orange-light" icon={<InfoCircle />}>
          Informasjon
        </Badge>
        <Badge color="yellow" icon={<RealEstate />}>
          Visning 00. måned
        </Badge>
        <Badge className="border-red bg-red" icon={<Warning />}>
          Custom border color
        </Badge>
      </div>
    </>
  );
};
