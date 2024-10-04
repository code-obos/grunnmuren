'use server';

import {
  type IllustrationName,
  Illustration,
  BASE_ILLUSTRATION_URL,
} from './Illustration';

const cache = {};

export async function IllustrationTest({ name }) {
  const url =
    'https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/fl_getinfo/Grunnmuren/Illustrasjoner/Flytteesker-ensfarget.png';

  let ratio = cache[url];

  if (!ratio) {
    const illustrationMeta = await fetch();

    const json = await illustrationMeta.json();

    console.log(json);

    const { width, height } = json.output;

    ratio = width / height;
    cache[url] = ratio;
  }

  console.log({ width, height, ratio });

  return <Illustration style={{ aspectRatio: ratio }} />;
}
