import { IPagination } from "@/types";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60, // 1 menit
        },
    },
});

export const getNextPage = (meta: IPagination) => (meta.page < meta.total_page ? meta.page + 1 : undefined);
