import { forwardRef, Ref } from 'react';

const BASE_ILLUSTRATION_URL =
  'https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/q_auto,f_auto/Grunnmuren/Illustrasjoner';

function getIllustrationUrl(name: IllustrationProps['name']): string {
  return BASE_ILLUSTRATION_URL + '/' + name + '.png';
}

type IllustrationProps = {
  name:
    | 'Sykkelreperasjon-ensfarget'
    | 'Sykkelreperasjon-Flerfarget'
    | 'Flytteesker-ensfarget'
    | 'Flytteesker-flerfarget';
};

function Illustration(props: IllustrationProps, ref: Ref<HTMLImageElement>) {
  const { name, ...rest } = props;

  const url = getIllustrationUrl(name);

  return <img {...rest} src={url} ref={ref} />;
}

const _Illustration = forwardRef(Illustration);
export {
  _Illustration as Illustration,
  type IllustrationProps,
  getIllustrationUrl,
};
