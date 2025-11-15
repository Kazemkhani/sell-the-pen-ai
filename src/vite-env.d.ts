/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DUMMY?: string;
  readonly DUMMY?: string;
  readonly VITE_TYPE?: string;
  readonly TYPE?: string;
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.txt?raw' {
  const content: string;
  export default content;
}
