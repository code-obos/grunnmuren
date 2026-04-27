/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_STORYBOOK_BASE_URL: string;
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
      SANITY_PREVIEW_JWT_SECRET?: string;
      SANITY_PREVIEW_URL?: string;
      SANITY_READ_TOKEN?: string;
      SANITY_STUDIO_URL?: string;
    }
  }
}

export {};
