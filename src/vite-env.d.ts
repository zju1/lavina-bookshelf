/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_USER_KEY: string;
  readonly VITE_USER_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
