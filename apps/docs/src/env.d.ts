/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_STORYBOOK_BASE_URL: string;
  readonly SANITY_PROJECT_ID: string;
  readonly SANITY_DATASET: string;
  readonly SANITY_API_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Server-side environment variables
declare global {
  interface Window {
    __SANITY_STUDIO_URL__?: string;
  }

  namespace NodeJS {
    interface ProcessEnv {
      SANITY_PREVIEW_SESSION_SECRET?: string;
      SANITY_PREVIEW_URL?: string;
      SANITY_VIEWER_TOKEN?: string;
      SANITY_STUDIO_URL?: string;
      SANITY_PROJECT_ID: string;
      SANITY_DATASET: string;
      SANITY_API_VERSION: string;
    }
  }
}

export {};
