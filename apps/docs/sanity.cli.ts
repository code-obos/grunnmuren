import { defineCliConfig } from 'sanity/cli';

import { DATASET, PROJECT_ID } from './util/env';

export default defineCliConfig({
  api: {
    projectId: PROJECT_ID,
    dataset: DATASET,
  },
});
