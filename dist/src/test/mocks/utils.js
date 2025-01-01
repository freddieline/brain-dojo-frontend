import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const renderWithQueryClient = (ui) => {
    const createTestQueryClient = () => new QueryClient({
        defaultOptions: {
            queries: {
                retry: false, // Disable retries to make tests deterministic
            },
        },
    });
    const testQueryClient = createTestQueryClient();
    return (_jsx(QueryClientProvider, { client: testQueryClient, children: ui }));
};
