import { createQueryStore } from '@sanity/react-loader';

const { setServerClient, useLiveMode, useQuery } = createQueryStore({ client: false, ssr: true });

export { setServerClient, useLiveMode, useQuery };
