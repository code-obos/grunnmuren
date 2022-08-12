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

const Spacer = (props: { children: React.ReactNode }) => (
  <div className="container my-8 flex flex-col gap-4" {...props} />
);

export const Default = () => {
  return (
    <>
      <Spacer>
        <Badge
          color="blue-light"
          icon={<InfoCircle className="text-blue-dark" />}
        >
          Frist for forkjøp 00. måned
        </Badge>
        <Badge color="green" icon={<Check className="text-white" />}>
          Salger er igang
        </Badge>
        <Badge color="green-light" icon={<Star className="text-green" />}>
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
      </Spacer>
    </>
  );
};
