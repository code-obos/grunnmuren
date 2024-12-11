import { forwardRef, Ref } from 'react';

export const BASE_ILLUSTRATION_URL =
  'https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/q_auto,f_auto/Grunnmuren/Illustrasjoner';

function getIllustrationUrl(name: IllustrationProps['name']): string {
  return BASE_ILLUSTRATION_URL + '/' + name + '.png';
}

type IllustrationName =
  | 'Sykkelreperasjon-ensfarget'
  | 'Sykkelreperasjon-Flerfarget'
  | 'Flytteesker-ensfarget'
  | 'Flytteesker-flerfarget';

type IllustrationProps = {
  name: IllustrationName;
};

function Illustration(props: IllustrationProps, ref: Ref<HTMLImageElement>) {
  const { name, ...rest } = props;

  const url = getIllustrationUrl(name);

  //   const width = 4918;
  //   const height = 4979;

  //   const ratio = width / height;
  //   console.log({ ratio });

  return <img {...rest} src={url} ref={ref} />;
}

const _Illustration = forwardRef(Illustration);
export {
  _Illustration as Illustration,
  type IllustrationProps,
  getIllustrationUrl,
};
