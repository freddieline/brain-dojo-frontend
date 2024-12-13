import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const renderWithQueryClient = (ui: React.ReactElement) => {
  const createTestQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Disable retries to make tests deterministic
        },
      },
    });
  const testQueryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
};
