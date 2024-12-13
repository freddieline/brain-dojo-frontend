declare global {
  interface Window {
    ReactQueryClientProvider: typeof QueryClientProvider;
    QueryClient: typeof QueryClient;
  }
}

/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_QUIZ_API: string; // Declare your environment variable here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
