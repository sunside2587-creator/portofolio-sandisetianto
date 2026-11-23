/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CMS_PROJECT_ID?: string;
  readonly VITE_CMS_DATASET?: string;
  readonly VITE_CMS_API_VERSION?: string;
  readonly VITE_CMS_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
