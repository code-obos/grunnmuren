import { createClient } from '@sanity/client';
import { loadQuery } from '@sanity/react-loader';

import { setServerClient } from '../lib/sanity.loader';

export const sanityLoaderServer = () => {
  const client = createClient({
    projectId: 'tq6w17ny',
    dataset: 'grunnmuren',
    apiVersion: '2026-04-27',
    useCdn: true,
    stega: {
      enabled: true,
      studioUrl: 'http://localhost:3333/studio',
    },
  });

  setServerClient(client);
  return loadQuery;
};
